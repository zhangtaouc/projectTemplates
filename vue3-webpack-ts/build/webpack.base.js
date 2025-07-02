// build/webpack.base.js
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
module.exports = {
  entry: path.join(__dirname, '../src/index.ts'), // 入口文件
  output: {
    filename: 'static/js/[name].js', // 每个输出js的名称
    path: path.join(__dirname, '../dist'), // 打包结果输出路径
    clean: true, // webpack4需要配置clean-webpack-plugin来删除dist文件,webpack5内置了
    publicPath: '/' // 打包后文件的公共前缀路径
  },
  module: {
    rules: [
      {
        include: [path.resolve(__dirname, '../src')], // 只对项目src文件的vue进行loader解析
      	test: /\.vue$/, // 匹配.vue文件
      	use: ['thread-loader', 'vue-loader'], // 用vue-loader去解析vue文件
      },
      {
        include: [path.resolve(__dirname, '../src')], // 只对项目src文件的vue进行loader解析
        test: /\.ts$/,
        use: ['thread-loader', 'babel-loader']
      },
      {
        test: /\.css$/, //匹配所有的 css 文件
        include: [path.resolve(__dirname, '../src')],
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/, //匹配所有的 less 文件
        include: [path.resolve(__dirname, '../src')],
        use: [
          'style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test:/.(png|jpg|jpeg|gif|svg)$/, // 匹配图片文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          }
        },
        generator:{ 
          filename:'static/images/[name][ext]', // 文件输出目录和命名
        },
      },
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'), // 模板取定义root节点的模板
      inject: true, // 自动注入静态资源
    })
  ],
  resolve: {
    extensions:['.vue', '.ts', '.js', '.json']
  },
  cache: {
     type: 'filesystem', // 使用文件缓存
  }
}

console.log('NODE_ENV', process.env.NODE_ENV)
console.log('BASE_ENV', process.env.BASE_ENV)
