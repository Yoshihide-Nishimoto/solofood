var notification = require('../mssql/Notification');
var pushNotification = require('../common/pushNotification.js');

module.exports = function(express) {

	var router = express.Router();

	router.get('/', function(req, res, next) {

		console.log("get /notification");

		//未実装

	});

	router.get('/new', function(req, res, next) {

		console.log("get /notification/new");

		res.render('notification',{subtitle:"お知らせ登録"});

	});

	router.post('/confirm', function(req, res, next) {

		console.log("post /notification/confirm");

		req.checkBody('title', '件名を入力して下さい').notEmpty();
		req.checkBody('text', '本文を入力して下さい').notEmpty();
		req.checkBody('period_from', '掲載開始日を入力して下さい').notEmpty();
		req.checkBody('period_to', '掲載終了日を入力して下さい').notEmpty();
		req.checkBody('priority', '優先度を入力して下さい').notEmpty();

		req.getValidationResult().then(function(result) {

			if (!result.isEmpty()) {

				/*
				var errmsgs = result.array().map(function (elem){

					return elem.msg;

				});
				*/

				res.status(400).send("入力に誤りがあります");

			 } else {

				res.end();

			}

		});

	});

	router.post('/', function(req, res, next) {

		console.log("post /notification/new");

		req.checkBody('title', '件名を入力して下さい').notEmpty();
		req.checkBody('text', '本文を入力して下さい').notEmpty();
		req.checkBody('period_from', '掲載開始日を入力して下さい').notEmpty();
		req.checkBody('period_to', '掲載終了日を入力して下さい').notEmpty();
		req.checkBody('period_from', '掲載開始日を正しく入力して下さい').notEmpty().isDate();
		req.checkBody('period_to', '掲載終了日を正しく入力して下さい').notEmpty().isDate();
		req.checkBody('priority', '優先度を入力して下さい').notEmpty();

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
					"priority":priority
				};

				notification.create(next, param, function(data){

					if(process.env.NODE_ENV == 'production'){
						console.log("notificate");
						pushNotification.sendNotification(param.text, 0, false);
					}
					res.send("お知らせが作成されました");

				});

			}

		});

	});

	router.put('/', function(req, res, next) {

		console.log("put /notification");

		//未実装

	});

	router.delete('/', function(req, res, next) {

		console.log("delete /notification");

		//未実装

	});

	return router;

}
