const express = require('express');
const router = express.Router();
const userController = require('../controller/UserController.js');

router.get('/myAccount',userController.myAccount);
router.get('/updateProfile',userController.updateProfile); 
router.post('/uploadData',userController.uploadData);
router.post('/login/:email',userController.login);
router.get('/login',userController.viewLogin);
router.post('/sign-up/:email',userController.signUp);
router.get('/sign-up',userController.viewSignUp);
router.get('/logout',userController.logout);

module.exports = router;
