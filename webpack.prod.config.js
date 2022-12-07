const path = require('path');
const HTMLWebpackPlugin = require ('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


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
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.ts',
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.tsx', '.ts'],
    },
    module:{
        rules: [
            {
                test: /\.(js|jsx|tsx|ts)$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
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
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'global.css',
        }),
        
    ]
}