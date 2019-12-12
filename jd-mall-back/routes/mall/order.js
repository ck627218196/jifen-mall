const express = require('express');
const router = express.Router();

// 引入存储文件
const formidable = require('formidable');
// 引入配置文件
const baseConfig = require('./../../config/baseConfig');
// 引入路径模块
const path = require('path');
// 引入数据库帮助文件
const QUERY = require('./../../config/dbHelper');
// 引入日期插件
const moment = require('moment');

/**
 * 根据用户获取订单数据
 */
router.post('/GetOrders',(req,res,next)=>{
    const user_Id = req.body;
    //1.查询数据库
    let sql = `SELECT * from orders WHERE user_id=?;`;
    let values = [user_Id]
    console.log(22);
    QUERY(sql,values).then((result)=>{
        console.log(result);
        if(result.data.length!==0){
            res.json({
                state:1,
                msg:'已加载数据',
                data:result.data
            })
        }else{
            res.json({
                state:0,
                msg:'您暂时还没有订单',
            })
        }
        
    }).catch((error)=>{
        return next(error.data);
    }) 
});



/**
 * 购买商品,生成订单
 */
router.post('/CreateOrders',(req,res,next)=>{
    console.log(req.body);
    const {user_id,goods_id,goods_title,goods_class,goods_price,goods_img,goods_address,goods_name,goods_phone}=req.body;
    
    console.log(user_id,goods_id,goods_title,goods_class,goods_price,goods_img,goods_address,goods_name,goods_phone)
    let sql =  `INSERT INTO orders (user_id,goods_id,goods_title,goods_class,goods_price,goods_img,goods_address,goods_name,goods_phone) VALUES (?,?,?,?,?,?,?,?,?) `
    let values = [user_id,goods_id,goods_title,goods_class,goods_price,goods_img,goods_address,goods_name,goods_phone];
    QUERY(sql,values).then((result)=>{
        if(result.data.length!==0){
            console.log(result);
            res.json({
                state:1,
                msg:'下单成功',
            })
        }else{
            res.json({
                state:0,
                msg:'下单失败',
            })
        }
    }).catch((error)=>{
        return next(error.data)
    })
})

/**
*  退货，删除订单
 */
router.post('/ReduceOrder',(req,res,next)=>{
    let order_Id = req.body.order_id;
    //1.查询数据库
    let sql = `DELETE from orders WHERE id = ?;`;
    let values = [order_Id]
    console.log(22);
    QUERY(sql,values).then((result)=>{
        console.log(result);
        if(result.data.length!==0){
            res.json({
                state:1,
                msg:'退货成功',
                data:result.data
            })
        }else{
            res.json({
                state:0,
                msg:'退货失败',
            })
        }

    }).catch((error)=>{
        return next(error.data);
    })
});









module.exports = router;