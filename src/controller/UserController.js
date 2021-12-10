const User = require('../models/user.js');
const {component} = require('../convertToObject');
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
                res.render('login-failed');
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

    
}

module.exports = new UserController;