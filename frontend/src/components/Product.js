import React from 'react'
import {Card} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'

const Product = ({product}) => {
  return (
    <Card className='my-3 p-2 rounded'>
        <Link to={`/product/${product._id}`}>
            <Card.Img src={product.image} variant='top'></Card.Img>
        </Link>
        <Card.Body>
            <Link to={`product/${product.name}`}>
                <Card.Title as='div'>
                    <strong>{product.name}</strong>
                </Card.Title>
            </Link>

            <Card.Text as='div'>
                <div className='my-3'>
                    <Rating value={product.rating} text = {product.numReviews}/>
                </div>
            </Card.Text>
            <Card.Text as='h4'>
                ${product.price}
            </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product
