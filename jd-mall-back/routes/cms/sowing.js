const express = require('express');
const router = express.Router();

// 引入数据库帮助文件
const QUERY = require('./../../config/dbHelper');
// 引入日期插件
const moment = require('moment');
// 引入存储文件
const formidable = require('formidable');
// 引入配置文件
const baseConfig = require('./../../config/baseConfig');
// 引入路径模块
const path = require('path');

/**
 * 添加轮播图
 */
router.post('/add', (req, res, next)=>{
    // 1. 实例化
    let form = new formidable.IncomingForm();
    // 2. 处理文件存放的目录
    form.uploadDir = baseConfig.sourceImgUploadDir;
    // 3. 保留文件的后缀名
    form.keepExtensions = true;
    // 4. 处理结果
    form.parse(req, function(err, fields, files) {
        // 4.1 处理错误
        if(err){
            return next(err);
        }
        // 4.2 数据库操作
        const {sowing_link, sowing_show} = fields;
        const create_time = moment().format();
        const sowing_img = "/upload/source/image/" + path.basename(files.sowing_image.path);

        // 4.3 容错判断是否为空
        // ...

        // 4.4 操作数据库
        let sql = `INSERT INTO t_sowing(sowing_img, sowing_show, sowing_link, create_time) VALUE (?, ?, ?, ?);`;
        let values = [sowing_img, sowing_show, sowing_link, create_time];
        QUERY(sql, values).then((data)=>{
            // console.log(data);
            res.json({
                status: 1,
                msg: '插入数据成功!'
            });
        }).catch((error)=>{
            console.log(error);
            res.json({
                status: 0,
                msg: '插入数据失败!'
            });
        });
    });
});

/**
 * 获取轮播图
 */
router.get('/list', (req, res, next)=>{
    // 1. 查询数据库
    let sql = `SELECT id,sowing_img, sowing_show, sowing_link FROM t_sowing;`;
    QUERY(sql).then((result)=>{
        // console.log(result);
        res.json({
            status: result.code,
            msg: result.msg,
            data: result.data
        });
    }).catch((error)=>{
        return next(error.data);
    });
});

/**
 * 获取所有订单
 */
router.get('/list_order', (req, res, next)=>{
    // 1. 查询数据库
    let sql = `SELECT id,goods_title, goods_address, goods_name, goods_phone FROM orders;`;
    QUERY(sql).then((result)=>{
        // console.log(result);
        res.json({
            status: result.code,
            msg: result.msg,
            data: result.data
        });
    }).catch((error)=>{
        return next(error.data);
    });
});

/**
 * 获取所有用户
 */
router.get('/list_user', (req, res, next)=>{
    // 1. 查询数据库
    let sql = `SELECT id,user_name, user_phone, user_now_jidian FROM t_user;`;
    QUERY(sql).then((result)=>{
        // console.log(result);
        res.json({
            status: result.code,
            msg: result.msg,
            data: result.data
        });
    }).catch((error)=>{
        return next(error.data);
    });
});

/**
 * 根据id去删除一条轮播图
 */
router.get('/del/:id', (req, res, next)=>{
    let id = req.params.id;
    // console.log(id);
    // 1. 查询数据库
    let sql = `DELETE FROM t_sowing WHERE id=?;`;
    let values = [id];
    QUERY(sql, values).then((result)=>{
        // console.log(result);
        res.json({
            status: result.code,
            msg: result.msg
        });
    }).catch((error)=>{
        return next(error.data);
    })
});

/**
 * 编辑
 */
router.post('/edit', (req, res, next)=>{
    // 1. 实例化
    let form = new formidable.IncomingForm();
    // 2. 处理文件存放的目录
    form.uploadDir = baseConfig.imgUploadDir;
    // 3. 保留文件的后缀名
    form.keepExtensions = true;
    // 4. 处理结果
    form.parse(req, function(err, fields, files) {
        // 4.1 处理错误
        if(err){
            return next(err);
        }
        // 4.2 数据库操作
        const {sowing_title, sowing_show, sowing_link, id} = fields;
        const create_time = moment().format();
        console.log(fields);
        const sowing_img = fields. sowing_image || path.basename(files.sowing_image.path);

        // 4.3 容错判断是否为空
        // ...

        // 4.4 更新数据库
        let sql = `UPDATE t_sowing SET sowing_title = ?, sowing_img = ?, sowing_show = ?, sowing_link = ?, create_time = ? WHERE id = ?;`;
        let values = [sowing_title, sowing_img, sowing_show, sowing_link, create_time, id];
        QUERY(sql, values).then((data)=>{
            // console.log(data);
            res.json({
                status: 1,
                msg: '修改数据成功!'
            });
        }).catch((error)=>{
            console.log(error);
            res.json({
                status: 0,
                msg: '修改数据失败!'
            });
        });
    });
});

module.exports = router;
