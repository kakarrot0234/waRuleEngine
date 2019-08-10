const path = require('path');
const merge = require('webpack-merge');
const common = require('./wabpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = merge(common, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, 'disc'),
        filename: '[name].[contentHash].bundle.js'
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename: '[name].[contentHash].css'
        }),
        new CleanWebpackPlugin()
    ],
    module:{
        rules:[            
            {
                test: /\.(css|scss)$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    }
});