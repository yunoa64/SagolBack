const express = require('express');
const multer = require('multer');
const Image = require('../schemas/images');
const Pair = require('../schemas/pair');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
var FormData = require('form-data');

const router = express.Router();

/*************
시나리오 1
1. 프론트에서 이미지를 보낸다.

2. 프론트에서 이미지를 받으면 (해시값까지해서) 그 이미지를 인공지능 서버에 보낸다.

2-1. 인공지능 서버에서 id, hash, description을 받는다. 이 때 descriptoin은 영어이기 때문에 translate API 돌려서 한글 텍스트 받아온다.

3. AI 서버에서 (받은 이미지에 대해) 대체텍스트를 생성 (+ tokenizedvector)해서 백엔드 서버로 보낸다.

4. DB에 저장하고 프론트에 hash + desc 보낸다.

시나리오 2
1. 프론트엔드에서 질문을 보낸다.

2. 백엔드서는 질문을 받고 + TF-IDF 매트릭스를 AI 서버에 요청한다 (getbestpictures())

3. AI 서버에서는 가장 적합한 사진 하나의 hash를 리턴한다.

4. 백엔드에서는 hash값을 프론트엔드로 리턴한다.
***************/

// 이미지 업로드 (multer 이용해 구현)

// 테스트
router.post('/test', (req, res) => {
    console.log(req);

    const image = Image.create({
        Id: 2,
        Hash: 4,
        Description: "test1",
    });

    res.status(200).json({
        msg: "success"
    });
})

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

// 시나리오 1: 이미지 업로드
router.post('/upload', upload.single('filename'), async (req, res) => {
    // TODO: 이미지 해시값 검사 기능 구현 (임시로 파일명 사용해서 검사기능 구현해보기)
    // TODO: 해시값 구하는 함수 구현하기 (프론트엔드와 동일한 알고리즘으로)
    console.log(req);
    try {
        if (req.file.originalname == req.body.hash) {
            console.log("해시값 검사 통과");
        } else {
            console.log("해시값 검사 실패");
            res.status(500).json({
                error: "해시값 검사 실패"
            })
            res.end();
        }
    } catch (err) {
        res.status(500).json({
            error: err
        })
        res.end();
    }

    const formData = new FormData();
    formData.append("Image", fs.createReadStream('public/images/' + req.file.originalname));
    formData.append("Id", "Sagol");
    formData.append("Hash", req.body.hash);

    // AI 서버에서 이미지 AltText 받아오기
    const imgInfos = await axios.post("http://172.16.162.72:8890/getAltText", formData, { headers: { 'Content-Type': 'multipart/form-data' }, }).then(response => {
        return response;
        // return response.data[0];
    })

    console.log(imgInfos);

    // TODO: 파일 삭제(?)

    // 이미지의 해시값과 AltText, vector를 DB에 추가
    try {
        const image = Image.create({
            Id: imgInfos.Id,
            Hash: imgInfos.Hash,
            Description: imgInfos.Description,
            // Tokenizedvector: "vector1",
        });

        res.status(200).json({
            msg: "사진 업로드 성공",
            hash: imgInfos.Hash,
            description: imgInfos.Description,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })  
    }

    
    // 프론트엔드에 해시값과 대체텍스트 리턴
});



// (업로드된) 이미지 가져오기, 파일명은 이미지의 파일명(public/images 안에 있는 이미지 참조, 추후 파일명은 해시값으로 변경되어야 함)
router.get('/images/:img', async (req, res) => {
    try {
        console.log("run 이미지 가져오기");
        res.status(200).sendFile(__dirname + 'public/images/' + req.params.img);
    } catch (err) {
        res.status(500).json({
            error: err
        })
    }
})

// 시나리오 2: 쿼리문을 줬을 때 사진 검색하기
router.get('/search', async (req, res) => {
    try {
        // 사용자 id를 이용해 해당 사용자가 가지고 있는 이미지들을 모두 가져옴
        const pairs = await Image.find({Id: "Sagol"});

        console.log(pairs);
        // console.log(req.query.userText);
        
        const formData = new FormData();
        formData.append("userText", req.query.userText);
        formData.append("data", JSON.stringify(pairs));
        
        // TODO: AI 서버의 getBestPictures API를 호출해서 검색된 사진의 해시값을 반환하는 기능 구현
        const selectedPicture = await axios.post("http://172.16.162.72:8890/getBestPictures", formData, { headers: { 'Content-Type': 'multipart/form-data' }, }).then(response => {
            return response;
        });

        // 인공지능 서버에서 받은 해시값을 프론트엔드에 리턴
        res.status(200).json({
            hash: selectedPicture.data,
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: err
        })
    }
})

// 이미지의 대체텍스트 가져오기 getAltText
// router.get('/getAlt', async (req, res) => {
//     try {
//         // TODO: req.body.path값을 AI 서버에 전달해 tokenizedvector와 description 받아오기
//             // const res = await axios.get('URI', {path: req.body.path});
//         // 이미지의 id (req.body.id)와 req.body.path, AI 서버에서 받은 tokenizedvector와 description을 pair로 DB에 저장하기
//         const pair = await Image.create({
//             // id: "res.body.id",
//             id: "hcail",
//             hash: "res.by.hash",
//             description: "res.body.description",
//             tokenizedvector: "res.body.tokenizedvector",
//             // id: res.body.id,
//             // hash: res.body.hash,
//             // description: res.body.description,
//             // tokenizedvector: res.body.tokenizedvector,
//         })

//         const pairs = await Image.find({id: "hcail"});

//         console.log(pairs);

//         res.status(200).send("사진 대체텍스트 가져오기");
//         console.log("run getAltText");
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({
//             error: err
//         })
//     }
// })

module.exports = router;
