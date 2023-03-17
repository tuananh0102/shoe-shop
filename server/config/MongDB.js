const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('connect DB successfully');
    } catch(e) {
        console.log(`connect DB fail: ${e}`);
    }
}


module.exports = connectDB;