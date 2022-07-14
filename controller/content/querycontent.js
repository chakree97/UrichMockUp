const db = require("../../config/mysql");

exports.queryBanner = async(req,res,next)=>{
    try{
        const productid = await db("banner").from("banner").select("productid");
        const id = await Promise.all(productid.map((index) => index.productid));
        const product = await db("product").from("product").select("id","title").whereIn("id",id);
        await Promise.all(
            product.map(async(index)=>{
            const productImage = await db("productimage").from("productimage").select("imageurl").where({productid : index.id});
            const img = await Promise.all(productImage.map((index)=>index.imageurl));
            index.img = img[0]
        }))
        req.banner = product
        next();
    }catch(err){
        res.status(500).json({
            error : err
        })
    }
}

exports.queryFlashsale = async(req,res,next)=>{
    try{
        const productid = await db("flashsale").from("flashsale").select("productid");
        const id = await Promise.all(productid.map((index) => index.productid));
        const product = await db("product").from("product").select("id","title","originalprice","sale").whereIn("id",id);
        await Promise.all(
            product.map(async(index)=>{
            const productImage = await db("productimage").from("productimage").select("imageurl").where({productid : index.id});
            const img = await Promise.all(productImage.map((index)=>index.imageurl));
            index.img = img[0]
        }))
        const time = await db("flashsaletimer").from("flashsaletimer").select("date","time")
        req.flashsale = {
            timer : `${time[0].date.toISOString().split('T')[0]} ${time[0].time}`,
            product : product
        }
        next();
    }catch(err){
        res.status(500).json({
            error : err
        })
    }
}

exports.queryContent= async(req,res)=>{
    try{
        const obj = {
            banner : req.banner,
            category : req.typeall,
            flashsale : req.flashsale,
            content : []
        }
        const contentname = await db("content").from("content").select("name");
        await Promise.all(
            contentname.map(async(index)=>{
                const productid = await db(index.name).from(index.name).select("productid");
                const id = await Promise.all(productid.map((index) => index.productid));
                const product = await db("product").from("product").select("id","title","originalprice","sale").whereIn("id",id);
                await Promise.all(
                product.map(async(index)=>{
                    const productImage = await db("productimage").from("productimage").select("imageurl").where({productid : index.id});
                    const img = await Promise.all(productImage.map((index)=>index.imageurl));
                    index.originalprice = parseFloat(index.originalprice).toFixed(2)
                    index.sale = parseFloat(index.sale).toFixed(2)
                    index.img = img[0]
                }))
                obj.content.push({
                    name : index.name,
                    product : product
                })
            })
        );
        res.json(obj);
        
    }catch(err){
        res.status(500).json({
            error : err
        })
    }
}

