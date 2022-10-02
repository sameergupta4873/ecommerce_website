import React,{useState} from 'react'
import {Form,Button, Col} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FromContainer from '../components/FormContainer'
import { savePaymentMethod } from '../actions/cartAction'
import { useNavigate } from 'react-router-dom'
import CheckoutStep from '../components/CheckoutStep'


const PaymentScreen = () => {
    const dispacth = useDispatch()
    
    const history = useNavigate();
    const cart = useSelector(state => state.cart)
    const {paymentMethod} = cart
    const [payment,setPayment] = useState('Paypal')
    

    const submitHandler = (e) => {
        e.preventDefault()
        dispacth(savePaymentMethod(payment))
        history('/placeorder')
    }
  return (
    <FromContainer>
        <CheckoutStep step1 step2 step3/>
        <h1>Payment Method</h1>
        <Form onSubmit = {submitHandler}>
            <Form.Group >
                <Form.Label as="legend">Select Payment Method</Form.Label>
                <Col>
                  <Form.Check type='radio' 
                  label='Paypal or Credit Card'
                  id='paypal'
                  name='paymentMethod'
                  value='paypal' checked
                  ></Form.Check>
                  <Form.Check type='radio' 
                  label='UPI By Razor Pay'
                  id='UPI'
                  name='paymentMethod'
                  value='UPI' onChange={(e)=> setPayment(e.target.value)}
                  ></Form.Check>
                </Col>
            </Form.Group>
            <Button type='submit' variant='primary'>Continue</Button>
        </Form>
      
    </FromContainer>
  )
}

export default PaymentScreen

