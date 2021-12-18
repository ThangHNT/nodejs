const User = require('../models/user.js');
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

    logout(req, res, next) {
        req.session.destroy();
        req.user = null;
        res.redirect('/login');
    }

    myAccount(req, res, next) {
        const provider = req.user.provider;
        var id = req.user.id;
        var user;
        if(provider == 'facebook') {
            user = User.findOne({facebookId: id});
        } else {
            user = User.findOne({googleId: id});
        }
        // res.render('myAccount', {
            
        // });
        res.send('thanh cong' + user);
    }
}

module.exports = new UserController;
