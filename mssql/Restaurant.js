var mssql = require('mssql');
var config = require('../common/Const.json')[process.env.NODE_ENV];

exports.selectNotComfarmed = function(next, callback){

	console.log("DB access Restaurants selectAll");

	mssql.connect(config.mssql, function(err) {

		if (err) {
	  		next(new Error(err));
	  		return
	  	}

		var request = new mssql.Request(); 
		
		request.query('SELECT TOP 100 id,name,address,openingHours,closingDay,latitude,longitude,insidephotocount,outsidephotocount,CONVERT(NVarChar,createdat,111) as createdDate FROM Restaurant WHERE (ISCONFIRMED IS NULL) OR (ISCONFIRMED <>1) ORDER BY createdat DESC',function(err, datas) {
			
			if (err) {

		  		next(new Error(err));
		  	
		  	} else {
		  	
		  		callback(datas);
		  	
		  	} 

			mssql.close();
			
		});

	});

}

exports.updateIsConfirmed = function(next, id, callback){

	console.log("DB access Restaurants updateIsConfirmed");

	mssql.connect(config.mssql, function(err) {

		if (err) {
	  		next(new Error(err));
	  		return
	  	}

		var request = new mssql.Request();
		request.input('id',mssql.NVarChar,id);
	
		request.query('update Restaurant set ISCONFIRMED = 1 WHERE ID = @id',function(err,data) {
			
			if (err) {
		  		next(new Error(err));
		  	} else {
		  		callback(data);
		  	} 

			mssql.close();
			
		});

	});

}

exports.updateByID = function(next, param, callback){

	console.log("DB access Restaurants updateByID");

	mssql.connect(config.mssql, function(err) {

		if (err) {
	  		next(new Error(err));
	  		return
	  	}

		var request = new mssql.Request();
		request.input('id',mssql.NVarChar,param['id']);
		request.input('name',mssql.NVarChar,param['restaurant_name']);
		request.input('address',mssql.NVarChar,param['restaurant_address']);
		request.input('openinghours',mssql.NVarChar,param['restaurant_openinghours']);
		request.input('closingDay',mssql.NVarChar,param['restaurant_closingDay']);
		request.input('latitude',mssql.Int,param['restaurant_latitude']);
		request.input('longitude',mssql.NVarChar,param['restaurant_longitude']);

		request.query('update Restaurant set NAME = @NAME,ADDRESS = @ADDRESS,OPENINGHOURS = @openinghours,CLOSINGDAY = @closingDay,LATITUDE = @latitude,LONGITUDE = @longitude,ISCONFIRMED = 1 WHERE ID = @id',function(err,data) {
			
			if (err) {
		  	
		  		next(new Error(err));
		  	
		  	} else {

		  		callback(data);
		  	
		  	} 

			mssql.close();
			
		});

	});

}
