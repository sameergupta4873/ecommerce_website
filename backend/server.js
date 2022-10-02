const express = require('express');
const dotenv = require('dotenv')
const Razorpay = require('razorpay')
const connectDB = require('./config/db.js')
const productRoutes  = require('./routes/productRoute.js')
const usersRoutes = require('./routes/userRoute.js')
const orderRoutes = require('./routes/orderRoute.js');
const mongoose = require('mongoose')


dotenv.config()

connectDB()

const app = express()
//middleware bodyparser
app.use(express.json())



app.get('/', (req,res) => {
    res.send('API is running........')
})

app.use(express.json());
app.use('/api/',productRoutes)
app.use('/api/users',usersRoutes)
app.use('/api/orders',orderRoutes)
app.get('/api/config/paypal',(req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID);
})
//razorpay setup key and order creation

const ROrderSchema = mongoose.Schema({
    isPaid:Boolean,
    amount: Number,
    razorpay:{
        orderId : String,
        paymentId : String,
        signature : String,
    }
});
const ROrder = mongoose.model('ROrder', ROrderSchema)

app.get('/api/config/razorpay', (req,res)=>{
    res.send(process.env.RAZORPAY_KEY_ID)
})

app.post('/api/create-razorpay-order', async (req,res)=>{
    try {
        const instance = new Razorpay({
            key_id : process.env.RAZORPAY_KEY_ID,
            key_secret : process.env.RAZORPAY_SECRET
        });
        const options = {
            amount : req.body.amount,
            currency : 'INR',

        }
        const order = await instance.orders.create(options)
        if(!order) return res.status(500).send('Some Error Occured')
        res.send(order);
    } catch (error) {
        res.status(500).send(error)
    }
})

app.post('/api/pay-order', async(req,res)=>{
    try {
        const {amount, razorpayPaymentId, razorpayOrderId, razorpaySignature} = req.body;
        const newOrder = ROrder({
            isPaid: true,
            amount: amount,
            razorpay: {
                orderId : razorpayOrderId,
                paymentId : razorpayPaymentId,
                Signature: razorpaySignature
            },
        });
        await newOrder.save();
        res.send({
            msg : 'Payment was successfull',
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
})

app.get('/api/list-orders', async(req,res)=>{
    const orders = await ROrder.find();
    res.send(orders);
})



//razorpay done
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running on Port ${PORT}`))