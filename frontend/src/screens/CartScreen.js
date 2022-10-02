import React,{useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate, useParams,useLocation} from 'react-router-dom'
import {Row,Col, ListGroup, Image, Form, Button, Card, ListGroupItem} from 'react-bootstrap'
import Message from '../components/Message'
import {addToCart,removeFromCart} from '../actions/cartAction'

const CartScreen = () => {
    const {id} =  useParams();
    const history = useNavigate();
    const location = useLocation();
    
    const qty =location.search ? Number(location.search.split('=')[1]): 1
    const dispatch = useDispatch()
    const userLogin = useSelector(state=> state.userLogin)
    const {userInfo} = userLogin
    const cart = useSelector(state => state.cart)
    const {cartItems} = cart

    useEffect(()=>{
        if(id){
            dispatch(addToCart(id, qty))
        }
    },[dispatch, id, qty])


    const removeCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }
    const checkOutHandler= () => {
        
        if(!userInfo){
            history('/login')
        }else{
            history('/shipping')
        }
        
    }
  return (
    <Row>
        <Col md={8}>
            <h2>Shopping Cart</h2>
            {cartItems.length===0? <Message>Your Cart is Empty <Link to='/'>Go Back</Link></Message> : (<ListGroup variant='flush'>
                {cartItems.map((item)=><ListGroupItem key={item.product}>
                        <Row>
                            <Col md={2}>
                                <Image src={item.image} alt={item.name}fluid rounded></Image>
                            </Col>
                            <Col md={3}>
                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </Col>
                            <Col md={2}>
                                ${item.price}
                            </Col>
                            <Col md={2}>
                            <Form.Control as='select' value={item.qty} 
                             onChange={(e)=> dispatch(addToCart(item.product,Number((e.target.value))))  }
                             
                             >{
                                [...Array(item.countInStock).keys()].map(x => (<option key = {x+1} value = {x+1}>{x+1}</option>))}
                            </Form.Control>
                            </Col>
                            <Col md={2}>
                                <Button type='button' variant='light' onClick={()=> removeCartHandler(item.product)}>
                                    remove
                                </Button>
                            </Col>
                        </Row>
                    </ListGroupItem>)}

                    
            </ListGroup>)}
        </Col>
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroupItem>
                        <h3>Subtotal ({cartItems.reduce((acc,item)=>acc+item.qty, 0)}) item(s)</h3>
                        ${cartItems.reduce((acc,item)=> acc+(item.price)*(item.qty),0 ).toFixed(2)}
                    </ListGroupItem>
                    <ListGroupItem>
                        <Button type='button' className='btn-block' disabled={cartItems.length === 0}  onClick={checkOutHandler}>
                            Proceed to CheckOut
                        </Button>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        </Col>
        <Col md={2}>

        </Col>
    </Row>
  )
}

export default CartScreen
