module.exports = (req, res, next)=>{
   /*
    console.log(`------------------------------`);
    console.log(req.path);
    console.log(`-------------------------------------`);
    */

    // 1. 所有非后端页面和后端接口, 统一放行
    if(req.path.indexOf('/back/') === -1 && req.path.indexOf('/cms/api/auth/') === -1){
        return next();
    }

    // 登录的接口放开
    if(req.path.indexOf('/cms/api/admin/login') !== -1){
        return  next();
    }

    // 生成管理员的接口放开
    if(req.path.indexOf('/cms/api/auth/user/reg_main') !== -1){
        return  next();
    }

    // 2. 后端相关的
    // 2.1 判断是否是登录状态
    // 如果session中的token存在, 那一定是该客户端在24小时之内有成功登录过
    // console.log(req.session.token);
    if(req.session.token){
       return next();
    }
    // 2.2 没有登录 或 登录失效
    // if(req.path.indexOf('/api/auth/') !== -1){ // 接口相关
    //     return  next(new Error('非法访问, 没有权限!'))
    // }
    res.render('back/login.html');
};
