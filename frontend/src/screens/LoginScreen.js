import React,{useState,useEffect} from 'react'
import {Link , useLocation, useHistory, useNavigate} from 'react-router-dom'
import {Form,Button,Row, Col, Nav} from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {login} from '../actions/userAction'
import FormContainer from '../components/FormContainer'

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const location = useLocation();
  const history = useNavigate();
  const redirect = location.search ? location.search.split('=')[1] :"/";
  const dispacth = useDispatch();
  const userLogin = useSelector(state => state.userLogin)
  const {Loading,error,userInfo} = userLogin

useEffect(() => {
    if(userInfo){history(redirect)}
},[history,userInfo,redirect])
  const submitHandler =(e) => {
      e.preventDefault()
      dispacth(login(email,password))

  }
  return (
    <>
        <FormContainer>
          <h1>Sign In</h1>
          {error && <Message varient="danger">{error}</Message>}
          {Loading && <Loader />}
          <Form onSubmit={submitHandler}>
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
                <Button type="submit" variant='primary' style={{marginTop: '20px', marginBottom: '10px'}}>SIGN IN</Button>
              
          </Form>
          <Row>
              <Col>
                <Link to='/register' style={{textDecoration:"underline", marginLeft:'-17px'}}>New Customer ? Register</Link>
              </Col>
          </Row>
          </FormContainer>
    </>
  )
}

export default LoginScreen
