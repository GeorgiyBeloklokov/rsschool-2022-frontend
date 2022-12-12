const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require ('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const EslingPlugin = require('eslint-webpack-plugin');
module.exports = {
    mode: "development",
    entry: {
        main: path.resolve(__dirname, './src/index.ts'),
    },
    resolve: {
        extensions: ['.tsx','.ts', '.js']
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, 'dist'),
        open: true,
        compress: true,
        hot: true,
        port: 8080
    },
    devtool: 'eval-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    performance: {
      hints: false
    },
    module:{
        rules: [
            {
            test: /\.(js|jsx|tsx|ts)$/,
            exclude: /node_modules/,
            loader: 'ts-loader',
            },
            
            {
                test: /\.(css)$/,
                use: [
                    'style-loader',
                    {
                    loader: 'css-loader',
                        options:{
                            url: false
                        }
                    },
                    'postcss-loader'
                ],
            },
        ],

    },
    plugins: [
        new HTMLWebpackPlugin({
            title: 'news-js',
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new EslingPlugin({ extensions: 'ts' }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]

}