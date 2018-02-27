var feature = require('../mssql/Feature');
var fs = require('fs');
var config = require('../common/Const.json')[process.env.NODE_ENV];

module.exports = function(express) {

	var router = express.Router();

	router.get('/', function(req, res, next) {

		console.log("get /feature");

		//未実装

	});

	router.get('/new', function(req, res, next) {

		console.log("get /feature/new");

		res.render('feature',{
			subtitle:"特集ページ投稿",
			BlobServiceEndpoint:config.BlobServiceEndpoint
		});
	});

	router.post('/selectDish', function(req, res, next) {

		console.log("post /selectDish");

		req.checkBody('name', '名前を入力して下さい').notEmpty();
		req.getValidationResult().then(function(result) {

			if (!result.isEmpty()) {

				res.status(400).send("入力に誤りがあります");

			} else {

				var name = req.body.name;

				feature.selectDish(next,name,function(datas){
					res.send(datas);
				});

			}

		});

	});

	router.post('/confirm', function(req, res, next) {

		console.log("post /feature/confirm");

		console.log("title:" + req.body.title);
		console.log("text:" + req.body.text);
		console.log("period_from:" + req.body.period_from);
		console.log("period_to:" + req.body.period_to);
		console.log("priority:" + req.body.priority);

		var title = req.body.title;
		var text = req.body.text;
		var period_from = req.body.period_from;
		var period_to = req.body.period_to;
		var priority = req.body.priority;

		req.checkBody('title', '件名を入力して下さい').notEmpty();
		req.checkBody('text', '本文を入力して下さい').notEmpty();
		req.checkBody('period_from', '掲載開始日を入力して下さい').notEmpty();
		req.checkBody('period_to', '掲載終了日を入力して下さい').notEmpty();
		req.checkBody('priority', '優先度を入力して下さい').notEmpty();

		req.getValidationResult().then(function(result) {

			if (!result.isEmpty()) {

				res.status(400).send("入力に誤りがあります");

			 } else {



			 	var dishids = req.body.dishid;
			 	var count = 0;
			 	var param_dishid = [];

			 	for(var i = 0; i < dishids.length; i++){
			 		if(dishids[i] == ""){
			 			continue;
			 		} else {
			 			count += 1;
			 		}
			 	}

			 	if(count>10){
	 				res.status(400).send("11件以上料理が選択されています");
	 			} else if (count==0){
	 				res.status(400).send("料理が選択されていません");
	 			} else {
	 				res.send("");
	 			}

			}

		});

	});

	router.post('/', function(req, res, next) {

		console.log("post /feature/new");

		req.checkBody('title', '件名を入力して下さい').notEmpty();
		req.checkBody('text', '本文を入力して下さい').notEmpty();
		req.checkBody('period_from', '掲載開始日を入力して下さい').notEmpty();
		req.checkBody('period_to', '掲載終了日を入力して下さい').notEmpty();
		req.checkBody('period_from', '掲載開始日を正しく入力して下さい').notEmpty().isDate();
		req.checkBody('period_to', '掲載終了日を正しく入力して下さい').notEmpty().isDate();
		req.checkBody('priority', '優先度を入力して下さい').notEmpty();

		req.getValidationResult().then(function(result) {

			if (!result.isEmpty()) {

				res.status(400).send("入力に誤りがあります");

			} else {

				var dishids = req.body.dishid;
			 	var count = 0;
			 	var param_dishid = [];
			 	for(var i = 0; i < dishids.length; i++){
			 		if(dishids[i] == ""){
			 			continue;
			 		} else {
			 			console.log(dishids[i]);
			 			param_dishid.push(dishids[i]);
			 			count += 1;
			 		}
			 	}

			 	if(count>10){
	 				res.status(400).send("11件以上料理が選択されています");
	 			} else if (count==0){
	 				res.status(400).send("料理が選択されていません");
	 			} else {

	 				var title = req.body.title;
					var text = req.body.text;
					var period_from = req.body.period_from;
					var period_to = req.body.period_to;
					var priority = req.body.priority;

					var param = {
					 	"title":title,
						"text":text,
						"period_from":period_from,
						"period_to":period_to,
						"priority":priority,
						"feature_dishid":param_dishid,
					};

					feature.create(next, param,req.file.path, function(data){
						
						res.send("特集が追加されました");
						
					});
	 				
	 			}

			}

		});

	});

	router.put('/', function(req, res, next) {

		console.log("put /feature");

		//未実装

	});

	router.delete('/', function(req, res, next) {

		console.log("delete /feature");

		//未実装

	});

	return router;

}
