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
 * 登录
 */
router.post('/login', function (req, res, next) {
    // 1. 获取用户名和密码
    const {user_name, user_pwd} = req.body;
    // console.log(user_name, user_pwd);
    console.log(req.body);
    // 2. 查询数据库
    let sql = `SELECT * FROM t_user WHERE user_name = ? AND user_pwd = ?;`;
    let values = [user_name, user_pwd];
    QUERY(sql, values).then((result) => {
         console.log(result);
        if (result.data.length !== 0) {
            // 2.2 匹配到了
            // 2.2.1 生成用户关键信息
            // console.log(result.data[0]);
            let id = result.data[0].id;
            let user_name = result.data[0].user_name;
            let user_pwd = result.data[0].user_pwd;
            let real_name = result.data[0].real_name;
            let user_start_jidian = result.data[0].user_start_jidian;
            let user_now_jidian = result.data[0].user_now_jidian;
            let user_spend_jidian = result.data[0].user_spend_jidian;
            let user_address = result.data[0].user_address;
            let user_phone = result.data[0].user_phone;

            let userObj = {
                id,
                user_name,
                user_pwd
            };
            // console.log(userObj);

            // 2.2.2 生成与用户相对应的token
            let token = jwt.sign(userObj, baseConfig.TOKEN_KEY);
            // console.log(token);
            // console.log(jwt.verify(token, baseConfig.TOKEN_KEY));

            // 2.2.3 把用户登录相关的信息存入session
            // console.log(req.session);
            req.session.token = token;

            // 2.2.4 返回数据给客户端
            res.json({
                state: 1,
                msg: '登录成功!',
                token: token,
                id: id,
                user_name: user_name,
                // user_pwd: user_pwd,
                real_name: real_name,
                user_start_jidian:user_start_jidian,
                user_now_jidian:user_now_jidian,
                user_spend_jidian:user_spend_jidian,
                user_address:user_address,
                user_phone:user_phone,
            })
        } else {
            res.json({
                state: 0,
                msg: '用户名或密码错误!'
            })
        }
    }).catch((error) => {
        return next(error.data);
    });
});






/**
 *************修改密码
 */
router.post('/SetPass',(req,res,next)=>{
    let pass = req.body.pass;
    let checkPass = req.body.checkPass;
    let oldPass = req.body.oldPass;
    let user_id = req.body.user_id;
    console.log(user_id,oldPass,pass,checkPass)
    //1.查询数据库
    let sql = `SELECT * FROM t_user WHERE user_pwd = ? AND id = ?;`;
    let values = [oldPass,user_id];
    console.log(22);
    QUERY(sql,values).then((result)=>{
        console.log(result);
        if(result.data.length!==0){
            // 匹配成功
            let sql2 = `UPDATE t_user SET user_pwd = ? WHERE id = ?;`;
            let values2 = [pass,user_id];
            QUERY(sql2,values2).then((result)=>{
                console.log(result);
                if(result.data.length!==0){
                    // 修改成功
                    res.json({
                        state: 1,
                        msg: '修改成功！！'
                    })
                }else{
                    // 修改失败
                    res.json({
                        state: 0,
                        msg: '修改失败！！'
                    })
                }
            }).catch((error)=>{
                return next(error.data);
            })


        }else{
            // 匹配失败
            res.json({
                state:0,
                msg:'修改失败！！',
            })
        }
    }).catch((error)=>{
        return next(error.data);
    })
});







/**
 *************根据用户id获取用户信息
 */
