const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const pairSchema = new Schema({
    id: {
        type: ObjectId,
        required: true,
        ref: 'User',
    },

    hash: {
        type: String,
        required: true,
        unique: true
    },

    description: {
        type: String,
        required: true,
    },

    tokenizedvector: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Pair', pairSchema);