const db = require('../config/mysql');

exports.createTable = (tablename,obj)=>{
    db.schema.hasTable(tablename).then((check)=>{
        if(!check){
            db.schema.createTable(tablename,obj).then(
                ()=> console.log("Table Created")
            ).catch((err)=>{
                console.log(err)
                throw err;
            })
        }
    });
}
