const db = require("../../config/mysql");

exports.editflashsale = async(req,res)=>{
    const {date,time} = req.body
    const data = await db("flashsaletimer").from("flashsaletimer").select("id").where({id : 1});
    if(data.length != 0){
        await db("flashsaletimer").where({id : 1}).update({date : date,time: time})
    }
    else{
        await db("flashsaletimer").insert({date : date,time: time});
    }
    res.json({
        message : 'Successful'
    })
}

exports.queryflashsale = async(req,res,next)=>{
    req.flashsaletimer = await db("flashsaletimer").from("flashsaletimer").select("id").where({id : 1});
    next();
}