const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require("dotenv-webpack");
const path = require('path')
const { argv } = require('process')

module.exports = (env, argv) => {
    const {mode} = argv
    const isProduction = mode ==='production'

    return {
        //entry: "./src/index.js",
        output: {
            path: path.resolve(__dirname, 'dist/'),
            filename: 'bundle.js',
            publicPath: '/'
        },
        plugins: [
            new HtmlWebpackPlugin({ 
              template: 'public/index.html',
              favicon: './src/assets/images/storydots-logo.jpeg'
            }),
            new Dotenv({systemvars: true,}),
        ],
        module: {
            rules: [
              {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
              },
              {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
              },
              {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
              },
            ]
        },
        devServer: {
            open: true, //abre el navegador
            port: 3000,
            historyApiFallback: true
        },
        //devtool: 'source-map' //crea otro codigo para poder ver los errores 
    }
}