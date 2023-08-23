const express = require('express');
const multer = require('multer');
const Images = require('../schemas/images');
const Pairs = require('../schemas/pair');

const router = express.Router();

const upload = multer({ dest: '../public/images/', limits: { fileSize: 5 * 1024 * 1024 } });

// 이미지 업로드 (multer 이용해 구현 예정? 승영과 논의 필요)
router.post('/upload', upload.('filename'), async (req, res) => {
    try {
        // TODO: 이미지 해시값 검사 기능 구현
        // TODO: 이미지 파일을 AI 서버의 public/images 폴더에 업로드하는 기능 구현
        // TODO: 이미지 AltText 받아오기
        // TODO: 파일 삭제(?)
        // TODO: id값과 hash값을 DB에 추가

        console.log("이미지 업로드 완료");
        res.status(201).send("이미지 업로드 완료")
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
})

// (업로드된) 이미지 가져오기, 파일명은 이미지의 파일명(public/images 안에 있는 이미지 참조, 추후 파일명은 해시값으로 변경되어야 함)
router.get('/images/:img', async (req, res) => {
    try {
        console.log("run 이미지 가져오기");
        res.status(200).sendFile(__dirname + 'public/images/' + req.params.img);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
})

// 쿼리문을 줬을 때 사진 검색하기
router.get('/search', async (req, res) => {
    try {
        // TODO: AI 서버의 getBestPictures API를 호출해서 검색된 사진의 해시값을 반환하는 기능 구현
            // const selectedPicture = await axios.get('req.body.tfidf, req.body.query')
        // TODO: AI 서버에서 받은 사진의 해시값을 리턴
            // res.status(200).send({ hash: selectedPicture.hash })
        res.status(200).send("사진 검색하기");
        console.log("run getBestPicture");
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
})

// 이미지의 대체텍스트 가져오기 getAltText
router.get('/getAlt', async(req, res) => {
    try {
        // TODO: req.body.path값을 AI 서버에 전달해 tokenizedvector와 description 받아오기
            // const res = await axios.get('URI', {path: req.body.path});
        // 이미지의 id (req.body.id)와 req.body.path, AI 서버에서 받은 tokenizedvector와 description을 pair로 DB에 저장하기
            // const pair = await Pairs.create({
            //     id: res.body.id,
            //     hash: res.body.hash,
            //     description: res.body.description,
            //     tokenizedvector: res.body.tokenizedvector,
            // })

        res.status(200).send("사진 대체텍스트 가져오기");
        console.log("run getAltText");
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
})

module.exports = router;