module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:8002/',
                // pathRewrite: {
                //     "^/api": "/"
                // }
            }
        }
    }
};