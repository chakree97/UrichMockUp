const express = require('express')
const bodyParser = require('body-parser')
const route = require('./route/route')
const dbcreate = require('./db/createtable')
const app = express();
const port = 8080;

app.use(bodyParser.raw())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use('/',route)

dbcreate.createTable('product',(obj)=>{
    obj.increments('id'),
    obj.string('title'),
    obj.decimal('originalprice'),
    obj.decimal('sale'),
    obj.string('unit'),
    obj.longtext('technicaldata'),
    obj.longtext('description'),
    obj.integer('stock')
})

dbcreate.createTable('productimage',(obj)=>{
    obj.increments('id'),
    obj.integer('productid')
    obj.string('title'),
    obj.string('imageurl')
})

dbcreate.createTable('productreview',(obj)=>{
    obj.increments('id'),
    obj.integer('productid')
    obj.string('img'),
    obj.string('rating'),
    obj.string('description'),
    obj.string('imgreview1'),
    obj.string('imgreview2'),
    obj.string('imgreview3')
})

dbcreate.createTable('type',(obj)=>{
    obj.increments('id'),
    obj.string('name'),
    obj.string('img')
})

dbcreate.createTable('content',(obj)=>{
    obj.increments('id'),
    obj.string('name')
})

dbcreate.createTable('banner',(obj)=>{
    obj.increments('id'),
    obj.integer('productid')
})

dbcreate.createTable('flashsale',(obj)=>{
    obj.increments('id'),
    obj.integer('productid')
})

dbcreate.createTable('flashsaletimer',(obj)=>{
    obj.increments('id'),
    obj.date('date'),
    obj.time('time')
})

app.listen(port,()=>{
    console.log(`Server run at port ${port}`)
})