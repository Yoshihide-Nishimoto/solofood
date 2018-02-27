var restaurant = require('../mssql/Restaurant');
var config = require('../common/Const.json')[process.env.NODE_ENV];

module.exports = function(express) {

	var router = express.Router();

	router.get('/', function(req, res, next) {

		console.log("get /restaurant");

		restaurant.selectNotComfarmed(next,function(datas){
		
			res.render('restaurant', {
				restaurants: datas,
				subtitle:"新規レストラン確認",
				BlobServiceEndpoint:config.BlobServiceEndpoint
			});
		
		});
		
	});

	router.post('/action_confirm', function(req, res, next) {

		console.log("post /restaurant/action_confirm");

		var id = req.body.id;
	  
		restaurant.updateIsConfirmed(next, id, function(data){

			res.send("確認が完了しました");
	  
		});
	  
	});

	router.post('/action_change', function(req, res, next) {

		console.log("post /restaurant/action_change");

		req.checkBody('restaurant_name', '店舗名を入力して下さい').notEmpty();
		req.checkBody('restaurant_latitude', '緯度に整数を入力して下さい').notEmpty().isInt();
		req.checkBody('restaurant_longitude', '経度に整数を入力して下さい').notEmpty().isInt();

		req.getValidationResult().then(function(result) {
	  
		if (!result.isEmpty()) {
	  
			/*
			var errmsgs = result.array().map(function (elem){
			
				return elem.msg;
		  
			});
			*/

			res.status(400).send("入力に誤りがあります");
	  
		} else {
		
			// TODO: サニタイズする

			var id = req.body.id;
			var restaurant_name = req.body.restaurant_name;
			var restaurant_address = req.body.restaurant_address;
			var restaurant_openinghours = req.body.restaurant_openinghours;
			var restaurant_closingDay = req.body.restaurant_closingDay;
			var restaurant_latitude = req.body.restaurant_latitude;
			var restaurant_longitude = req.body.restaurant_longitude;

			var param = {
			  "id":id,
			  "restaurant_name":restaurant_name,
			  "restaurant_address":restaurant_address,
			  "restaurant_openinghours":restaurant_openinghours,
			  "restaurant_closingDay":restaurant_closingDay,
			  "restaurant_latitude":restaurant_latitude,
			  "restaurant_longitude":restaurant_longitude
			};
			
			restaurant.updateByID(next, param, function(data){

				res.send("更新が完了しました");
			
			});

		}

	  });
	  
	});

	return router;
}