import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Button , Card} from 'react-bootstrap';
import  {Carousel}  from 'react-bootstrap';
import {useSelector} from 'react-redux'
import "react-responsive-carousel/lib/styles/carousel.min.css"; 



const Carousels = () => {
    const productList = useSelector(state => state.productList)
    const id = null
    
    
    const {products} = productList
    
    



  return (
    <div className='slider-container' >
      <Link to ={`/product/${id}`}>
      <Carousel  variant='dark'   >
            {products.map(product => (
              

              
              <Carousel.Item style={{'height':'600px'}} >
                  <Card>
                    <Link to={`/product/${product._id}`}>
                      <Card.Img src={product.image} variant='top' height='600px'></Card.Img>
                    </Link>
                  </Card>
                  
                  
              </Carousel.Item>
              
            ))}
      </Carousel>
      </Link>
    </div>
  )
}

export default Carousels
