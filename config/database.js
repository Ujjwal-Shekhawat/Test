const mongoose = require('mongoose');
const config = require('config');
const data_base = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(data_base, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true,
            useUnifiedTopology: true
        });
        console.log('mongodb connected');
    } catch(err) {
        console.log(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;