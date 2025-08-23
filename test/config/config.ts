// @ts-nocheck
import path from 'path';
import slash from 'slash2';
import { defineConfig } from 'umi';
import proxy from './proxy';
import routes from './router.config';
import themePluginConfig from './themePluginConfig';

require('events').EventEmitter.defaultMaxListeners = 0;
import { propList } from './postcss.config';
import { pxtorem } from './postcss.config';

export default defineConfig({
  plugins: ['@ctc/umi-plugin-antd-theme'],
  antdTheme: themePluginConfig,
  title: 'Venus',
  alias: {
    antd:  path.resolve(__dirname, '../node_modules/@ctc/antd'),
    '@mc': path.resolve(__dirname, '../packages/MessageCenter/src/'),
    navigator: path.resolve(__dirname, '../packages/Navigator/src/'),
    bpm: path.resolve(__dirname, '../packages/BPM/src/'),
    claim: path.resolve(__dirname, '../packages/Claim/src/'),
    integration: path.resolve(__dirname, '../packages/Integration/'),
    phowb: path.resolve(__dirname, '../packages/Phowb/src/'),
    ruleEngine: path.resolve(__dirname, '../packages/RuleEngine/src'),
    leaveManagement: path.resolve(__dirname, '../packages/LeaveManagement'),
    claimBasicProduct: path.resolve(__dirname, '../packages/ClaimBasicProduct/src/'),
    configuration: path.resolve(__dirname, '../packages/Configuration/src/'),
    documentManage: path.resolve(__dirname, '../packages/DocumentManage/src/'),
    enum: path.resolve(__dirname, '../packages/Basic/src/enum/'),
    basic: path.resolve(__dirname, '../packages/Basic/src/'),
    process: path.resolve(__dirname, '../packages/Process/'),
    packages: path.resolve(__dirname, '../packages/'),
    serviceSystem: path.resolve(__dirname, '../packages/ServiceSystem/'),
    RBAC: path.resolve(__dirname, '../packages/RBAC/'),
    mocks: path.resolve(__dirname, '../__mocks__/'),
    sql: path.resolve(__dirname, '../packages/SQL'),
    summary: path.resolve(__dirname, '../packages/SummaryPage/'),
    decision: path.resolve(
      __dirname,
      '../packages/Process/NewBusiness/ManualUnderwriting/Pages/Decision/'
    ),
    nb: path.resolve(__dirname, '../packages/Process/NewBusiness/ManualUnderwriting'),
    opus: path.resolve(__dirname, '../packages/Opus'),
    opusTH: path.resolve(__dirname, '../packages/opusTH'),
  },
  mock: false,
  title: false,
  // antd: {},
  dva: {},
  // icons: {},
  externals: {
    // react: 'React',
    // "react-dom": "ReactDOM",
  },
  // scripts: ['https://unpkg.com/react@18.2.0/umd/react.production.min.js'],
  headScripts: [
    // 解决首次加载时白屏的问题
    { src: '/scripts/loading.js', async: true },
    // 'https://unpkg.com/react@18.2.0/umd/react.production.min.js',
    // "https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js",
  ],
  //================ pro 插件配置 =================
  // presets: ['umi-presets-pro'],
  access: {},
  initialState: {},
  model: {},
  locale: {
    // default zh-CN
    default: 'en-US',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  fastRefresh: true,
  // jsMinifier: 'esbuild',
  cssMinifier: 'esbuild',
  targets: {
    // ie: 11,
  },
  // pwa: false,
  hash: true,
  // helmet: false,
  // devtool: false,
  // devtool: 'cheap-module-source-map', //process.env.SOURCE_MAP === '1' && 'eval-cheap-module-source-map',
  devtool: process.env.NODE_ENV === 'development' ? 'eval' : false,
  routes,
  theme: {
    ...themePluginConfig.theme[0].modifyVars,
  },
  define: {
    APP_TYPE: process.env.APP_TYPE || '',
    NODE_ENV: process.env.NODE_ENV,
    VERSION: process.env.VERSION,
    JIRA: process.env.JIRA,
  },
  ignoreMomentLocale: true,
  lessLoader: {
    javascriptEnabled: true,
    math: 'always',
  },
  conventionRoutes: {
    exclude: [/\/components\//, /\/models\//],
  },
  cssLoader: {
    modules: {
      getLocalIdent: (
        context: {
          resourcePath: string;
        },
        _: string,
        localName: string
      ) => {
        // not module handle
        if (
          context.resourcePath.includes('node_modules') ||
          context.resourcePath.includes('ant.design.pro.less') ||
          context.resourcePath.includes('global.less') ||
          context.resourcePath.includes('ant-design')
        ) {
          return localName;
        }
        // module handle
        const match =
          context.resourcePath.match(/src(.*)/) || context.resourcePath.match(/packages(.*)/);
        if (match && match[1]) {
          const antdProPath = match[1].replace('.less', '');
          const arr = slash(antdProPath)
            .split('/')
            .map((a) => a.replace(/([A-Z])/g, '-$1'))
            .map((a) => a.toLowerCase());
          return `react-app${arr.join('-')}-${localName}`.replace(/--/g, '-');
        }
        return localName;
      },
    },
  },
  manifest: {
    basePath: '/',
  },
  svgr: {},
  svgo: {},
  extraBabelPlugins: [
    // [
    //   'wildcard',
    //   {
    //     exts: ['js', 'jsx', 'ts', 'tsx'],
    //     nostrip: true,
    //     useCamelCase: true,
    //     noModifyCase: true,
    //   },
    // ],
  ],
  chainWebpack: (config: any) => {
    config.module
      .rule('extra-src')
      .use('babel-loader')
      .tap((opts) => {
        opts.compact = false;
        return opts;
      });

    config.optimization.splitChunks({
      chunks: process.env.NODE_ENV === 'development' ? 'async' : 'all',
      cacheGroups: {
        dva: {
          name: 'dva',
          test: /[\\/]node_modules[\\/](umi-plugin-dva|dva-loading|dva)[\\/]/,
          priority: 10,
          enforce: true,
        },
        exceljs: {
          name: 'exceljs',
          test: /[\\/]node_modules[\\/](exceljs)[\\/]/,
          priority: 10,
          enforce: true,
        },
      },
    });
  },
  extraPostCSSPlugins: [require('postcss-pxtorem')(pxtorem)],
  proxy: {
    ...proxy,
  },
  codeSplitting: {
    // 'bigVendors' | 'depPerChunk' | 'granularChunks'
    jsStrategy: 'granularChunks',
  },
  esbuildMinifyIIFE: true,
  // mfsu: false,
  mfsu: {
    strategy: 'normal', // eager , normal
  },
  // https: {
  //   hosts: ['127.0.0.1', 'localhost'],
  //   // http2: true
  // }
  // qiankun: {
  //   master: {
  //     apps: [
  //       {
  //         name: 'app1',
  //         entry: '//localhost:7002',
  //       }
  //     ],
  //   },
  // },
  runtimePublicPath: {},
});
