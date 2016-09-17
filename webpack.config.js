var webpack = require("webpack");
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
module.exports={
  entry:{
    index:'./src/index.js',
    vendor: ['react','react-dom']
  },
  output: {
    path: path.join(__dirname,"public"),
    filename: "[name].bundle.js",
  },
  module:{
    loaders:[
      {
        test:/\.js|\.jsx/,
        loader:'babel?presets[]=react,presets[]=es2015,presets[]=stage-0',
        exclude:/node_modules/
      },
       // Extract css files
      {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      },
            // Optionally extract less files
            // or any other compile-to-css language
      {
           test: /\.less$/,
           loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
      },

            //load json files
      {
          test: /\.json$/,
          loader:'json-loader'          
      },

      {
          test: /\.(jpg|png|woff|svg|eot|ttf)\??.*$/,
          loader:'url-loader?limit=50000&name=[path][name].[ext]'          
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
    new ExtractTextPlugin("[name].css")
  ]
}