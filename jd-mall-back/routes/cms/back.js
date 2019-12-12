const express = require('express');
const router = express.Router();

// 引入数据库帮助文件
const QUERY = require('./../../config/dbHelper');

// 引入token生成器
const jwt = require('jsonwebtoken');

// 引入配置文件
const baseConfig = require('./../../config/baseConfig');

/* -----------------获取后端页面--------------------------- */

/*获取后端首页*/
router.get('/', function (req, res, next) {
    res.render('back/index.html');
});
router.get('/setting', function (req, res, next) {
    res.render('back/setting.html');
});
/*----------首页面相关-begin-------------*/
/*修改密码*/
router.get('/reset_pwd', function (req, res, next) {
    res.render('back/reset_pwd.html');
});

/*管理员列表页面*/
router.get('/docent_list', function (req, res, next) {
    res.render('back/docent_list.html');
});

/*添加管理员页面*/
router.get('/docent_add', function (req, res, next) {
    res.render('back/docent_add.html');
});

/*系统说明页面*/
router.get('/notice', function (req, res, next) {
    res.render('back/notice.html');
});

/*用户中心*/
router.get('/user', function (req, res, next) {
    res.render('back/user.html');
});

router.get('/user_add', function (req, res, next) {
    res.render('back/user_add.html');
});

/*----------首页面相关-end-------------*/


/*----------轮播图相关-begin-------------*/
router.get('/sowing_list', function (req, res, next) {
    res.render('back/sowing_list.html');
});

router.get('/sowing_add', function (req, res, next) {
    res.render('back/sowing_add.html');
});

router.get('/sowing_edit', function (req, res, next) {
    // 1. 根据id去查询数据库
    let sql = `SELECT * FROM t_sowing WHERE id = ?;`;
    let values = [req.query.id];
    QUERY(sql, values).then((result) => {
        // 2. 获取到了该记录
        let sowingData = result.data[0];
        // console.log(sowingData);
        res.render('back/sowing_edit.html', {sowingData});
    }).catch((error) => {
        return next(error.data);
    });
});

router.get('/user_edit', function (req, res, next) {
    // 1. 根据id去查询数据库
    let sql = `SELECT * FROM t_user WHERE id = ?;`;
    let values = [req.query.id];
    QUERY(sql, values).then((result) => {
        // 2. 获取到了该记录
        let UserData = result.data[0];
        // console.log(sowingData);
        res.render('back/user_edit.html', {UserData});
    }).catch((error) => {
        return next(error.data);
    });
});
/*----------轮播图相关-end-------------*/

/*----------管理员相关-begin-------------*/
router.get('/order_list', function (req, res, next) {
    res.render('back/order_list.html');
});

router.get('/login', function (req, res, next) {
    res.render('back/login.html');
});

/*查看/修改管理员信息*/
router.get('/setting', function (req, res, next) {
    // console.log(req.session.token);
    // 1. 根据token取出用户信息
    const userObj = jwt.verify(req.session.token, baseConfig.TOKEN_KEY);
    // console.log(userObj);

    // 2. 去数据库中查询用户信息
    let sql = `SELECT real_name, user_name, user_position, user_sex, user_birth, user_phone, user_email, user_icon, user_intro FROM t_user WHERE id=?;`;
    let values = [userObj.id];
    QUERY(sql, values).then((result) => {
        // 2. 获取到了该记录
        let userData = result.data[0];
        // console.log(userData);
        res.render('back/setting.html', {userData});
    }).catch((error) => {
        return next(error.data);
    });
});
/*----------管理员相关-end-------------*/

/*----------资源相关-begin-------------*/
router.get('/source_list', function (req, res, next) {
    res.render('back/source_list.html');
});

router.get('/source_add', function (req, res, next) {
    res.render('back/source_add.html');
});

router.get('/source_edit', function (req, res, next) {
    // 1. 根据id去查询数据库
    let sql = `SELECT * FROM t_goods WHERE id = ?;`;
    let values = [req.query.id];
    QUERY(sql, values).then((result) => {
        // 2. 获取到了该记录
        let sourceData = result.data[0];
        // console.log(sowingData);
        res.render('back/source_edit.html', {sourceData});
    }).catch((error) => {
        return next(error.data);
    });
});
/*----------资源图相关-end-------------*/


/* 获取前端页面 */
module.exports = router;
