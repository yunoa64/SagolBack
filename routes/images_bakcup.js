const express = require('express');
const Images = require('../schemas/images');

const router = express.Router();

const DIR = '../public/images';

// 이미지 업로드 (업로드 기능 추가 구현 필요)
router.post('/upload', upload.single('filename'), async (req, res, next) => {
    try {
        console.log("upload images");
        
        // 이미지 해시값 검사
        let hash = createHash(id, image); // 추후 구현해야 함
        
        // 해시값이 동일하면 서버에 이미지를 저장하고 DB에 이미지 정보 업로드
        if (hash == req.body.hash) {
            /* 서버에 이미지 저장 */
            // TODO

            /* DB에 이미지 정보 업로드 */
            // 데이터 row 제작      
            const image = await Images.create({
                id: "",
                image: req.body.image,
                hash: req.body.hash,
            }, {
                collection: 'images'
            })
            console.log(user); // 생성한 이미지 출력
            res.status(201).json(image); // 이미지 업로드 완료 알림 
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
})


module.exports = router;