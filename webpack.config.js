const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/scripts/index.js',
    },
    devtool: 'inline-source-map',
    devServer:{
        static: './dist',
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.css$/i ,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
                type: 'asset/resource',
            }
        ],
    },
}
