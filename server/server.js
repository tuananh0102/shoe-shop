const express = require('express');
const dotenv = require('dotenv');
const bodyParse = require('body-parser');
const morgan = require('morgan');
const cors = require('cors')
const path = require('path');


const connectDB = require('./config/MongDB');
const productRouter = require('./routes/productRoute');
const userRouter = require('./routes/userRoute');
const orderRouter = require('./routes/orderRoute');
const cartRouter = require('./routes/cartRoute')
const importData = require('./importData')

dotenv.config()
connectDB();

const app = express();

app.use(morgan('combined'));
app.use(cors())

app.use(bodyParse.urlencoded({extended: true}));
app.use(bodyParse.json());

app.use(express.static(`public`));

// app.use('/api', importRoute);
app.use('/api/user', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
app.use('/api/cart', cartRouter)
app.use('/api', importData)
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})