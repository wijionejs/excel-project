const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProd = process.env.NODE_ENV === 'production';

const filename = ext => isProd ? `bundle.[hash].${ext}` : `bundle.${ext}`;
const jsLoaders = () => {
    const loaders = [
        {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env'],
            },
        },
    ];

    if (!isProd) {
        loaders.push('eslint-loader');
    }

    return loaders;
};

console.log(isProd)
module.exports = {
    context: path.join(__dirname, 'src'),
    mode: 'development',
    entry: ['@babel/polyfill', './index.js'],
    output: {
        filename: filename('js'),
        path: path.join(__dirname, 'dist'),
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': path.join(__dirname, 'src'),
            '@core': path.join(__dirname, 'src', 'core'),
        },
    },
    devtool: isProd ? false : 'source-map',
    devServer: {
        port: 3000,
        hot: !isProd,
        contentBase: path.join(__dirname, 'dist'),
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                removeComments: isProd,
                collapseWhitespace: isProd
            },
        }),
        new CopyPlugin({
            patterns: [
                {from: path.join(__dirname, 'src', 'favicon.ico'), to: path.join(__dirname, 'dist')},
            ],
        }),
        new MiniCssExtractPlugin({
            filename: filename('css'),
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            reloadAll: true,
                            hmr: !isProd,
                        },
                    },
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: jsLoaders(),
            },
        ],
    },
};