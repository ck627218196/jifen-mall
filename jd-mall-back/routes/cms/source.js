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
 * 接受编辑器上传的图片
 */
router.post('/upload_img', (req, res, next)=>{
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
        if(files.upload_img){
            let imgName = path.basename(files.upload_img.path);
            let imgSrc = `http://localhost:3000/upload/source/image/${imgName}`;
            res.json({
               status: 1,
               data: imgSrc
            });
        }else {
            res.json({
                status: 0,
                msg: '上传图片失败!'
            });
        }
    });
});

/**
 * 添加一个商品
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

        const {goods_title, goods_class, goods_price, goods_num,  source_content} = fields;
        const create_time = moment().format();
        let source_img = '/upload/source/image/' + path.basename(files.source_img.path);
        // 4.3 容错判断是否为空
        // ...

        // 4.4 操作数据库
        let sql = `INSERT INTO t_goods(goods_title, goods_class, goods_price, goods_num, source_content, source_img) VALUE (?, ?, ?, ?, ?, ?);`;
        let values = [goods_title, goods_class, goods_price, goods_num, source_content, source_img];
        QUERY(sql, values).then((data)=>{
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
 * 获取商品的总数
 */
router.get('/count', (req, res, next)=>{
    // 1. 查询数据库
    let sql = `SELECT COUNT(*) AS count FROM t_goods;`;
    QUERY(sql).then((result)=>{
        res.json({
            status: result.code,
            data: result.data[0]
        });
    }).catch((error)=>{
        return next(error.data);
    });
});

/**
 * 根据页码获取商品数据
 */
router.get('/list_page', (req, res, next)=>{
    // 1. 页码, 每页显示的条数
    const page = Math.floor(req.query.page) || 0;
    const pageSize = Math.floor(req.query.pageSize) || 10;

    // 2. 查询数据库
    let sql = `SELECT * FROM t_goods ORDER BY id DESC LIMIT ?, ?;`;
    let values = [(page - 1) * pageSize , pageSize];
    QUERY(sql, values).then((result)=>{
        res.json({
            status: result.code,
            data: result.data
        });
    }).catch((error)=>{
        return next(error.data);
    });
});

/**
 *获取所有商品
 */
router.get('/list', (req, res, next)=>{
    // 2. 查询数据库
    let sql = `SELECT * FROM t_goods;`;
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
 * 根据class去查找
 */
router.post('/class', (req, res, next)=>{
    let category = req.body.class;
    console.log(category);

    // 2. 查询数据库
    let sql = `SELECT * FROM t_goods where goods_class = ?;`;
    let values = [category];
    QUERY(sql, values).then((result)=>{
        res.json({
            status: result.code,
            data: result.data
        });
    }).catch((error)=>{
        console.log(result);
        return next(error.data);
    });
});

router.post('/GoodId',(req,res,next)=>{
    let id1 = req.body.GoodsId;

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

/**
 * 根据id去查商品
 */
router.get('/:id', (req, res, next)=>{
    let id = req.params.id;
    // 1. 查询数据库
    let sql = `SELECT * FROM t_goods where id = ?;`;
    let values = [id];
    QUERY(sql, values).then((result)=>{
        res.json({
            status: result.code,
            msg: result.msg,
            data: result.data
        });
    }).catch((error)=>{
        return next(error.data);
    })
});


/**
 * 根据id去删除
 */
router.get('/del/:id', (req, res, next)=>{
    let id = req.params.id;
    // 1. 查询数据库
    let sql = `DELETE FROM t_goods WHERE id=?;`;
    let values = [id];
    QUERY(sql, values).then((result)=>{
        res.json({
            status: result.code,
            msg: result.msg
        });
    }).catch((error)=>{
        return next(error.data);
    })
});

/**
 *  根据id去修改商品
 */
router.post('/edit', (req, res, next)=>{
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
        const {goods_title, goods_class, goods_price, source_content, id} = fields;
        const create_time = moment().format();
        const source_img = fields.source_img  || '/upload/source/image/' + path.basename(files.source_img.path);

        // 4.3 容错判断是否为空
        // ...

        // 4.4 更新数据库
        let sql = `UPDATE t_goods SET goods_title = ?, goods_class = ?, goods_price = ?, source_content = ?, source_img = ? WHERE id = ?;`;
        let values = [goods_title, goods_class, goods_price, source_content, source_img, id];
        QUERY(sql, values).then((data)=>{
            // console.log(data);
            res.json({
                status: 1,
                msg: '修改商品成功!'
            });
        }).catch((error)=>{
            console.log(error);
            res.json({
                status: 0,
                msg: '修改商品失败!'
            });
        });
    });
});

module.exports = router;
