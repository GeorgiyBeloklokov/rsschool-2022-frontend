const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require ('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
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
    devtool: 'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    },
    performance: {
      hints: false
    },
    module:{
        rules: [
            {
            test: /\.(js|jsx|tsx|ts)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
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
            title: 'Game-Puzzle',
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ]

}