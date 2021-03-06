const mongoose =require('mongoose');

const TransactionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    comment: {
        type: String,
        required: false
    },
    remeaningbalance: {
        type: Number,
        required: false,
        default: 0
    },
    lasttransaction: {
        type: Number,
        required: true
    },
    Date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('transcation', TransactionSchema);