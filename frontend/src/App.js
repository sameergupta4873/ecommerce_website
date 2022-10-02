import React from 'react';
import './App.css';
import Footer from './components/Footer'
import {Container , Rows , Cols} from 'react-bootstrap'
import {BrowserRouter as Router ,Route,Routes} from 'react-router-dom'
import Header from './components/Header'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreens from './screens/ShippingScreens';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import TestRazorScreen from './screens/TestRazorScreen';

function App() {
  return (
    <>
    <Router>
      <Header />
      <Container>
      <main>
        <Container>
          <Routes>
            
            <Route exact path='/' element={<HomeScreen/>}/>
            <Route exact path='/razorpay' element={<TestRazorScreen/>}/>

            <Route exact path='/order/:id' element={<OrderScreen/>}/>
            <Route exact path='/placeorder' element={<PlaceOrderScreen/>}/>
            <Route exact path='/payment' element={<PaymentScreen/>}/>
            <Route exact path='/cart' element={<CartScreen/>}/>
            <Route exact path='/shipping' element={<ShippingScreens/>}/>
            <Route exact path='/cart/:id' element={<CartScreen/>}/>
            <Route exact path='/product/:id' element={<ProductScreen/>}/>
            <Route exact path='/login' element={<LoginScreen/>}/>
            <Route exact path='/profile' element={<ProfileScreen/>}/>
            <Route exact path='/register' element={<RegisterScreen/>}/>
          </Routes>
        </Container>
      </main>
      </Container>
      <Footer />
    </Router>
    </>
  );
}

export default App;
