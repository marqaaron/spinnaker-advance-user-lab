module.exports = {
    publicPath: '/' + process.env.VUE_APP_PATH,
    configureWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            build : {
                assetsPublicPath: '/' + process.env.VUE_APP_PATH + '/'
            }
        }
    }
}