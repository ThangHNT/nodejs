const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController.js');
// const multer  = require('multer');      
// var storage = multer.diskStorage({      // tạo storage để lưu file ảnh
//     destination: (req, file, cb) => {   // lấy vị trí file ảnh
//         cb(null, './src/public/uploads')    // ảnh đc lưu vào thư mục upload
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname )
//     }
// });

// var upload = multer({ storage: storage });

// router.post('/uploadData',upload.single('avatar'),userController.uploadData); // lưu file ảnh vào folder uploads, req.file có info file
router.get('/myAccount',userController.myAccount);
router.get('/updateProfile',userController.updateProfile); 
router.post('/uploadData',userController.uploadData);
router.post('/login/:email',userController.login);
router.get('/login',userController.viewLogin);
router.post('/sign-up/:email',userController.signUp);
router.get('/sign-up',userController.viewSignUp);
router.get('/logout',userController.logout);

module.exports = router;
