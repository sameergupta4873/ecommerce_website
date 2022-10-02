import React,{useEffect} from 'react'
import {Button, Col, Row , ListGroup, Image, Card, ListGroupItem} from 'react-bootstrap'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { CART_RESET_ITEM } from '../constants/cartConstants'
import {createOrder} from '../actions/orderAction'
import Message from '../components/Message'
import CheckoutStep from '../components/CheckoutStep'

const PlaceOrderScreen = () => {
    const cart = useSelector(state => state.cart)
    const orderCreate = useSelector(state => state.orderCreate)
    const {order, success , error} = orderCreate
    const {shippingAddress, cartItems} = cart
    const dispatch = useDispatch();
    const history = useNavigate();
    const {paymentMethod} = cart;

    //fun for decimal
    const addDecimal = (num) =>{
      return (Math.round(num*100)/100).toFixed(2)
    }
    //item's price
    let i = 0;
    cartItems.map((item)=> {
      i += (item.price * item.qty)
    })
    cart.itemsPrice = addDecimal(i)
    //shipping price
    cart.shippingPrice = addDecimal(cart.itemsPrice > 500 ? 0 : 50)
    //tax price
    let j=0;
    cartItems.map((item)=> {
      j += (0.18*(item.price * item.qty).toFixed(2))
    })
    cart.taxPrice = addDecimal(j)
    //total price
    const ls = [cart.itemsPrice, cart.shippingPrice, cart.taxPrice]
    let k=0;
    ls.map((l)=>{
      k+=(l*1);
    })
    cart.totalPrice = addDecimal(k)

    const placeOrderHandler = () => {
        dispatch(
          createOrder({
            orderItems:cartItems,
            shippingAddress:shippingAddress,
            paymentMethod: paymentMethod,
            itemsPrice:cart.itemsPrice,
            shippingPrice:cart.shippingPrice,
            taxPrice:cart.taxPrice,
            totalPrice:cart.totalPrice
          })
        )
    }

    

    useEffect(()=>{
      if(success){
        history(`/order/${order._id}`)
        dispatch({type:CART_RESET_ITEM})
      }
    },[history,success])

  return (
    <>
      <CheckoutStep step1 step2 step3 step4/>
      <Row >
        <Col md={8}>
            <ListGroup variant='flush'>
                <ListGroup.Item>
                    <h2>Shipping</h2>
                    <p><strong>Address : </strong>
                    {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalcode}, {shippingAddress.country}.
                    </p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Payment Method</h2>
                    <p><strong>{cart.paymentMethod}</strong></p>
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {/* {cartItems.length === 0 ? (<Message variant='danger'>Your Cart is Empty</Message>) :  */}
                    <ListGroup variant='flush'>
                      {cart.cartItems.map((item, index) =>(
                        <ListGroup.Item key={index}>
                          <Row>
                            <Col md={2}>
                              <Image src={item.image} alt={item.name}fluid rounded></Image>
                            </Col>
                            <Col>
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </Col>
                            <Col md={4}>{item.qty} X ${item.price} = ${(item.price)*(item.qty)}</Col>
                          </Row>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                </ListGroup.Item>
            </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Order Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  {error && <Message variant='danger'>{error}</Message>}
                </ListGroup.Item>
              <Button type='button' className='btn-block' variant='primary' disabled={cart.cartItems.length===0} onClick={placeOrderHandler}>Place Order</Button> 
            </ListGroup>
          </Card>
        </Col>
      </Row>

     
    </>
  )
}

export default PlaceOrderScreen
