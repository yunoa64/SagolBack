const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const matrixSchema = new Schema({

});

module.exports = mongoose.model('Matrix', matrixSchema);