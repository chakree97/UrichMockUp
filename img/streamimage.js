const path = require('path')

exports.streamimage = (req,res)=>{
    res.sendFile(path.resolve(path.resolve(__dirname+`/${req.params.image}`)))
}