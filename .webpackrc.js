const path = require('path');

export default {
 // entry: 'src/index.js',
   entry:{
       app: ['react-dev-utils/webpackHotDevClient?http://localhost:8080/',  path.resolve(__dirname, 'src/index.js')]
   },
  extraBabelPlugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]],
  env: {
    development: {
      extraBabelPlugins: ['dva-hmr'],
    },
  },
  externals: {
    '@antv/data-set': 'DataSet',
     rollbar: 'rollbar',
  },
  alias: {
    components: path.resolve(__dirname, 'src/components/'),
    services: path.resolve(__dirname, 'src/services/'),
    models: path.resolve(__dirname,'src/models')
  },
  ignoreMomentLocale: true,
  theme: './src/theme.js',
  html: {
    template: './src/index.ejs',
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableDynamicImport: true,
   outputPath:path.join(__dirname, 'web'),
   publicPath: '/',

};

