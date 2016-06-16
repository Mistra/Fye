const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const PATHS = {
    app: path.join(__dirname, 'app'),
    build: path.join(__dirname, 'web')
};

const TARGET = process.env.npm_lifecycle_event;

process.env.BABEL_ENV = TARGET;

const common = {

    entry: {
        app: path.join(PATHS.app, 'app.js')
    },
    resolve: {
        extension: ['', '.js', '.jsx']
    },
    output: {
        path: PATHS.build,
        filename: 'bundle.js'
    },
    cache: true,
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style', 'css'],
                include: PATHS.app
            },
            {
                test: /\.jsx?$/,
                loaders: ['babel?cacheDirectory'],
                include: PATHS.app
            }
        ]
    }
};

if(TARGET === 'start' || !TARGET) {
    module.exports = merge(common, {});
}

if(TARGET === 'build') {
    module.exports = merge(common, {
        plugins: [
            new webpack.DefinePlugin({
                'process.env':{
                    'NODE_ENV': JSON.stringify('production')
                }
            }),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({
                mangle: false,
                sourcemap: false,
                minimize: true
            }),
        ]
    });
}
