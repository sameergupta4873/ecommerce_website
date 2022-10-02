import React , {useEffect, useState}from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap';


const TestRazorScreen = () => {
  const [loading, setLoading] = useState(false);
  const [orderAmount, setOrderAmount] = useState(0);
  const [Orders, setOrders] = useState([])

   const fetchOrders = async() => {
    const {data} = await axios.get('/api/list-orders')
    setOrders(data);
  }

  useEffect(()=>{
    fetchOrders();
  },[])

  function loadRazorPay() {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onerror = () =>{
      alert('RazorPay SDK failed to load. Are you online ? ')
    }
    script.onload = async () =>{
      try {
        setLoading(true);
        const result = await axios.post('/api/create-razorpay-order', {
          amount : orderAmount + '00',
        });
        const {amount, id: order_id, currency } = result.data;
        const {
          data: {key: razorpayKey},
        } = await axios.get('/api/config/razorpay');

        const options = {
          key: razorpayKey,
          amount: amount.toString(),
          currency: currency,
          name: 'example name',
          description: 'example transaction',
          order_id: order_id,
          handler: async function (response) {
            const result = await axios.post('/api/pay-order',{
              amount: amount,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            });
            alert(result.data.msg);
            fetchOrders();
          },
          prefill: {
            name: "example name",
            email: "example@example.com",
            contact: "1111111",
          }, note: {
            address: 'example address'
          },
          theme:{
            color: '#80c0f0'
          }

        }


        setLoading(false);
        const paymentObject = new window.Razorpay(options)
        paymentObject.open()
      } catch (error) {
        alert(error);
        setLoading(false);
      }
    }
    document.body.appendChild(script);
  }



  return (
    <>
      <input placeholder='INR' type='number' value={orderAmount}
      onChange={(e)=>setOrderAmount(e.target.value)}
      ></input>
      <Button disabled={loading} onClick={loadRazorPay}>Razorpay</Button>
    </>
  )
}

export default TestRazorScreen





