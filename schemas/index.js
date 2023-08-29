const mongoose = require('mongoose');

const connect = () => {
    if (process.env.NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }
    mongoose.connect('mongodb://localhost:27017/admin', {
        dbName: 'nodejs',
        // useNewUrlParser: true,
        // useCreateIndex: true,
    });
};

mongoose.connection.on('error', (error) => {
    console.error("몽고디비 연결 에러", error);
});

mongoose.connection.on('disconnected', () => {
    console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
    connect();
})

module.exports = connect;