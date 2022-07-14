const db = require('../../config/mysql');

exports.queryProduct = async(req,res,next)=>{
    try{
        req.id = req.params.id
        req.product = await db("product").from("product").select("id","title","originalprice","sale","unit","technicaldata","description","stock").where({id : req.id});
        if(req.product.length == 0)res.status(400).json({
            message : "Not Found Product"
        })
        else{
            next();
        }
    }catch(err){
        res.status(500).json({
            message : 'Successful'
        })
    }
}

exports.queryProductImage = async(req,res,next)=>{
    try{
        const image = await db("productimage").from("productimage").select("imageurl").where({productid : req.id});
        req.productimage = image.map(index => index.imageurl);
        next();
    }catch(err){
        res.status(500).json({
            message : 'Successful'
        })
    }
}

exports.queryProductReview = async(req,res)=>{
    try{
        req.productreview = await db("productreview").from("productreview").select("img","rating","description","imgreview1","imgreview2","imgreview3").where({productid : req.id});
        res.json({
            id : req.product[0].id,
            title : req.product[0].title,
            originalprice : parseFloat(req.product[0].originalprice),
            sale : parseFloat(req.product[0].sale),
            unit : req.product[0].unit,
            technicaldata : req.product[0].technicaldata,
            description : req.product[0].description,
            stock : req.product[0].stock,
            img : req.productimage,
            review : req.productreview
        })
    }catch(err){
        res.status(500).json({
            message : 'Successful'
        })
    }
}