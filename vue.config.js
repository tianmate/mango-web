'use strict'
const path = require('path')

function resolve(dir) {
    return path.join(__dirname, dir)
}

// vue.config.js
module.exports = {
    configureWebpack: {
      //  name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },
        plugins: [

        ]
    },
    devServer: {
        disableHostCheck: true,
    }

}