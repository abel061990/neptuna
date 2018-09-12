module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use:{
          loader: "babel-loader"
        }
      },
	{
        test: /\.(png|jpg|jpeg|woff|woff2|eot|ttf|svg)$/,
        use:{
          loader: "url-loader"
        }
      },
	{

	test: /\.css$/,
  	loaders: ['style-loader','css-loader']
	}
    ]
  }
};
