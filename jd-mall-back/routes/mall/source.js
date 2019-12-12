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
 *查询所有商品
 */
router.get('/list', (req, res, next)=>{
    // 1. 页码, 每页显示的条数
    // const page = Math.floor(req.query.page) || 0;
    // const pageSize = Math.floor(req.query.pageSize) || 10;

    console.log(req);
    // 2. 查询数据库
    // let sql = `SELECT * FROM t_goods ORDER BY id DESC LIMIT ?, ?;`;
    let sql = `SELECT * FROM t_goods;`;
    // let values = [(page - 1) * pageSize , pageSize];
    QUERY(sql).then((result)=>{
        res.json({
            status: result.code,
            data: result.data
        });
    }).catch((error)=>{
        console.log(result);
        return next(error.data);
    });
});





/**
 * 根据class去查找商品
 */
router.post('/class', (req, res, next)=>{
    let goods_class = req.body.goods_class;
    console.log('访问接口成功');
    // 1. 查询数据库
    let sql = `SELECT * FROM t_goods where goods_class = ?;`;
    let values = [goods_class];
    QUERY(sql, values).then((result)=>{
        console.log('操作数据库成功');
        res.json({
            state: result.code,
            msg:'获取成功',
            data: result.data
        });
    }).catch((error)=>{
        console.log(result);
        return next(error.data);
    });
});


/**
 * 根据id去查商品
 */
router.post('/GoodId',(req,res,next)=>{
    console.log(req.body)
    let id1 = req.body.GoodsId;
    console.log(id1)

    //1.查询数据库
    let sql = `SELECT * FROM t_goods where id = ?;`;
    let values = [id1];
    console.log(22);
    QUERY(sql,values).then((result)=>{
        console.log(result);
        if(result.data.length!==0){
            res.json({
                state:1,
                msg:'已获取',
                data:result.data
            })
        }else{
            res.json({
                state:0,
                msg:'无信息',
            })
        }

    }).catch((error)=>{
        return next(error.data);
    })
});

module.exports = router;