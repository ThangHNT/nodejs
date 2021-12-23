const User = require('../models/user.js');
const {component} = require('../convertToObject');
const Img = require('../models/img.js');
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
        const provider = req.user.provider;
        var id = req.user.id;
        User.findOne({id: id,authType: provider}, function(err, user) {
            const avatar = Img.findOne({_id: user.avatar})
            // return res.render('myAccount', {
            //     user : component(user),
            //     avatar : avatar.src,
            // })
            res.json(avatar.src);
        })
        // res.render('myAccount');
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
        // =====================================================================================
        // dung voi express-fileupload
        // if(req.files) {
        //     
        //     Img.findOne({id_md5:req.files.avatar.md5}, function(err, img){     // tìm kiếm ảnh đã có trog db hay chưa
        //         if(!img) {
        //             var dataBase64 = req.files.avatar.data.toString("base64");
        //             const buffer = Buffer.from(dataBase64,'base64');
        //             const img = {
        //                 name: req.files.avatar.name,
        //                 id: req.files.avatar.md5, // lấy id từ hàm băm md5
        //                 img : {
        //                     contentType:req.files.avatar.mimetype,
        //                     data:dataBase64,
        //                     image: buffer
        //                 }
        //             };
        //             const image = new Img(img);
        //             image.save();
        //         }
        //     })
        //     res.redirect(`/account/uploaded/${id}`);
        // }
        // else {
        //     res.redirect(`/account/uploaded/${id}`);
        // }
        // var info = {
        //     username: req.body.username,
        //     avatar : req.files.avatar.data.toString("base64"),
        //     // avatar : '',
        //     gender: req.body.gender,
        //     dateOfBirth: req.body.dateOfBirth,
        //     address: req.body.address,
        //     email: req.body.email,
        // }
        // res.render('myAccount', {
        //     user: info,
        // })
        res.json(req.user);
    }


}

module.exports = new UserController;
