module.exports = {
    publicPath: '/',
    devServer: {
        proxy: {
            '/shop': {
                target: 'http://127.0.0.1:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/shop': ''
                }
            }
        }
    }
};
