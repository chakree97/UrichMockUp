const db = require('../../config/mysql');

exports.queryProducttype = async(req,res)=>{
    try{
        const content = req.params.type;
        const data = await db(content).from(content).select("productid")
        const result = [];
        await Promise.all(
            data.map(async(index)=>{
                const product = await db("product").from("product").select("id","title","originalprice","sale","unit","technicaldata","description","stock").where({id : index.productid});
                result.push(product[0]);
            })
        );
        res.json(result);
    }catch(err){
        res.status(500).json({
            error : err
        })
    }
}

exports.queryalltype = async(req,res,next)=>{
    req.typeall = await db("type").from("type").select("id","name","img")
    next();
}