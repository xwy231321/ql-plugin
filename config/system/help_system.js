/*
* 此配置文件为系统使用，请勿修改，否则可能无法正常使用
*
* 如需自定义配置请复制修改上一级help_default.js
*
* */

export const helpCfg = {
  title: '清凉帮助',
  subTitle: 'Yunzai-Bot & ql-Plugin',
  columnCount: 3,
  colWidth: 265,
  theme: 'all',
  themeExclude: ['default'],
  style: {
    fontColor: '#ceb78b',
    descColor: '#eee',
    contBgColor: 'rgba(6, 21, 31, .5)',
    contBgBlur: 3,
    headerBgColor: 'rgba(6, 21, 31, .4)',
    rowBgColor1: 'rgba(6, 21, 31, .2)',
    rowBgColor2: 'rgba(6, 21, 31, .35)'
  },
  bgBlur: false
}

export const helpList = [
{
  group: '清凉插件功能',
  list: [
    {
      icon: 88,
      title: "#清凉图 #3张清凉图",
      desc: "随机二次元图片"
    },
    {
      icon: 3,
      title: "#铯p图 #3张铯p图",
      desc: "p..站的铯图"
    },
    {
      icon: 61,
      title: "#铯图 #原神铯图",
      desc: "随机漏•图片"
    },
    {
      icon: 63,
      title: "#清秀图#3张清秀图",
      desc: "清凉淘宝秀"
    }, 
    {
      icon: 66,
      title: "#二元图 #3张二元图",
      desc: "随机二次元图片"
    },
    {
      icon: 65,
      title: "#三元图 #3张三元图",
      desc: "随机三次元图片"
    },{
      icon: 83,
      title: "#bt",
      desc: "bt搜索,后加关键词,需要手动安装axios和cheerio依赖"
    },
    {
      icon: 62,
      title: "#清凉设置(敬请期待)",
      desc: "当前各功能启用状况"
    },
    {
      icon: 67,
      title: "#清凉版本 #清凉更新日志",
      desc: "查看新版本内容"
    },
    {
      icon: 71,
      title: "#清凉更新 #清凉强制更新",
      desc: "#清凉(强制)更新"
    }
  ]
},{
  group: '管理类命令',
  auth: 'master',
  list: [{
    icon: 32,
    title: '#敬请期待',
    desc: '咕咕中'
  },
  ]
}]

export const isSys = true