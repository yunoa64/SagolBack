const express = require('express');
const multer = require('multer');
const Images = require('../schemas/images');
const Pairs = require('../schemas/pair');
const path = require('path');

const router = express.Router();

/*************
시나리오 1
1. 프론트에서 이미지를 보낸다.

2. 프론트에서 이미지를 받으면 (해시값까지해서) 그 이미지를 인공지능 서버에 보낸다.

3. AI 서버에서 (받은 이미지에 대해) 대체텍스트를 생성 (+ tokenizedvector)해서 백엔드 서버로 보낸다.

4. DB에 저장하고 프론트에 hash + desc 보낸다.

시나리오 2
1. 프론트엔드에서 질문을 보낸다.

2. 백엔드서는 질문을 받고 + TF-IDF 매트릭스를 AI 서버에 요청한다 (getbestpictures())

3. AI 서버에서는 가장 적합한 사진 하나의 hash를 리턴한다.

4. 백엔드에서는 hash값을 프론트엔드로 리턴한다.
***************/

// 이미지 업로드 (multer 이용해 구현 예정? 승영과 논의 필요)

const upload = multer({
    storage: multer.diskStorage({
      destination(req, file, done) {
        done(null, 'public/images');
      },
      filename(req, file, done) {
        const ext = path.extname(file.originalname);
        done(null, path.basename(file.originalname, ext)+ ext);
      },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/upload', upload.single('filename'), (req, res) => {
    try {
        console.log(req.file);
        res.status(200).send("upload complete");
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }

    // TODO: 이미지 해시값 검사 기능 구현

    // TODO: AI 서버에서 이미지 AltText 받아오기
        
    // TODO: 파일 삭제(?)
    // TODO: id값과 hash값을 DB에 추가

});

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

