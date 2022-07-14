const db = require("../../config/mysql");
const dbcreate = require("../../db/createtable")

exports.insertContent = async(req,res)=>{
    try{
        const {content} = req.body;
        if(!content){
            res.status(400).json({
                message : "Information Incomplete"
            })
        }
        else{
            dbcreate.createTable(content,(obj)=>{
                obj.increments('id'),
                obj.integer('productid')
            })
            await db("content").insert({
                name : content,
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

exports.insertProductcontent = async(req,res)=>{
    try{
        const {content,productid} = req.body;
        if(!content || !productid)res.status(400).json({
            message : "Information Incomplete"
        })
        await Promise.all(
            productid.map(async(index)=>{
                await db(content).insert({
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