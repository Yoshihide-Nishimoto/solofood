module.exports = function(express) {

    var router = express.Router();

    // ログインページ
    router.get("/", function (req, res) {

        console.log("get /login");

        res.render('login',{message:""});

    });

    router.post("/", function (req, res, next) {

        console.log("post /login");

        req.checkBody('email', 'メールアドレスを入力して下さい').notEmpty();
        req.checkBody('password', 'パスワードを入力して下さい').notEmpty();

        req.getValidationResult().then(function(result) {

            if (!result.isEmpty()) {

                res.render('login',{message:"メールアドレス・パスワードいずれかが不正です"});
                return;

            } else {

                var email    = req.body.email;
                var password = req.body.password;
                
                if(email == "kubota" && password == "kubota"){

                    req.session.user = {name:"kubota"};
                    res.redirect('/');
                
                }else{
                
                	res.render('login',{message:"メールアドレス・パスワードいずれかが不正です"});
                
                }

            }

        });

    });

    return router;
}