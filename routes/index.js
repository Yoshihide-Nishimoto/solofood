module.exports = function(express) {

	var router = express.Router();

    router.get('/', function(req, res, next) {
    	
  		console.log("get /");

  		res.render('index',{subtitle: "トップメニュー"});
  		
	});

    return router;
}