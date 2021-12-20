const User = require('../models/user.js');
const {component} = require('../convertToObject');
const Img = require('../models/img.js');
const fs = require('fs');
class UserController {
    // khi ng dung nhap đăng nhập 
    viewSignUp(req, res, next) {
        res.render('sign-up');
    }

    // view dang nhap
    viewLogin(req, res, next) {
        res.render('login');
    }

    // dang nhap thanh cong va chuyen huong den Home
    login(req, res, next) {
        User.findOne({email: req.params.email}, function(err, user) {
            if(user == null){
                res.render('Login-failed');
                // res.json(user);
            }
            else {
                res.redirect(`/home/${user._id}`);
                
            }
        })
            
    }

    // Dang ky 
    signUp(req, res, next) {

        User.findOne({email: req.params.email}, function(err, user) {
            if(user == null){
                req.body.email = req.params.email;
                const user = new User(req.body);
                user.save()
                    .then(() => {
                        res.render("signUpSuccessfully", {
                            userId: user._id,
                        });
                    })
                    .catch(next);
            }
            else {
                res.render('accountAvailable', {
                    userId : user._id,
                });
            }
        })
    }

    // đăng xuất
    logout(req, res, next) {
        req.session.destroy();
        req.user = null;
        res.redirect('/login');
    }

    // xem thông tin tài khoản
    myAccount(req, res, next) {
        // const provider = req.user.provider;
        // var id = req.user.id;
        // if(provider == 'facebook') {
        //     User.findOne({facebookId: id}, function(err, user) {
        //         return res.render('myAccount', {
        //             user : component(user)
        //         })
        //     })
        // } else {
        //     User.findOne({googleId: id}, function(err, user) {
        //         return res.render('myAccount', {
        //             user : component(user)
        //         })
        //     });
        // }
        res.render('myAccount');
    }

    // view chỉnh sửa thông tin cá nhân
    updateProfile(req, res, next) {
        res.render('updateProfile');
    }

    // submit form chỉnh sửa thông tin cá nhân
    uploadData(req, res, next) {
        // dung voi multer
        // var img = fs.readFileSync(req.file.path);   // lấy đg dẫn file ảnh
        // var encode_img = img.toString('base64');    // chuyển về dạng base64
        // const buffer = Buffer.from(encode_img,'base64');    // cho ảnh vào bufer
        // var final_img = {                           // tạo obj Img để lưu vào db
        //     name: req.file.originalname,
        //     img : {
        //         contentType:req.file.mimetype,
        //         data:img,
        //         image: buffer
        //     }
        // };
        // const image = new Img(final_img);
        // image.save() 
        //     .then(() => {
        //         res.redirect(`/account/uploaded/${image._id}`)  
        //     })
        //     .catch(next);

        // dung voi formidable
        var formidable = require('formidable');
        var form = new formidable.IncomingForm();
        form.uploadDir = "./src/public/uplpoads";
        form.keepExtensions = true;
        form.maxFieldsSize = 1024*1024;
        form.multiples = true;
        form.parse(req,(err,fields, files) => {
            if(err) {
                res.json({mess: 'co loi'})
            }
            var arrayFiles = files[""];
            if(arrayFiles.length > 0) {
                var fileName =  [];
                arrayFiles.forEach((file) => {
                    fileName.push(file.path);
                })
                res.json({
                    data: fileName,
                    numberOfImages : fileName.length
                })
            }
            else {
                res.json({mess: 'co loi'})
            }
        })
    }

    // sau khi cập nhật dữ liệu 
    updatedData(req, res, next) {   
        Img.findOne({_id : req.params.id}, (err, item) => {
            if (err) {
                console.log(err);
                res.status(500).send('An error occurred', err);
            }
            else {
                const img = item.img.data.toString("base64");
                res.render('myAccount', {
                    img,
                })
            }
        });
    }
}

module.exports = new UserController;
