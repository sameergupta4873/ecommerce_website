import React,{useState,useEffect} from 'react'
import {Link , useLocation, useNavigate} from 'react-router-dom'
import {Form,Button,Row, Col, ListGroup, ListGroupItem,Table} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getUserDetails, updateUserProfile} from '../actions/userAction'
import FormContainer from '../components/FormContainer'
import { listOrder } from '../actions/orderAction'
import { ORDER_CREATE_REQUEST } from '../constants/orderConstants'
import { LinkContainer } from 'react-router-bootstrap'

const ProfileScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')

  const [message , setMessage] = useState('')

  const history = useNavigate();
  const dispatch = useDispatch();
  const userDetails = useSelector(state => state.userDetails)
  const userLogin = useSelector(state=> state.userLogin)
  const {Loading,error,user} = userDetails
  const {userInfo} = userLogin

  

  
  const userUpdateProfile = useSelector(state => state.userUpdateProfile)
  const {success} = userUpdateProfile

  const orderList = useSelector(state => state.orderList)
  const {loading:loadingOrders, orders, error:errorOrders} = orderList


useEffect(() => {
    if(!userInfo){
        history('/login')
    }else{
        if(!user.name){
            dispatch(getUserDetails('profile'))
            
        }else{
            
            dispatch(listOrder(user._id))
            setName(user.name)
            setEmail(user.email)
        }
    }
},[history,userInfo,user,dispatch])



  const submitHandler =(e) => {

      e.preventDefault()
      if(password !== confirmPassword){
        setMessage("Password do not match")
      }else{
        setMessage(null)
        dispatch(updateUserProfile({id:user._id,name,email,password}))
      }
      
      

  }

  function onClickHandler(id){
    history(`/order/${id}`)
  }
  return (
    <>
        <Row>
          <Col md={3}>
          <h1>Update Information</h1>
          {error && <Message variant="danger">{error}</Message>}
          
          {Loading && <Loader />}
          {message && <Message variant="danger">{message}</Message> }
          { success && <Message variant="success">Profile Updated</Message>}
          <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="text" placeholder="enter name" value={name}
                  onChange={(e) => setName(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group controlId="email">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" placeholder="enter email" value={email}
                  onChange={(e) => setEmail(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="enter password" value={password}
                  onChange={(e) => setPassword(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group controlId="confirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" placeholder="re-enter password" value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}></Form.Control>
              </Form.Group>
              <Form.Group>
                <Button type="submit" variant='primary' style={{marginTop: '20px', marginBottom: '10px'}}>Update</Button>
              </Form.Group>
              
          </Form>
          </Col>
          <Col md={9}>
                <h1>My Orders</h1>
                {!orders ? <Loader /> : loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{error}</Message> :(
                  <Table striped bordered hover responsive className="table-sm">
                    <thead>
                      <tr>
                        <td>ID</td>
                        <td>DATE</td>
                        <td>TOTAL</td>
                        <td>PAID</td>
                        <td>DELIVERED</td>
                      </tr>
                    </thead>
                    <tbody>
                      {  orders.map((order) =>
                        (
                          <tr key={order._id}>
                            <td>{order._id}</td>
                            <td> {order.createdAt.substring(0,10)}</td>
                            <td>{order.totalPrice}</td>
                            <td>{order.isPaid ?   order.paidAt.substring(0,10) : (
                              <i className="fas fa-times" style={{color:'red'}}></i>
                            ) }</td>
                            <td>{order.isDeliverd ? <i className="fas fa-check" style={{color:'green'}}></i> : (
                              <i className="fas fa-times" style={{color:'red'}}></i>
                            ) }</td>
                            <td>
                      <Button variant='light' onClick={() => onClickHandler(order._id)}>Details</Button>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </Table>
                )}
                    
          </Col>
        </Row>    
    </>
  )
}

export default ProfileScreen