const express = require('express');
const router = express.Router();

// 引入配置文件
const baseConfig = require('./../../config/baseConfig');
// 引入数据库查询文件
const QUERY = require('./../../config/dbHelper');
// 引入moment
const moment = require('moment');
// 引入token生成器
const jwt = require('jsonwebtoken');
// 引入路径模块
const path = require('path');


/**
 * 管理员登录
 */
router.post('/login', function (req, res, next) {
    // 1. 获取用户名和密码
    const {user_name, user_pwd} = req.body;

    // 2. 查询数据库
    let sql = `SELECT * FROM admin WHERE user_name = ? AND user_pwd = ?;`;
    let values = [user_name, user_pwd];
    QUERY(sql, values).then((result) => {
        // console.log(result);
        // 2.1 没有匹配到用户
        if (result.data.length === 0) {
            res.json({
                status: 0,
                msg: '用户名或密码错误!'
            })
        } else { // 2.2 匹配到了
            // 2.2.1 生成用户关键信息
            // console.log(result.data[0]);
            let id = result.data[0].id;
            let user_name = result.data[0].user_name;
            let user_pwd = result.data[0].user_pwd;
            let userObj = {
                id,
                user_name,
                user_pwd
            };

            // 2.2.2 生成与用户相对应的token
            let token = jwt.sign(userObj, baseConfig.TOKEN_KEY);
            // 2.2.3 把用户登录相关的信息存入session
            req.session.token = token;

            // 2.2.4 返回数据给客户端
            res.json({
                status: 1,
                msg: '登录成功!',
                token: token,
            })
        }
    }).catch((error) => {
        return next(error.data);
    });
});

router.post('/reset_pwd', function (req, res, next) {
    // 1. 获取客户端的数据
    const {token, old_pwd, new_pwd} = req.body;
    // 2. 根据token去取出用户
    const userObj = jwt.verify(token, baseConfig.TOKEN_KEY);
    // 3. 操作数据库
    if(userObj.user_pwd === old_pwd){
        let sql = `UPDATE admin SET user_pwd = ? WHERE id = ? AND user_pwd = ?;`;
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
