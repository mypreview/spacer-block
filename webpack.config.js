/**
 * All of the the JavaScript compile functionality 
 * for Spacer Block plugin reside in this file.
 *
 * @requires    Webpack
 * @package     spacer-block
 * @author      MyPreview (Github: @mahdiyazdani, @mypreview)
 */
const path = require( 'path' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );
const CleanWebpackPlugin = require( 'clean-webpack-plugin' );
const ProgressBarPlugin = require( 'progress-bar-webpack-plugin' );
const UglifyJsPlugin = require( 'uglifyjs-webpack-plugin' );
const DependencyExtractionWebpackPlugin = require( '@wordpress/dependency-extraction-webpack-plugin' );
const WebpackRTLPlugin = require( 'webpack-rtl-plugin' );
const chalk = require( 'chalk' );
const NODE_ENV = process.env.NODE_ENV || 'development';

const baseConfig = {
    mode: NODE_ENV,
    performance: {
        hints: false
    },
    stats: {
        all: false,
        assets: true,
        builtAt: true,
        colors: true,
        errors: true,
        hash: true,
        timings: true
    },
    watchOptions: {
        ignored: /node_modules/
    },
    devtool: NODE_ENV === 'development'  ?  'source-map'  :  false,
    module: {
        rules: [
            {
                test: /\.(js|jsx|mjs)$/,
                exclude: /node_modules/,
                loader: 'babel-loader?cacheDirectory'
            },
            {
                test:/\.css$/,
                use: [
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    { 
                        loader: 'css-loader', 
                        options: { 
                            importLoaders: 1 
                        } 
                    }
                ]
            }
        ],
    },
    externals: {
        jquery: 'jQuery'
    },
    optimization: {},
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin( {
            filename: 'style.css'
        } ),
        new WebpackRTLPlugin( {
            filename: 'style-rtl.css'
        } ),
        new ProgressBarPlugin( {
            format: chalk.blue( 'Build core script' ) + ' [:bar] ' + chalk.green( ':percent' ) + ' :msg (:elapsed seconds)',
        } ),
        new DependencyExtractionWebpackPlugin( { 
            injectPolyfill: true 
        } )
    ]
};

const editorConfig = {
    ...baseConfig,
    entry: {
        'script': './assets/src/admin/script.js'
    },
    output: {
        path: path.resolve( __dirname, './assets/dist/admin/' )
    },
    optimization: {
        minimizer: [ 
            new UglifyJsPlugin( {
                cache: true,
                parallel: true,
                uglifyOptions: {
                    output: {
                        ie8: false,
                        comments: false
                    }
                }
            } )
        ]
    }
};

const frontendConfig = {
    ...baseConfig,
    entry: {
        'script': './assets/src/public/script.js'
    },
    output: {
        path: path.resolve( __dirname, './assets/dist/public/' )
    }
};

const outputArgs = {
    filename: '[name].js',
    libraryTarget: 'this',
    // This fixes an issue with multiple webpack projects using chunking
    // See https://webpack.js.org/configuration/output/#outputjsonpfunction
    jsonpFunction: 'webpackSpacerBlockJsonp'
};
Object.assign( editorConfig.output, outputArgs );
Object.assign( frontendConfig.output, outputArgs );

// Export the following modules
module.exports = [
    editorConfig,
    frontendConfig
];