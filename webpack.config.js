var HtmlWebpackPlugin = require('html-webpack-plugin')

var config = {
	entry: __dirname + '/app/main.js',
	output: {
		path: __dirname + '/public',
		filename: 'bundle.js'
	},
	module: {
		rules: [  
			{
				test: /\.css$/,
  			use: [
    			'style-loader',
    			{
     				loader: 'css-loader',
     				options: {
        			importLoaders: 1 // 0 => no loaders (default); 1 => postcss-loader; 2 => postcss-loader, sass-loader
      			}
    			}
  			]
			},
			{
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      }			,
			{
				test: /\.js$/,
				loader: 'babel-loader'
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin( {
			template: __dirname + '/app/index.template.html'
		})
	],
	devServer: {
		contentBase: __dirname + '/public',
		historyApiFallback: true
	}
}

module.exports = config