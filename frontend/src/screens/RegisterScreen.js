import React,{useState,useEffect} from 'react'
import {Link , useLocation, useNavigate} from 'react-router-dom'
import {Form,Button,Row, Col} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {register,login} from '../actions/userAction'
import FormContainer from '../components/FormContainer'
import { USER_LOGIN_SUCCESS } from '../constants/userConstants'

const RegisterScreen = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')

  const [message , setMessage] = useState('')

  const location = useLocation();
  const history = useNavigate();
  const redirect = location.search ? location.search.split('=')[1] :"/";
  const dispatch = useDispatch();
  const userRegister = useSelector(state => state.userRegister)
  const {Loading,error,userInfo} = userRegister

useEffect(() => {
    if(userInfo){history(redirect)}
},[history,userInfo,redirect])
  const submitHandler =(e) => {

      e.preventDefault()
      if(password !== confirmPassword){
        setMessage("Password do not match")
      }else{
        dispatch(register(name,email,password))
        
        dispatch({type:USER_LOGIN_SUCCESS})
        
      }
      

  }
  return (
    <>
        <FormContainer>
          <h1>Register</h1>
          {error && <Message variant="danger">{error}</Message>}
          {Loading && <Loader />}
          {message && <Message variant="danger">{message}</Message>}
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
                <Button type="submit" variant='primary' style={{marginTop: '20px', marginBottom: '10px'}}>Register</Button>
              </Form.Group>
              
          </Form>
          <Row>
              <Col>
                Have an Account ? <Link to={'/login'}>Login</Link>
              </Col>
          </Row>
          </FormContainer>
    </>
  )
}

export default RegisterScreen
