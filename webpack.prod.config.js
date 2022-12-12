const path = require('path');
const HTMLWebpackPlugin = require ('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const EslingPlugin = require('eslint-webpack-plugin');


module.exports = {
    mode: "production",
    entry: {
        main: path.resolve(__dirname, './src/index.ts'),
    },
    performance: {
      hints: false
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
    resolve: {
        extensions: ['*', '.ts', '.tsx'],
    },
    module:{
        rules: [
            {
                test: /\.(tsx|ts)$/,
                loader: 'ts-loader'
            },
           
            {
                test: /\.(css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options:{
                            publicPath: './',
                        }
                    },
                    {
                        loader: 'css-loader',
                        options:{
                            url: false
                        }
                    },
                    'postcss-loader'],
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
        new MiniCssExtractPlugin({
            filename: 'global.css',
        }),
        
    ]
}