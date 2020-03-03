const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const isProduction = process.env.NODE_ENV === 'production'

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.baseUrl,
  outputDir: process.env.outputDir,
  assetsDir: 'static',
  indexPath: "index.html",
  // 编译警告
  lintOnSave: true,
  configureWebpack: (config) => {
    if (isProduction) {
      // 开启gzip压缩
      const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
      config.plugins.push(
        new CompressionWebpackPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8,
        }),
      )
    } else {
      // 开发环境配置
    }
  },
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('apis', resolve('src/apis'))
      .set('filters', resolve('src/filters'))
      .set('utils', resolve('src/utils'));
    // 移除 prefetch 插件
    config.plugins.delete('prefetch');
    config.module
      .rule("image-webpack-loader")
      .test(/\.(gif|png|jpe?g|svg)$/i)
      .use("file-loader")
      .loader("image-webpack-loader")
      .tap(() => ({
        disable: process.env.NODE_ENV !== "production",
      }))
      .end();
    // 生产环境生成文件大小日志
    if (process.env.NODE_ENV === 'production') {
      config.plugin('analyzer')
        .use(BundleAnalyzerPlugin)
        .end();
    }
  },
  // 反向代理
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    open: false,
    https: false,
    proxy: {
      '/v1': {
        target: 'https://192.168.2.200:6080',
        changeOrigin: true,
        secure: false,
        headers: {
          Referer: 'https://192.168.2.200:6080',
        },
        pathRewrite: {
          '^/v1': '',
        },
      },
    },
  },
};
