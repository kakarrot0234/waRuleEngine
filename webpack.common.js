const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        main: './src/index.tsx'
    },
    devtool: 'source-map',
    resolve:{
        extensions: ['.tsx', '.ts', '.js']
    },
    module:{
        rules:[
            {
                test: /\.ts(x?)$/,
                use: ['ts-loader']
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.js$/,
                enforce: 'pre',
                loader: 'source-map-loader'
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}