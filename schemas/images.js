const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const imageSchema = new Schema({
    // 이미지 업로드한 사용자 고유값(id)
    id: {
        // type: ObjectId,
        type: String,
        required: true,
        ref: 'User',
    },

    // 이미지 해시값
    hash: {
        type: String,
        required: true,
        unique: true,
    },

    // 이미지 대체텍스트
    description: {
        type: String,
        required: true,
    },

    // 이미지의 tf-idf vector (json)
    tokenizedvector: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Image', imageSchema);