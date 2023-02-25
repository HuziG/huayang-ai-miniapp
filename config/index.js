const path = require('path')

const CIPluginOpt = {
  // 微信小程序
  weapp: {
    appid: "wxbc60236e146801b4",
    privateKeyPath: "密钥文件相对项目根目录的相对路径，例如 key/private.appid.key"
  },
}

const config = {
  projectName: 'huayang-ai',
  plugins: [
    ["@tarojs/plugin-mini-ci", CIPluginOpt],
  ],
  date: '2022-12-5',
  designWidth: 375,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [],
  defineConstants: {
  },
  alias: {
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/assets': path.resolve(__dirname, '..', 'src/assets'),
    '@/enum': path.resolve(__dirname, '..', 'src/enum'),
    '@/stores': path.resolve(__dirname, '..', 'src/stores'),
    '@/api': path.resolve(__dirname, '..', 'src/api'),
    '@/hook': path.resolve(__dirname, '..', 'src/hook'),
    '@/interface': path.resolve(__dirname, '..', 'src/interface'),
    '@/moduleComponents': path.resolve(__dirname, '..', 'src/moduleComponents'),
    '@/plugins': path.resolve(__dirname, '..', 'src/plugins'),
    '@/src': path.resolve(__dirname, '..', 'src/'),
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'vue3',
  compiler: 'webpack5',
  cache: {
    enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  sass:{
    
  },
  mini: {
    miniCssExtractPluginOption: {
      ignoreOrder: true,
    },
    optimizeMainPackage: {
      enable: true
    },
    postcss: {
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      optimizeMainPackage: {
        enable: true
      },
      cssModules: {
        enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    esnextModules: [],
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    }
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
