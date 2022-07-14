const db = require('../../config/mysql');
const dbcreate = require("../../db/createtable")

exports.insertType = async(req,res)=>{
    try{
        const {type} = req.body;
        if(!type || !req.files)res.status(400).json({
            message : "Information Incomplete"
        })
        else{
            dbcreate.createTable(type,(obj)=>{
                obj.increments('id'),
                obj.integer('productid')
            })
            await db("type").insert({
                name : type,
                img : `http://localhost:8080/img/${req.files[0].filename}`
            })
            res.json({
                message : "Successful"
            })
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            error : err
        })
    }
}

exports.insertProducttype = async(req,res)=>{
    try{
        const {type,productid} = req.body;
        if(!type || !productid)res.status(400).json({
            message : "Information Incomplete"
        })
        await Promise.all(
            productid.map(async(index)=>{
                await db(type).insert({
                    productid : index
                })
            })
        )
        res.json({
            message : "Successful"
        })
    }catch(err){
        res.status(500).json({
            error : err
        })
    }
}
