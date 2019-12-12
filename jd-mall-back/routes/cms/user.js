const express = require('express');
const router = express.Router();

// 引入md5
const md5 = require('blueimp-md5');
// 引入配置文件
const baseConfig = require('./../../config/baseConfig');
// 引入数据库查询文件
const QUERY = require('./../../config/dbHelper');
// 引入moment
const moment = require('moment');
// 引入token生成器
const jwt = require('jsonwebtoken');
// 引入存储文件
const formidable = require('formidable');
// 引入路径模块
const path = require('path');

/**
 * 添加用户
 *
 */
router.post('/reg_main', function (req, res, next) {
    // 1. 获取用户名和手机号
    console.log(req.body);
    let {user_name, user_phone} = req.body;
    const create_time = moment().format();
    let user_pwd = '123';
    let user_start_jidian = 1000;
    let user_now_jidian = 1000;
    let user_spend_jidian = 0;

    let sql = `INSERT INTO t_user(user_name, user_phone, create_time, user_pwd, user_start_jidian, user_now_jidian, user_spend_jidian) VALUES (?, ?, ?, ?, ?, ?, ?);`;
    let values = [user_name, user_phone, create_time, user_pwd,user_start_jidian, user_now_jidian, user_spend_jidian];
    console.log(values);
    QUERY(sql, values).then((data) => {
        res.json({
            status: 1,
            msg: '添加成功!'
        });
    }).catch((error) => {
        console.log(error);
        res.json({
            error: error,
            status: 0,
            msg: '添加失败!'
        });
    });

});
/**
 * 根据id去删除用户
 */
router.get('/del/:id', (req, res, next)=>{
    let id = req.params.id;
    // console.log(id);
    // 1. 查询数据库
    let sql = `DELETE FROM t_user WHERE id=?;`;
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
 * 退出登录
 */
router.get('/logout', function (req, res, next) {
    // 方式1
    // req.session.cookie.maxAge = 0;
    // 方式2
    req.session.destroy();
    if(!req.session){
        res.json({
            status: 1,
            msg: '退出登录成功!'
        });
    }else {
        return next(new Error('退出登录异常!'));
    }
});

/**
 * 修改用户信息
 */
router.post('/edit_user', function (req, res, next) {
    // 1. 获取用户名和手机号
    let {user_name, user_phone, id} = req.body;
    let sql = `UPDATE t_user SET user_name = ?, user_phone = ? WHERE id = ?;`;

    let values = [user_name, user_phone, id];
    console.log(values);
    QUERY(sql, values).then((data) => {
        res.json({
            status: 1,
            msg: '修改成功!'
        });
    }).catch((error) => {
        console.log(error);
        res.json({
            error: error,
            status: 0,
            msg: '修改失败!'
        });
    });
});


/**
 * 获取部分管理员信息
 */
router.get('/user_some_info', function (req, res, next) {
    // 0. 根据token取出用户信息
    const userObj = jwt.verify(req.session.token, baseConfig.TOKEN_KEY);
    // 1. 查询数据库
    let sql = `SELECT real_name, user_icon FROM t_user WHERE id=?;`;
    let values = [userObj.id];
    QUERY(sql, values).then((result)=>{
        // console.log(result);
        res.json({
            status: result.code,
            msg: result.msg,
            data: result.data[0]
        });
    }).catch((error)=>{
        return next(error.data);
    });
});

/**
 * 修改密码
 */
router.post('/reset_pwd', function (req, res, next) {
    // 1. 获取客户端的数据
    const {token, old_pwd, new_pwd} = req.body;
    // 2. 根据token去取出用户
    const userObj = jwt.verify(token, baseConfig.TOKEN_KEY);
    // 3. 操作数据库
    if(userObj.user_pwd === old_pwd){
        let sql = `UPDATE t_user SET user_pwd = ? WHERE id = ? AND user_pwd = ?;`;
        let values = [new_pwd, userObj.id, old_pwd];

        QUERY(sql, values).then((result)=>{
            console.log(result.data);
            if(result.data.affectedRows > 0){
                // 注销session
                req.session.destroy();
                res.json({
                    status: 1,
                    msg: '修改密码成功!'
                });
            }else {
                res.json({
                    status: 0,
                    msg: '修改密码失败!'
                });
            }
        }).catch((error)=>{
            res.json({
                status: 0,
                msg: '修改密码失败!'
            });
        });
    }else {
        res.json({
            status: 0,
            msg: '非法操作!'
        })
    }
});

module.exports = router;
