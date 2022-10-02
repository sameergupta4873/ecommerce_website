const mongoose = require('mongoose');
const dotenv = require('dotenv');
const users = require('./data/users');
const User = require('./models/UsersModel');
const Product = require('./models/ProductModel');
const Order = require('./models/OrderModel');
const products = require('./data/products');
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const importData = async() => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()
        const createUser = await User.insertMany(users)
        const adminUser = createUser[0]._id
        const sampleData = products.map( product =>{
            return{...product, user:adminUser}
        })
        await Product.insertMany(sampleData)
        console.log('Data Added')
        process.exit();
    } catch (error) {
        console.log(`${error}`)
        process.exit(1);
    }
};

const dataDestory = async() => {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()
    console.log(`${error}`.red)
    process.exit()
}

if(process.argv[2] === "-d"){
    dataDestory();
}else{
    importData();
}