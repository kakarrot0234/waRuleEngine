const path = require('path');
const merge = require('webpack-merge');
const common = require('./wabpack.common');


module.exports = merge(common, {
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'disc'),
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
            },
            {
                test: /\.scss$/,
                use:[
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }
});