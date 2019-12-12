// 1. 引入模块
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const nunjucks = require('nunjucks'); // 引入模板引擎

// 2. 引入路由
//客户端路由
// const webRouter = require('./routes/web');
// const backRouter = require('./routes/back');
// const sowingRouter = require('./routes/sowing');
// const userRouter = require('./routes/user');
// const sourceRouter = require('./routes/source');
// const orderRouter = require('./routes/order');

//cms路由
const cmsBackRouter = require('./routes/cms/back');
const cmsSowingRouter = require('./routes/cms/sowing');
const cmsUserRouter = require('./routes/cms/user');
const cmsSourceRouter = require('./routes/cms/source');
const cmsOrderRouter = require('./routes/cms/order');
const cmsAdminRouter = require('./routes/cms/admin');
const mallOrderRouter = require('./routes/mall/order');
const mallUserRouter = require('./routes/mall/user');
const mallSourceRouter = require('./routes/mall/source');


// 引入权限鉴证的中间件
const authLogin = require('./middleWare/authLogin');

//  引入session
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

// 引入基础配置文件
const baseConfig = require('./config/baseConfig');

// 配置session存储的属性
const options = {
  host: baseConfig.database.HOST,
  port: baseConfig.database.PORT,
  user: baseConfig.database.USER,
  password: baseConfig.database.PASSWORD,
  database: baseConfig.database.DATABASE
};
const sessionStore = new MySQLStore(options);

// 3. 实例化服务器
const app = express();

//3.1配置允许跨域
app.all("*",function(req,res,next){
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin","*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers","content-type");
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() === 'options')
    res.send(200);  //让options尝试请求快速结束
  else
    next();
});

// 4. 设置模板引擎
app.set('views', path.join(__dirname, 'views'));
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  noCache: true
});

// 5. 使用各种中间件
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/web')));

// 中间件使用session
app.use(session({
  //参数配置
  key: 'yqPlan',
  secret: 'itLike',//加密字符串
  resave: false, //强制保存session，即使它没有变化
  saveUninitialized: true,//强制将未初始化的session存储。当新建一个session且未设定属性或值时，它就处于未初始化状态。在设定cookie前，这对于登录验证，减轻服务器存储压力，权限控制是有帮助的，默认为true
  cookie: {maxAge: 24 * 3600 * 1000},
  rolling: true, //在每次请求时进行设置cookie，将重置cookie过期时间
  store: sessionStore
}));

app.use(authLogin);

// 6. 使用路由中间件
//客户端路由
// app.use('/', webRouter);
// app.use('/back', backRouter);
// app.use('/api/auth/sowing', sowingRouter);
// app.use('/api/auth/user', userRouter);
// app.use('/api/auth/source', sourceRouter);
// app.use('/api/order',orderRouter);

//cms路由
app.use('/back', cmsBackRouter);
app.use('/cms/api/auth/sowing', cmsSowingRouter);
app.use('/cms/api/auth/user', cmsUserRouter);
app.use('/cms/api/auth/source', cmsSourceRouter);
app.use('/cms/api/order',cmsOrderRouter);
app.use('/cms/api/admin', cmsAdminRouter);

app.use('/api/order',mallOrderRouter);
app.use('/api/user',mallUserRouter);
app.use('/api/source',mallSourceRouter);

// app.use('/cms/api/admin',cmsAdminRouter);


// 7. 全局处理404
app.use(function(req, res, next) {
  next(createError(404));
});

// 8. 全局的错误处理
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // 渲染错误页面
  res.status(err.status || 500);
  res.render('error.html');
});

module.exports = app;
