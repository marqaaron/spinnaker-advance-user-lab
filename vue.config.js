module.exports = {
    publicPath: (typeof process.env.VUE_APP_APP_PATH !== 'undefined') ? '/' + process.env.VUE_APP_APP_PATH : ''
}