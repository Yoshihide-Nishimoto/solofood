var mssql = require('mssql');
var config = require('../common/Const.json')[process.env.NODE_ENV];
var azure = require('azure-storage');

exports.create = function(next, param, path, callback){
    
    console.log("DB access Feature create");

    mssql.connect(config.mssql, function(err) {

        if (err)　{
            next(new Error(err));
            mssql.close();
            return
        }

        const transaction = new mssql.Transaction();
        transaction.begin(function(err){

            let rolledBack = false
 
            transaction.on('rollback', function(aborted) {
         
                rolledBack = true
                mssql.close();
         
            });

            var request = new mssql.Request(transaction);

            request.input('title',mssql.NVarChar,param['title']);
            request.input('text',mssql.NVarChar,param['text']);
            request.input('period_from',mssql.NVarChar,param['period_from']);
            request.input('period_to',mssql.NVarChar,param['period_to']);
            request.input('priority',mssql.Int,param['priority']);

            request.query('insert into Feature (title,text,period_from,period_to,priority) OUTPUT Inserted.id values (@title,@text,@period_from,@period_to,@priority)', function(err, insert_feature) {

                if (err) {
                    if (!rolledBack) {
                        transaction.rollback(function(err) {
                            next(new Error(err));
                        });
                    }
                } else {

                    var request = new mssql.Request(transaction);
                    var sql = "insert into FeatureDish (feature_id,dish_id) values ";
                    request.input('feature_id',mssql.NVarChar,insert_feature['recordset'][0]['id']);
                    for(i=0;i<param['feature_dishid'].length;i++){
                        $key = i + 1;
                        request.input('dish_id'+$key,mssql.NVarChar,param['feature_dishid'][i]);

                        if(i==0){
                            sql += "(@feature_id,@dish_id" + $key + ")";
                        } else {
                            sql += ",(@feature_id,@dish_id" + $key + ")";
                        }
                    }
                    console.log(sql);
                    request.query(sql, function(err, data) {

                        if (err) {
                            next(new Error(err));
                            if (!rolledBack) {
                                transaction.rollback(function(err) {
                                    next(new Error(err));
                                });
                            }
                        } else {
                            transaction.commit(function(err, ret) {
                                if(err){
                                    next(new Error(err));
                                }
                                var blobService = azure.createBlobService(config.BlobAccount,config.BlobKey);
                                    blobService.createBlockBlobFromLocalFile(config.ContainerFeatureImage,insert_feature['recordset'][0]['id'] + '.png',path, function(error, result, response) {
                                        if (!error) {
                                            next(new Error(err));
                                        }
                                });
                                callback(data);
                                mssql.close();
                            });
                            
                        }

                    });

                }

            });


        });

    });

}

exports.selectDish = function(next, name, callback){

    console.log("DB access Dishes selectNotComfarmed By name");

    mssql.connect(config.mssql, function(err) {

        if (err) {
            mssql.close();
            return
        }

        var request = new mssql.Request();
        request.input('name',mssql.NVarChar,'%' + name + '%');
  
        request.query("SELECT dish.id as id,dish.name as name,restaurant.name as rname,restaurant.address as raddress,dish.mealtime as mealtime,category.displayname as category,dish.price as price,CONVERT(NVarChar,dish.createdat,111) as createdDate,dish.userid as userid,dish.mediatype as mediatype,dish.comment as comment,dish.score as score FROM Dish LEFT OUTER JOIN Restaurant ON dish.restaurantid = restaurant.id LEFT OUTER JOIN Category ON dish.category = Category.categoryid WHERE restaurant.address LIKE @name and dish.priority BETWEEN 0 AND 1 ORDER BY priority", function(err, datas) {
        
            if (err) {
                next(new Error(err));
            } else {
                callback(datas);
            } 

            mssql.close();
        
    });

  });

}