
const path = require('path');
const webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

process.env.NODE_ENV = process.env.NODE_ENV || "development";

if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: '.env.test' })
} else if (process.env.NODE_ENV === 'development') {
    require('dotenv').config({ path: '.env.development' })
}

console.log("process.env.NODE_ENV", process.env.NODE_ENV);

module.exports = {
    
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, 'public'),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                loader: 'babel-loader',
                test: /\.([jt]s|tsx)$/,
            }, {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { sourceMap: true } },
                    { loader: 'sass-loader', options: { sourceMap: true } }
                ],
            }]
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "style.css"
        }),
        new webpack.DefinePlugin({
            'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        })
    ],
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.json']
    },

    devtool: 'inline-source-map',
    devServer:{
        contentBase: path.join(__dirname, 'public'),
        historyApiFallback: true
    },
    externals: [nodeExternals()]
}