const db = require('../../config/mysql');

exports.insertProduct = async(req,res,next)=>{
    try{
        const {title,originalprice,sale,unit,technicaldata,description,stock} = req.body;
        if(!title || !originalprice || !sale || !unit || !technicaldata || !description || !stock || !req.files) 
        res.status(400).json({
            message : "Information Incomplete"
        })
        const productId = await db("product").insert({
            title : title,
            originalprice : parseFloat(originalprice),
            sale : parseInt(sale),
            unit : unit,
            technicaldata : technicaldata,
            description : description,
            stock : parseInt(stock)
        })
        req.productId = productId;
        req.title = title;
        next()
    }catch(err){
        console.log(err);
        res.status(500).json({
            error : err
        })
    }
}

exports.insertProductImage = async(req,res,next)=>{
    await Promise.all(
        req.files.map(async(index)=>{
            await db("productimage").insert({
                productid : req.productId,
                title : req.title,
                imageurl : `http://localhost:8080/img/${index.filename}`
            })
        })
    );
    res.json({
        "message" : "Successful"
    })
}

exports.insertProductReview = (req,res)=>{

}