const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: { ObjectId } } = Schema;

const imageSchema = new Schema({
    // 이미지 업로드한 사용자 고유값(id)
    id: {
        type: ObjectId,
        required: true,
        ref: 'User',
    },

    // 이미지 파일경로 (파일명은 이미지 해시값으로)
    hash: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Image', imageSchema);