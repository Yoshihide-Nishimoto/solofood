var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator')
var multer = require("multer");
var session = require('express-session')({
    secret: 'my-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie:{
      httpOnly: true,
      secure: false,
      maxage: 1000 * 60 * 60 * 24
    }
});
var sessionCheck = function(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.redirect('/login');
    }
};
console.log(app.get('env'));
var port = process.env.PORT || 1338;
var route_login = require('./routes/login')(express);
var route_root  = require('./routes/index')(express);
var route_restaurant  = require('./routes/restaurant')(express);
var route_dish  = require('./routes/dish')(express);
var route_notification  = require('./routes/notification')(express);
var route_feature  = require('./routes/feature')(express);

/*app.engine('ejs', require('ejs-locals'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');*/

var jade = require('jade');
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', { basedir: process.env.__dirname})


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(express.static(path.join(__dirname,'public')));
app.use(cookieParser());
app.use(session);
app.use(multer({dest: './tmp/'}).single('file'));
app.use('/login',route_login);
app.use('/',sessionCheck,route_root);
app.use('/restaurant',sessionCheck,route_restaurant);
app.use('/dish',sessionCheck,route_dish);
app.use('/notification',sessionCheck,route_notification);
app.use('/feature',sessionCheck,route_feature);
app.use(function(err, req, res, next) {
  console.error("system error occured");
  console.error(err.stack);
  res.status(500).send("システムが異常終了しました");
});
 
app.listen(port,function(){
    console.log("Running on port " + port);
});