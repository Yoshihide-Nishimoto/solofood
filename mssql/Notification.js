var mssql = require('mssql');
var config = require('../common/Const.json')[process.env.NODE_ENV];

exports.create = function(next, param, callback){
    
    console.log("DB access Notification create");

    mssql.connect(config.mssql, function(err) {

        if (err) {
            next(new Error(err));
            return
        }

        var request = new mssql.Request(); 
        request.input('title',mssql.NVarChar,param['title']);
        request.input('text',mssql.NVarChar,param['text']);
        request.input('period_from',mssql.NVarChar,param['period_from']);
        request.input('period_to',mssql.NVarChar,param['period_to']);
        request.input('priority',mssql.Int,param['priority']);
      
        request.query('insert into Notification(title,text,period_from,period_to,priority) VALUES(@title,@text,@period_from,@period_to,@priority)',function(err, data) {

            if (err) {
                next(new Error(err));
            } else {
                callback(data);
            } 

            mssql.close();
            
        });

    });
    
}