const mongoose = require('mongoose');

const { Schema } = mongoose;

// 각 사용자별 id 정의하는 스키마

const userSchema = new Schema({
    // TODO: 데이터 타입 추가 (기기 정보 등등?) if needed
});

module.exports = mongoose.model('User', userSchema);