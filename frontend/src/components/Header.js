import React from 'react'
import {Navbar ,Nav,Container, NavDropdown } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../actions/userAction'
const Header = () => {
  const userLogin = useSelector(state => state.userLogin)
  
  const {userInfo} =  userLogin
  const dispacth = useDispatch();

  const logoutHandler = () => {
    dispacth(logout())
    // window.location.reload(true);
  }
  return (
    <>
    
    <Navbar bg="primary" variant="dark">
      <Container>
      <Navbar.Brand ><Link to='/'style={{color:"white", textDecoration:"none", paddingLeft: "50px",paddingTop:'12.2px'}}>Shoppzy</Link></Navbar.Brand>
      <Nav className="me-auto">
        <Link to="/cart" style={{color:"white", textDecoration:"none", padding: "10px",paddingTop:'12.2px' , marginRight:'10px'}
      }><i className="fa-solid fa-cart-shopping"></i> CART</Link>
        {userInfo ? (
            <NavDropdown title={userInfo.name} id="username" style={{marginLeft:'10px'}}>
                
                  <NavDropdown.Item>
                  <Link to='/profile'>
                    Profile
                  </Link>
                  </NavDropdown.Item>
                  
                  <NavDropdown.Item onClick={logoutHandler}>
                    
                    Logout
                  </NavDropdown.Item>
                
            </NavDropdown>
        ): (<Link to="/login" style={{color:"white", textDecoration:"none", padding: "10px",paddingTop:'12.2px',float:'right'}}><i className="fa-solid fa-user"></i> SIGN IN</Link>)}
        
      </Nav>
      </Container>
    </Navbar>
  
    
  </>
  ) 
}

export default Header