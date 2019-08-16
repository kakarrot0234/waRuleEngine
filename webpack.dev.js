const path = require('path');
const connect = require('webpack-merge');
const common = require('./webpack.common');

module.exports = connect(common, {
    mode: 'development',
    output:{
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use:[
                    'style-loader',
                    'css-loader'
                ]
            }
        ]
    }
});