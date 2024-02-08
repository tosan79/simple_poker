const path = require('path');
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
//mode: 'production',
mode: 'development',
target: ['web','es6'],
entry: {
    'index': './src/index.tsx'
},
output: {
    path: path.resolve(__dirname, 'static'),
    filename: '[name].js'
},
devtool: 'source-map',
module: {
    rules: [{
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
    }, ],
},
externals: {
    // Use external version of React
    //'react': 'React',
    //'react-dom': 'ReactDOM'
},
resolve: {
    // https://getfrontend.tips/shorten-import-paths-in-webpack/
    alias: {
    // Assume that the `src` folder is located at the root folder
    '@': path.join(__dirname, 'src'),
    },
    extensions: ['.tsx', '.ts', '.js'],
},
optimization: {
    minimize: false, // true/false
    minimizer: [
    new TerserPlugin({
        extractComments: false,
        terserOptions: {
        format: {
            comments: false,
        },
        },
    })
    ],
},
};