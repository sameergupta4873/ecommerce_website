import React,{useState} from 'react'
import {Form,Button} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import FromContainer from '../components/FormContainer'
import { saveShippingAddress } from '../actions/cartAction'
import { useNavigate } from 'react-router-dom'
import CheckoutStep from '../components/CheckoutStep'


const ShippingScreens = () => {
    const dispacth = useDispatch()
    
    const history = useNavigate();
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    const [address,setAddress] = useState(shippingAddress.address)
    const [city,setCity] = useState(shippingAddress.city)
    const [postalcode,setPostalcode] = useState(shippingAddress.postalcode)
    const [country,setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
        e.preventDefault()
        dispacth(saveShippingAddress({address,city,postalcode,country}))
        history('/payment')
    }
  return (
    <FromContainer>
        <CheckoutStep step1 step2 />
        <Form onSubmit = {submitHandler}>
            <Form.Group controlId='address'>
                <Form.Label>Address</Form.Label>
                <Form.Control type='text' placeholder='Enter Address' value={address} onChange={(e) => setAddress(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='city'>
                <Form.Label>City</Form.Label>
                <Form.Control type='text' placeholder='Enter City' value={city} onChange={(e) => setCity(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='postalcode'>
                <Form.Label>Postal Code</Form.Label>
                <Form.Control type='text' placeholder='Enter Postal Code' value={postalcode} onChange={(e) => setPostalcode(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='country'>
                <Form.Label>Country</Form.Label>
                <Form.Control type='text' placeholder='Enter Country' value={country} onChange={(e) => setCountry(e.target.value)}></Form.Control>
            </Form.Group>
            <Button type='submit' variant='primary'>Continue</Button>
        </Form>
      
    </FromContainer>
  )
}

export default ShippingScreens
