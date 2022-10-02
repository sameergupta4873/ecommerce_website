import React, { useEffect } from 'react'
import{Row, Col, Container } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {useDispatch,useSelector} from 'react-redux'
import Product from '../components/Product'
import Carousel from '../components/Carousel'


import {listProducts} from '../actions/productActions'

const HomeScreen = () => {
  const dispatch = useDispatch()

  const productList = useSelector(state => state.productList)
  const {loading, error, products} = productList

  useEffect(()=>{
    dispatch(listProducts())
    
  },[dispatch])


  return (
    <>
      
      
      {loading ? <Loader/> : error ? <Message/> : 
      
      <Container>
        <h1>Trending Products</h1>
        <h3 style={{'color':'white'}}> space </h3>
      <Row className="justify-content-md-center p-100" >
        <Col sm={16} md={10} lg={7} xl={9}>
          <Carousel />
        </Col>
      </Row>
      <h1 style={{'color':'white'}}> space </h1>
      <h1 >Latest Products</h1>
      <h1></h1>
      <Row className='p-100'>
        {products.map(product => (
            <Col sm={12} md={6} lg={4} xl={3}>
                
                <Product product={product} />
            </Col>
        ))}
      </Row>
      </Container>
      }
    </>
  )
}

export default HomeScreen
