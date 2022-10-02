import React,{useEffect, useState} from 'react'
import moment from 'moment'
import {Button, Col, Row , ListGroup, Image, Card, ListGroupItem} from 'react-bootstrap'
import { ORDER_PAY_RESET, ORDER_DETAILS_RESET, ORDER_CREATE_RESET } from '../constants/orderConstants'
import {PayPalButton} from 'react-paypal-button-v2'
import {Link, useNavigate, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {getOrderDetails, payOrder} from '../actions/orderAction'
import Message from '../components/Message'
import Loader from '../components/Loader'
import axios from 'axios'
import { CART_RESET_ITEM } from '../constants/cartConstants'


const OrderScreen = () => {
    const {id} = useParams();
    const history = useNavigate();
    const [sdkReady, setSdkReady] = useState(false)
    const orderId = id;
    const orderPay = useSelector(state => state.orderPay)
    const {loading:loadingPay, success:successPay} = orderPay
    const dispatch = useDispatch();
    const orderDetails = useSelector(state => state.orderDetails)
    const {order, loading,error} = orderDetails
    let i=0
    //razor
    
    const [orderAmount, setOrderAmount] = useState(0);
    const [Orders, setOrders] = useState([])

    const fetchOrders = async() => {
    const {data} = await axios.get('/api/list-orders')
    setOrders(data);
  }
  useEffect(()=>{
    fetchOrders();
  },[])
  
//
  const successPaymentHandler = (paymentResult) => {
      dispatch(payOrder(orderId,paymentResult))
      
  }

  const onBackHandler = () =>{
    history('/');
    dispatch({type:ORDER_DETAILS_RESET})
    dispatch({type:ORDER_CREATE_RESET})
    

  }

    useEffect(()=>{
      const addPaypalScript = async() =>{
        const {data: clientId} = await axios.get('/api/config/paypal')
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
        script.async = true
        script.onload = () => {
          setSdkReady(true)
        }
        document.body.appendChild(script)
      }
      
      if( !order || successPay){
          dispatch(getOrderDetails(orderId));

        
        dispatch({type:ORDER_PAY_RESET});
      }else if(!order.isPaid){
        if(!window.paypal){
          addPaypalScript()
        }else{
          setSdkReady(true)
        }
      }
    },[dispatch,orderId,order,successPay])
    //reset
    

    //razor
    function loadRazorPay() {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.onerror = () =>{
        alert('RazorPay SDK failed to load. Are you online ? ')
      }
      script.onload = async () =>{
        try {
          const result = await axios.post('/api/create-razorpay-order', {
            amount : Math.round((Number(order.totalPrice)*100 )),
          });
          const {amount, id: order_id, currency } = result.data;
          const {
            data: {key: razorpayKey},
          } = await axios.get('/api/config/razorpay');
  
          const options = {
            key: razorpayKey,
            amount: amount.toString(),
            currency: currency,
            name: 'Shoppzy',
            description: `Payment for Order Id ${order._id}`,
            order_id: order_id,
            handler: async function (response) {
              const result = await axios.post('/api/pay-order',{
                amount: amount,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature,
              });
              alert(result.data.msg);
              if(result.data.msg === 'Payment was successfull'){
                  
              }
              fetchOrders();
            },
            prefill: {
              name: order.user.name,
              email: order.user.email,
              contact: "1111111",
            }, note: {
              address: order.shippingAddress.address
            },
            theme:{
              color: '#80c0f0'
            }
  
          }
  
  
          const paymentObject = new window.Razorpay(options)
          paymentObject.open()
        } catch (error) {
          alert(error);
        }
      }
      document.body.appendChild(script);
    }
    //


  return (
    loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
    <>
        
          
        <h2>Order {order._id}</h2>
        <Row>
            <Col md={8}>
                
                <ListGroup.Item variant='flush'>
                    <h2>Shipping</h2>
                    <p><strong>Name : </strong>{order.user.name}</p>
                    <p><strong>Email : </strong>{order.user.email}</p>
                    <p>
                        <strong>Address : </strong>
                        {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalcode}, {order.shippingAddress.country} 
                    </p>
                    {
                      order.isDeliverd ? (
                        <Message variant='success'>Deliverd on {order.paidAt}</Message>
                      ) : (<Message variant='danger'>Not Deliverd</Message>)
                    }
                </ListGroup.Item>
                <ListGroup.Item >
                    <h2>Payment Method</h2>
                    <p>
                        <strong>Method : </strong>
                        <strong>{order.paymentMethod}</strong>
                    </p>
                    {
                      order.isPaid ? <Message variant='success'>Paid On {moment(order.paidAt).format("dddd, MMM DD @ HH:mm a")}</Message> : <Message variant='danger'>Order Not Paid</Message>
                    }
                </ListGroup.Item>
                <ListGroup.Item>
                    <h2>Order Items</h2>
                    {/* {cartItems.length === 0 ? (<Message variant='danger'>Your Cart is Empty</Message>) :  */}
                    <ListGroup variant='flush'>
                      {order.orderItems.map((item, index) =>(
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
                
            </Col>
            <Col>

            <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
                </ListGroup.Item>
                {order.paymentMethod === "Paypal" ? 
                (!order.isPaid && (<ListGroup.Item>
              {loadingPay && <Loader />}
              {!sdkReady ? (<Loader />) : (<PayPalButton  amount={order.totalPrice} onSuccess={successPaymentHandler}/>)}
            </ListGroup.Item>)) : <ListGroup.Item>
            
      <Button disabled={loading} onClick={loadRazorPay} style={{padding:"10px 143px"}}>Pay Now</Button>
    </ListGroup.Item>}
            {
              order.isPaid && <Button onClick={onBackHandler}>Continue Shopping</Button>
            }
            </Col>
        </Row>
    </>
  )
}

export default OrderScreen
