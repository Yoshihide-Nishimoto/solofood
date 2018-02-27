var mssql = require('mssql');
var config = require('../common/Const.json')[process.env.NODE_ENV];

exports.selectNotComfarmed = function(next, callback){

	console.log("DB access Dishes selectNotComfarmed");

	mssql.connect(config.mssql, function(err) {

		if (err) {
	  		return
	  	}

		var request = new mssql.Request(); 
  
		request.query("SELECT TOP 100 dish.id as id,dish.name as name,restaurant.name as rname,dish.mealtime as mealtime,category.displayname as category,dish.price as price,CONVERT(NVarChar,dish.createdat,111) as createdDate,dish.userid as userid,dish.mediatype as mediatype,dish.comment as comment,dish.score as score FROM Dish LEFT OUTER JOIN Restaurant ON dish.restaurantid = restaurant.id LEFT OUTER JOIN Category ON dish.category = Category.categoryid WHERE dish.isconfirmed IS NULL OR dish.isconfirmed = '0' ORDER BY createdDate DESC",function(err, datas) {
		
		  	if (err) {
		  		next(new Error(err));
		  	} else {
		  		callback(datas);
		  	} 

			mssql.close();
		
	});

  });

}


exports.setPriorityByID = function(next, id, priority, callback){

	console.log("DB access Dishes setPriorityByID");

	mssql.connect(config.mssql, function(err) {

		if (err) {
	  		next(new Error(err));
	  		return
	  	}

		var request = new mssql.Request(); 

		request.input('id',mssql.NVarChar,id);
		request.input('priority',mssql.Int,priority);
		
		request.query('update dish set priority = @priority,isconfirmed = 1 WHERE ID = @id',function(err, data) {
			
			if (err) {
		  		next(new Error(err));
		  	} else {
		  		callback(data);
		  	} 

			mssql.close();
			
		});

	});

}