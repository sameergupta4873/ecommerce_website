import React, { useEffect, useState} from 'react'
import {Row, Col, ListGroup, Button, Image, ListGroupItem, Form}
 from 'react-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import {Link } from 'react-router-dom'
import { useParams ,useNavigate} from 'react-router-dom'
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/Loader'
import Message from '../components/Message'

const ProductScreen = () => {
  const [qty,setQty] = useState(1)

  const dispatch = useDispatch()
  const {id} = useParams();
  const history = useNavigate();

  const productDetails = useSelector(state => state.productDetails)
  const {loading, error , product} = productDetails
  
  useEffect(() => {
    dispatch(listProductDetails(id))
  },[dispatch,id]);

  const addToCartHandler = () => {
    history(`/cart/${id}?qty=${qty}`)
  }

  
  return (
      <div>
        <Link to ='/'><Button className='my-2'>Go Back</Button></Link>
        {loading ? <Loader/> : error ? <Message variant='danger'>{error}</Message> : (<Row>
          <Col md={6}>
            <Image src={product.image} fluid></Image>
          </Col>
          <Col md={3}>
            <ListGroup variant="flush" className='h-100'>
              <ListGroupItem>
                <h3>{product.name}</h3>
              </ListGroupItem>
              <ListGroupItem>
                {/* <Rating value={5} text={`${product.numReviews} Reviews`}/> */}
              </ListGroupItem>
              <ListGroupItem>
              <h3>${product.price}</h3>
              </ListGroupItem>
              <ListGroupItem>
              {product.description}
              </ListGroupItem>
            </ListGroup>
          </Col>
          <Col md={3}>
            <ListGroup variant='flush' className='h-100'>
            <ListGroupItem>
              <Row>
                <Col><h5>Status :</h5></Col>
                <Col >
                  <h5>{product.countInStock > 0 ? `Only ${product.countInStock} left`: 'Out of Stock'}</h5> 
                </Col>
              </Row>
            </ListGroupItem>
            {product.countInStock > 0 && (
              <ListGroupItem>
                <Row>
                  <Col><h5>Qty :</h5></Col>
                  <Col>
                    <Form.Control as='select' value={qty} 
                    onChange={(e)=> setQty(e.target.value)
                    }>{
                      [...Array(product.countInStock).keys()].map(x => (<option key = {x+1} value = {x+1}>{x+1}</option>))}
                    </Form.Control>
                  </Col>
                </Row>
              </ListGroupItem>
            )}
            <ListGroupItem>
              <Button onClick={addToCartHandler}
              className="btn-block" type='button' disabled={product.countInStock===0}>
                Add to Cart
              </Button>
            </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>)}
        
    </div>
  )
}

export default ProductScreen
