module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-px-to-viewport": {
      viewportWidth: 375, //视窗的宽度，对应的是我们设计稿的高度 (750是高清屏）
      viewportHeight: 667, //视窗的高度，对应的是我们设计稿的高度（也可以不配置）
      unitPrecision: 5, //指定`px`转换为视窗单位的小数点位数（很多时候无法整除）
      viewportUnit: 'vw', //指定需要转换成的视窗到位，建议使用vw
      selectorBlackList: [], //指定不需要转换的类
      minPixelValue: 1, //小于或等于`px`不必转换为将要转换的视窗单位
      mediaQuery: false,  //允许在媒体查询中转换`px`
      exclude: [/TabBar/]
    }
  }
}
