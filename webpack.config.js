'use strict';

let webpack = require('webpack');
let path = require('path');
let ejs = require('ejs');
let GenerateAssetPlugin = require('generate-asset-webpack-plugin');
let CleanPlugin = require('clean-webpack-plugin');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let GhPagesWebpackPlugin = require('gh-pages-webpack-plugin');

let isProduction = process.env.NODE_ENV === 'production';

let plugins = [
    new GenerateAssetPlugin({                 // 生成 index.html 文件
        filename: 'index.html',               //  路径相对于 output.path
        fn: (compilation, cb) => {
            let data = {
                bundle: compilation.chunks[0].files[0]        // 文件名称，格式为 output.filename
            };
            ejs.renderFile('./src/html/index.ejs', data, cb);
        },
        extraFiles: []
    })
  ];

if(isProduction) {
    plugins = plugins.concat([
        new CleanPlugin(['public'], {             // 删除 plugin 文件夹
            root: path.join(__dirname, './'),
            verbose: true,
            dry: false
        }),
        new CopyWebpackPlugin([{
            from: path.join(__dirname, 'src/images/favicon.ico')
        }, {
            from: path.join(__dirname, 'CNAME')
        }]),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            test: /\.jsx?$/,
            output: {
                comments: false  // remove all comments
            },
            compress: {
                warnings: false  // remove all warnings
            }
        }),
        new GhPagesWebpackPlugin({
            path: './public',
            options: {
                message: 'Update Home Page',
                user: {
                    name: '年糕小豆汤',
                    email: 'ooiss@qq.com'
                },
                logger: function(message) {
                    console.log(message);
                }
            }
        })
    ]);
}

module.exports = {
    devtool: isProduction ? false : 'source-map',
    entry: './src/scripts/index.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle@[hash].js',
        publicPath: '/'                  // 图片等静态资源的打包连接
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loaders: ['react-hot', 'babel?presets[]=es2015&presets[]=react'],
            exclude: /node_modules/,
            include: path.join(__dirname, 'src', 'scripts')
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader?modules'
        }, {
            test: /\.(png|jpg|jpeg|ico)$/,
            loader: 'url-loader?limit=8192'
        }, {
            test: /\.svg$/,
            loaders: ['babel?presets[]=es2015&presets[]=react', 'svg-react']
        }]
    },
    plugins: plugins,
    resolve: {
        extensions: ['', '.js', 'jsx']
    }
};

