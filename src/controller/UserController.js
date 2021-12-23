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
            Img.findOne({owner: user._id}, function(err, img) {
                return res.render('myAccount', {
                    user : component(user),
                    avatar : img.src,
                })
            })
        })
    }

    // view chỉnh sửa thông tin cá nhân
    updateProfile(req, res, next) {
        const provider = req.user.provider;
        var id = req.user.id;
        User.findOne({id: id,authType: provider}, function(err, user) {
            Img.findOne({owner: user._id}, function(err, img) {
                return res.render('updateProfile', {
                    user : component(user),
                    avatar : img.src,
                })
            })
        })
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
        const provider = req.user.provider;
        var id = req.user.id;
        
        User.findOne({id: id,authType: provider}, function(err, user) {
            if(user){
                user.username = req.body.username;
                user.email = req.body.email;
                user.address = req.body.address;
                user.dateOfBirth = req.body.dateOfBirth;
                user.gender = req.body.gender;
                user.save();

                if(req.files) {         // kiểm tra xem có cập nhật ảnh mới lên ko
                    Img.findOne({id:req.files.avatar.md5}, function(err, img){     // tìm kiếm ảnh đã có trog db hay chưa
                        if(!img) {
                            const dataBase64 = req.files.avatar.data.toString("base64");
                            const buffer = Buffer.from(dataBase64,'base64');
                            const img = {
                                name: req.files.avatar.name,
                                id: req.files.avatar.md5, // lấy id từ hàm băm md5
                                img : {
                                    contentType:req.files.avatar.mimetype,
                                    data:dataBase64,
                                    image: buffer
                                }
                            };
                            const image = new Img(img);
                            image.owner = user;
                            user.avatar = image;
                            user.save(); image.save();
                        } 
                    })
                    // res.render('myAccount', {
                    //     user: component(user),
                    //     dataBase64 : dataBase64,
                    // })
                    res.json(dataBase64);

                } else {
                    Img.findOne({owner: user._id}, function(err, img){
                        res.render('myAccount', {
                            user: component(user),
                            avatar: img.src
                        })
                    });
                }
            }
        })
        // res.json(req.body);
    }


}

module.exports = new UserController;
