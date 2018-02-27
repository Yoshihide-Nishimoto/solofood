var dish = require('../mssql/Dish');
var config = require('../common/Const.json')[process.env.NODE_ENV];

module.exports = function(express) {

	var router = express.Router();

	router.get('/', function(req, res, next) {
		
		console.log("get /dish");

		dish.selectNotComfarmed(next,function(datas){
			
			res.render('dish', {
				dishes: datas,
				subtitle:"料理表示順変更",
				BlobServiceEndpoint:config.BlobServiceEndpoint
			});
			
		});
		
	});

	router.post('/setpriority', function(req, res, next) {
	  
		console.log("post /dish/setpriority");

		var id = req.body.id;
		var priority = req.body.priority;

		dish.setPriorityByID(next,id,priority,function(data){
		  
		  res.send("更新に成功しました");
		
		});
	
	});

  return router;
}