// 1. 引入模块
const mysql = require('mysql');
const baseConfig = require('./baseConfig');

// 2. 创建连接池
let pool  = mysql.createPool({
    host: baseConfig.database.HOST,
    user: baseConfig.database.USER,
    password: baseConfig.database.PASSWORD,
    database: baseConfig.database.DATABASE
});


/**
 * 全局操作数据库方法
 * @param sql
 * @param values
 */
let query = (sql, values)=>{
    return new Promise((resolve, reject)=>{
        pool.getConnection(function(err, connection) {
            if (err){
               reject({
                   code: 0,
                   msg: '连接数据库失败',
                   data: err
               })
            }

            // 数据库已经连接
            connection.query(sql, values, function (error, results, fields) {
                // 关闭连接池
                connection.release();
                if (error){
                    reject({
                        code: 0,
                        msg: '查询语句错误',
                        data: error
                    })
                }

                // 返回数据库的执行结果
                resolve({
                    code: 1,
                    msg: '操作成功',
                    data: results
                })
            });
        });
    });
};

module.exports = query;