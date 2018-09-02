const path = require("path")
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const isDev = process.env.NODE_ENV === 'development'
const webpack = require('webpack')
const HTMLPlugin = require('html-webpack-plugin')
const config = {
    target: "web",
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]

            },
            {
                test: /\.(jpg|gif|svg|jpeg|png)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 1024,
                        name: '[name].[ext]'
                    }
                }]
            },
            {
                test: /\.styl$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            }


        ]
    },
    plugins: [
        // make sure to include the plugin for the magic
        new VueLoaderPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV: isDev ? '"development"' : '"production"'
        }),
        new HTMLPlugin({
            filename:'index.html',
            template: './src/index.html',
            favicon: './src/assets/images/logo.png',
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ],

}
if (isDev) {
    config.devServer = {
        port: 8000,
        host: '0.0.0.0',
        overlay: {
            errors: true
        },
        hot: true
    }
}
module.exports = config