router.post('/getUserInfo', function (req, res, next) {
    // 1. 获取用户名和密码
    let user_id = req.body.user_id;
    // console.log(user_name, user_pwd);
    console.log(user_id);
    // 2. 查询数据库
    let sql = `SELECT * FROM t_user WHERE id = ?;`;
    let values = [user_id];
    QUERY(sql, values).then((result) => {
        // console.log(result);
        // 2.1 没有匹配到用户
        if (result.data.length === 0) {
            res.json({
                state: 0,
                msg: '用户名或密码错误!'
            })
        } else { // 2.2 匹配到了
            // 2.2.1 生成用户关键信息
            // console.log(result.data[0]);
            let id = result.data[0].id;
            let user_name = result.data[0].user_name;
            let user_pwd = result.data[0].user_pwd;
            let real_name = result.data[0].real_name;
            let user_start_jidian = result.data[0].user_start_jidian;
            let user_now_jidian = result.data[0].user_now_jidian;
            let user_spend_jidian = result.data[0].user_spend_jidian;
            let user_address = result.data[0].user_address;
            let user_phone = result.data[0].user_phone;

            // let userObj = {
            //     id,
            //     user_name,
            //     user_pwd
            // };
            // console.log(userObj);

            // 2.2.2 生成与用户相对应的token
            // let token = jwt.sign(userObj, baseConfig.TOKEN_KEY);
            // console.log(token);
            // console.log(jwt.verify(token, baseConfig.TOKEN_KEY));

            // 2.2.3 把用户登录相关的信息存入session
            // console.log(req.session);
            // req.session.token = token;

            // 2.2.4 返回数据给客户端
            res.json({
                state: 1,
                msg: '登录成功!',
                id: id,
                user_name: user_name,
                // user_pwd: user_pwd,
                real_name: real_name,
                user_start_jidian:user_start_jidian,
                user_now_jidian:user_now_jidian,
                user_spend_jidian:user_spend_jidian,
                user_address:user_address,
                user_phone:user_phone,

            })
        }
    }).catch((error) => {
        return next(error.data);
    });
});






/**
 ************ 根据用户获取地址
 */
router.post('/GetAddress',(req,res,next)=>{
    let user_Id1 = req.body.user_id;
    //1.查询数据库
    let sql = `SELECT * from t_address WHERE user_id=?;`;
    let values = [user_Id1]
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
                msg:'无地址信息',
            })
        }

    }).catch((error)=>{
        return next(error.data);
    })
});





/**
 ************ 用户增改地址
 */
router.post('/postAddress', (req,res,next)=>{
    let address_list = req.body.address_list;
    let sql = `REPLACE INTO t_address (id,user_id, address_name,address_phone,address_address) VALUES (?,?,?,?,?);`;
    let flag = 0;
    address_list.forEach(function (value,index) {
        // 遍历要插入的数组
        console.log(22);
        // 执行插入每次遍历的数据
        QUERY(sql,[value.id,value.user_id,value.address_name,value.address_phone,value.address_address]).then((result)=>{
            console.log(result);
            if(result.code===1){
                flag = flag+1;
                if (flag=== address_list.length){
                    res.json({
                        state:1,
                        msg:'添加地址成功',
                    });
                }
            }else {
                res.json({
                    state:0,
                    msg:'添加地址失败',
                });
                return false
            }
        }).catch((error)=>{
            return next(error.data);
        })
    });
    // setTimeout(()=>{
    //     console.log(flag)
    //     console.log(address_list.length)
    //     if(flag === address_list.length){
    //         console.log('添加地址成功');
    //         res.json({
    //             state:1,
    //             msg:'添加地址成功',
    //         });
    //     }
    // },1500)
    // console.log(flag)
    // console.log(address_list.length)
    // if(flag === address_list.length){
    //     console.log('添加地址成功');
    //     res.json({
    //         state:1,
    //         msg:'添加地址成功',
    //     });
    // }


});




/**
 ************ 用户删除地址
 */
router.post('/deleteAddress',(req,res,next)=>{
    let id = req.body.address_id;
    //1.查询数据库
    let sql = `DELETE FROM t_address WHERE id = ?;`;
    let values = [id];
    console.log(22);
    QUERY(sql,values).then((result)=>{
        console.log(result);
        if(result.data.length!==0){
            res.json({
                state:1,
                msg:'已删除地址',
                data:result.data
            })
        }else{
            res.json({
                state:0,
                msg:'删除失败',
            })
        }

    }).catch((error)=>{
        return next(error.data);
    })
});






/**
 ************重新计算余额
 */
router.post('/ComputedJidian',(req,res,next)=>{
    let now_jidian = req.body.now_jidian;
    let spend_jidian = req.body.spend_jidian;
    let user_id = req.body.user_id;

    //1.查询数据库
    let sql = `UPDATE t_user SET user_now_jidian =?,user_spend_jidian = ? WHERE id = ?;`;
    let values = [now_jidian,spend_jidian,user_id]
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
                msg:'无地址信息',
            })
        }

    }).catch((error)=>{
        return next(error.data);
    })
});





module.exports = router;