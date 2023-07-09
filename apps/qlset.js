import plugin from '../../../lib/plugins/plugin.js'
import lodash from 'lodash'
import { render , Data } from '../components/index.js'
import fs from 'fs'
import YAML from 'yaml'
import * as qlapi from "../../ql-plugin/model/qlapi.js";
const Path = process.cwd();
let ql2f18 = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/ql2f18.yaml', 'utf8'));
let ql2frql = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/ql2frql.yaml', 'utf8'));
let ql2r18 = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/ql2r18.yaml', 'utf8'));
let ql3f18 = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/ql3f18.yaml', 'utf8'));
let mh = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/mh.yaml', 'utf8'));
let p18 = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/p18.yaml', 'utf8'));
let qltao = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/qltao.yaml', 'utf8'));
let yize = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/yize.yaml', 'utf8'));
let btsearch = await YAML.parse(fs.readFileSync(`${Path}/plugins/ql-plugin/config/btsearch.yaml`, 'utf8'));



let setreg = '^#?(Ql|qL|QL|ql|清凉|ql插件|Ql插件|qL插件|QL插件|清凉插件)(设置|更改)(.*)(开启|关闭|账号|密码|源添加|源删除|仅主人生效开启|仅主人生效关闭|触发间隔|撤回时间|最大数量|指令|正则|黑名单群添加|黑名单群删除|白名单群添加|白名单群删除|类型混合|类型全年龄|类型限制级|最大页数)(.*)$'
export class ql_set extends plugin {
    constructor() {
      super({
        name: 'ql设置',
        dsc: 'qlset',
        event: 'message',
        priority: 1000,
        rule: [
          {
            reg: '^#?(Ql|qL|QL|ql|清凉|ql插件|Ql插件|qL插件|QL插件|清凉插件)(设置|更改)('+ql2frql.reg+')(开启|关闭|源添加|源删除|仅主人生效开启|仅主人生效关闭|触发间隔|撤回时间|最大数量|指令|正则|黑名单群添加|黑名单群删除|白名单群添加|白名单群删除|类型混合|类型全年龄|类型限制级|最大页数)(.*)$',
            fnc: 'setql2frql',
            permission: "master",
          },{
            reg: '^#?(Ql|qL|QL|ql|清凉|ql插件|Ql插件|qL插件|QL插件|清凉插件)(设置|更改)('+ql2f18.reg+')(开启|关闭|源添加|源删除|仅主人生效开启|仅主人生效关闭|触发间隔|撤回时间|最大数量|指令|正则|黑名单群添加|黑名单群删除|白名单群添加|白名单群删除|类型混合|类型全年龄|类型限制级|最大页数)(.*)$',
            fnc: 'setql2f18',
            permission: "master",
          },{
            reg: '^#?(Ql|qL|QL|ql|清凉|ql插件|Ql插件|qL插件|QL插件|清凉插件)(设置|更改)('+ql2r18.reg+')(开启|关闭|源添加|源删除|仅主人生效开启|仅主人生效关闭|触发间隔|撤回时间|最大数量|指令|正则|黑名单群添加|黑名单群删除|白名单群添加|白名单群删除|类型混合|类型全年龄|类型限制级|最大页数)(.*)$',
            fnc: 'setql2r18',
            permission: "master",
          },{
            reg: '^#?(Ql|qL|QL|ql|清凉|ql插件|Ql插件|qL插件|QL插件|清凉插件)(设置|更改)('+ql3f18.reg+')(开启|关闭|源添加|源删除|仅主人生效开启|仅主人生效关闭|触发间隔|撤回时间|最大数量|指令|正则|黑名单群添加|黑名单群删除|白名单群添加|白名单群删除|类型混合|类型全年龄|类型限制级|最大页数)(.*)$',
            fnc: 'setql3f18',
            permission: "master",
          },{
            reg: '^#?(Ql|qL|QL|ql|清凉|ql插件|Ql插件|qL插件|QL插件|清凉插件)(设置|更改)('+mh.reg+')(开启|关闭|源添加|源删除|仅主人生效开启|仅主人生效关闭|触发间隔|撤回时间|最大数量|指令|正则|黑名单群添加|黑名单群删除|白名单群添加|白名单群删除|类型混合|类型全年龄|类型限制级|最大页数)(.*)$',
            fnc: 'setmh',
            permission: "master",
          },{
            reg: '^#?(Ql|qL|QL|ql|清凉|ql插件|Ql插件|qL插件|QL插件|清凉插件)(设置|更改)('+p18.reg+')(开启|关闭|源添加|账号|密码|源删除|仅主人生效开启|仅主人生效关闭|触发间隔|撤回时间|最大数量|指令|正则|黑名单群添加|黑名单群删除|白名单群添加|白名单群删除|类型混合|类型全年龄|类型限制级|最大页数)(.*)$',
            fnc: 'setp18',
            permission: "master",
          },{
            reg: '^#?(Ql|qL|QL|ql|清凉|ql插件|Ql插件|qL插件|QL插件|清凉插件)(设置|更改)('+qltao.reg+')(开启|关闭|源添加|源删除|仅主人生效开启|仅主人生效关闭|触发间隔|撤回时间|最大数量|指令|正则|黑名单群添加|黑名单群删除|白名单群添加|白名单群删除|类型混合|类型全年龄|类型限制级|最大页数)(.*)$',
            fnc: 'setqltao',
            permission: "master",
          },{
            reg: '^#?(Ql|qL|QL|ql|清凉|ql插件|Ql插件|qL插件|QL插件|清凉插件)(设置|更改)('+btsearch.reg+')(开启|关闭|源添加|源删除|仅主人生效开启|仅主人生效关闭|触发间隔|撤回时间|最大数量|指令|正则|黑名单群添加|黑名单群删除|白名单群添加|白名单群删除|类型混合|类型全年龄|类型限制级|最大页数)(.*)$',
            fnc: 'setbtsearch',
            permission: "master",
          },{
            reg: '^#?(Ql|qL|QL|ql|清凉|ql插件|Ql插件|qL插件|QL插件|清凉插件)(设置|更改)('+yize.reg+')(开启|关闭|仅主人生效开启|仅主人生效关闭|触发间隔|撤回时间|最大数量|指令|正则|黑名单群添加|黑名单群删除|白名单群添加|白名单群删除|类型混合|类型全年龄|类型限制级|最大页数)(.*)$',
            fnc: 'setyize',
            permission: "master",
          },{
            reg: '^#?(Ql|qL|QL|ql|清凉|ql插件|Ql插件|qL插件|QL插件|清凉插件)修改设置(帮助|help|指令|菜单|命令)$',
            fnc: 'sethelp',
            permission: "master",
          },{
            reg: '^#?(Ql|qL|QL|ql|清凉|ql插件|Ql插件|qL插件|QL插件|清凉插件)设置$',
            fnc: 'setting',
            permission: "master",
          },{
            reg: '^#?(Ql|qL|QL|ql|清凉|ql插件|Ql插件|qL插件|QL插件|清凉插件)设置('+ql2frql.reg+'|'+ql2f18.reg+'|'+ql2r18.reg+'|'+ql3f18.reg+'|'+mh.reg+'|'+p18.reg+'|'+qltao.reg+'|'+btsearch.reg+'|'+yize.reg+')$',
            fnc: 'setting_other',
            permission: "master",
          }
        ]
      });
    }

    async aql2frql(e){
      let ql2frql = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/ql2frql.yaml', 'utf8'));
      let data ={

        ql2frqlisopen: getStatus(ql2frql.isopen),
        ql2frqlismaster: getStatus(ql2frql.isMaster),
        ql2frqlgetcd: Number(ql2frql.getcd),
        ql2frqlchcd: Number(ql2frql.chcd),
        ql2frqlmaxnum: Number(ql2frql.maxnum),
        ql2frqllx: getStatuslx(Number(ql2frql.lx)),
        ql2frqlreg: ql2frql.reg,

      }
      await render('admin/ql2frql', {
        ...data,
        bg: await rodom()
      }, {
        e,
        scale: 1.4
      })
    }
    async bql2f18(e){
      let ql2f18 = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/ql2f18.yaml', 'utf8'));
      let data ={
  
        ql2f18isopen: getStatus(ql2f18.isopen),
        ql2f18ismaster: getStatus(ql2f18.isMaster),
        ql2f18getcd: Number(ql2f18.getcd),
        ql2f18chcd: Number(ql2f18.chcd),
        ql2f18maxnum: Number(ql2f18.maxnum),
        ql2f18reg: ql2f18.reg,

      }
      await render('admin/ql2f18', {
        ...data,
        bg: await rodom()
      }, {
        e,
        scale: 1.4
      })

    }
    async cql2r18(e){
      let ql2r18 = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/ql2r18.yaml', 'utf8'));
      let data ={
  
        ql2r18isopen: getStatus(ql2r18.isopen),
        ql2r18ismaster: getStatus(ql2r18.isMaster),
        ql2r18getcd: Number(ql2r18.getcd),
        ql2r18chcd: Number(ql2r18.chcd),
        ql2r18maxnum: Number(ql2r18.maxnum),
        ql2r18reg: ql2r18.reg,

        }
      await render('admin/ql2r18', {
        ...data,
        bg: await rodom()
      }, {
        e,
        scale: 1.4
      })

    }
    async dql3f18(e){
      let ql3f18 = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/ql3f18.yaml', 'utf8'));
      let data ={

        ql3f18isopen: getStatus(ql3f18.isopen),
        ql3f18ismaster: getStatus(ql3f18.isMaster),
        ql3f18getcd: Number(ql3f18.getcd),
        ql3f18chcd: Number(ql3f18.chcd),
        ql3f18maxnum: Number(ql3f18.maxnum),
        ql3f18reg: ql3f18.reg,

      }
      await render('admin/ql3f18', {
        ...data,
        bg: await rodom()
      }, {
        e,
        scale: 1.4
      })
    }
    async emh(e){
      let mh = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/mh.yaml', 'utf8'));
      let data ={

        mhisopen: getStatus(mh.isopen),
        mhismaster: getStatus(mh.isMaster),
        mhgetcd: Number(mh.getcd),
        mhchcd: Number(mh.chcd),
        mhmaxnum: Number(mh.maxnum),
        mhreg: mh.reg,

      }
      await render('admin/mh', {
        ...data,
        bg: await rodom()
      }, {
        e,
        scale: 1.4
      })
    }
    async fp18(e){
      let p18 = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/p18.yaml', 'utf8'));
      let data ={

        p18isopen: getStatus(p18.isopen),
        p18ismaster: getStatus(p18.isMaster),
        p18getcd: Number(p18.getcd),
        p18chcd: Number(p18.chcd),
        p18maxnum: Number(p18.maxnum),
        p18reg: p18.reg,
        p18token: p18.token,

      }
      await render('admin/p18', {
        ...data,
        bg: await rodom()
      }, {
        e,
        scale: 1.4
      })}
      async gqltao(e){
        let qltao = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/qltao.yaml', 'utf8'));
        let data ={

          qltaoisopen: getStatus(qltao.isopen),
          qltaoismaster: getStatus(qltao.isMaster),
          qltaogetcd: Number(qltao.getcd),
          qltaochcd: Number(qltao.chcd),
          qltaomaxnum: Number(qltao.maxnum),
          qltaoreg: qltao.reg,
  
        }
        await render('admin/qltao', {
          ...data,
          bg: await rodom()
        }, {
          e,
          scale: 1.4
        })

      }
      async hbtsearch(e){
        let btsearch = await YAML.parse(fs.readFileSync(`${Path}/plugins/ql-plugin/config/btsearch.yaml`, 'utf8'));
        let data ={

          btsearchisopen: getStatus(btsearch.IS_GROUPS),
          btsearchpagemaxnum: Number(btsearch.page_max_num),
          btsearchgetmaxnum: Number(btsearch.BT_MAX_NUM),
          btsearchreg: btsearch.reg,
        }
        await render('admin/btsearch', {
          ...data,
          bg: await rodom()
        }, {
          e,
          scale: 1.4
        })

      }
      async iyize(e){
        let yize = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/yize.yaml', 'utf8'));
        let data ={

          yizeisopen: getStatus(yize.isopen),
          yizeismaster: getStatus(yize.isMaster),
          yizegetcd: Number(yize.getcd),
          yizechcd: Number(yize.chcd),
          yizemaxnum: Number(yize.maxnum),
          yizereg: yize.reg,
  
        }
        await render('admin/yize', {
          ...data,
          bg: await rodom()
        }, {
          e,
          scale: 1.4
        })}
    async setting_other(e) {
      let set_other_reg = '^#?(Ql|qL|QL|ql|清凉|ql插件|Ql插件|qL插件|QL插件|清凉插件)设置(.*)$'
     let reg = new RegExp(set_other_reg).exec(e.msg);
      if(reg[2] === ql2frql.reg){
        this.aql2frql(e)
      }else if(reg[2] === ql2f18.reg){
        this.bql2f18(e)
      }else if(reg[2] === ql2r18.reg){
        this.cql2r18(e)
      }else if(reg[2] === ql3f18.reg){
        this.dql3f18(e)
      }else if(reg[2] === mh.reg){
        this.emh(e)
      }else if(reg[2] === p18.reg){
        this.fp18(e)
      }else if(reg[2] === qltao.reg){
        this.gqltao(e)
      }else if(reg[2] === btsearch.reg){
        this.hbtsearch(e)
      }else if(reg[2] === yize.reg){
        this.iyize(e)
      }else{
        this.fp18(e)
      }
      
    }

    async setting(e) {
      let ql2f18 = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/ql2f18.yaml', 'utf8'));
      let ql2frql = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/ql2frql.yaml', 'utf8'));
      let ql2r18 = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/ql2r18.yaml', 'utf8'));
      let ql3f18 = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/ql3f18.yaml', 'utf8'));
      let mh = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/mh.yaml', 'utf8'));
      let p18 = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/p18.yaml', 'utf8'));
      let qltao = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/qltao.yaml', 'utf8'));
      let yize = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/yize.yaml', 'utf8'));
      let btsearch = await YAML.parse(fs.readFileSync(`${Path}/plugins/ql-plugin/config/btsearch.yaml`, 'utf8'));

      let data ={

        ql2frqlisopen: getStatus(ql2frql.isopen),
        ql2frqlismaster: getStatus(ql2frql.isMaster),
        ql2frqlgetcd: Number(ql2frql.getcd),
        ql2frqlchcd: Number(ql2frql.chcd),
        ql2frqlmaxnum: Number(ql2frql.maxnum),
        ql2frqllx: getStatuslx(Number(ql2frql.lx)),
        ql2frqlreg: ql2frql.reg,

        ql2f18isopen: getStatus(ql2f18.isopen),
        ql2f18ismaster: getStatus(ql2f18.isMaster),
        ql2f18getcd: Number(ql2f18.getcd),
        ql2f18chcd: Number(ql2f18.chcd),
        ql2f18maxnum: Number(ql2f18.maxnum),
        ql2f18reg: ql2f18.reg,

        ql2r18isopen: getStatus(ql2r18.isopen),
        ql2r18ismaster: getStatus(ql2r18.isMaster),
        ql2r18getcd: Number(ql2r18.getcd),
        ql2r18chcd: Number(ql2r18.chcd),
        ql2r18maxnum: Number(ql2r18.maxnum),
        ql2r18reg: ql2r18.reg,

        ql3f18isopen: getStatus(ql3f18.isopen),
        ql3f18ismaster: getStatus(ql3f18.isMaster),
        ql3f18getcd: Number(ql3f18.getcd),
        ql3f18chcd: Number(ql3f18.chcd),
        ql3f18maxnum: Number(ql3f18.maxnum),
        ql3f18reg: ql3f18.reg,

        mhisopen: getStatus(mh.isopen),
        mhismaster: getStatus(mh.isMaster),
        mhgetcd: Number(mh.getcd),
        mhchcd: Number(mh.chcd),
        mhmaxnum: Number(mh.maxnum),
        mhreg: mh.reg,

        p18isopen: getStatus(p18.isopen),
        p18ismaster: getStatus(p18.isMaster),
        p18getcd: Number(p18.getcd),
        p18chcd: Number(p18.chcd),
        p18maxnum: Number(p18.maxnum),
        p18reg: p18.reg,
        p18token: p18.token,

        qltaoisopen: getStatus(qltao.isopen),
        qltaoismaster: getStatus(qltao.isMaster),
        qltaogetcd: Number(qltao.getcd),
        qltaochcd: Number(qltao.chcd),
        qltaomaxnum: Number(qltao.maxnum),
        qltaoreg: qltao.reg,

        yizeisopen: getStatus(yize.isopen),
        yizeismaster: getStatus(yize.isMaster),
        yizegetcd: Number(yize.getcd),
        yizechcd: Number(yize.chcd),
        yizemaxnum: Number(yize.maxnum),
        yizereg: yize.reg,

        btsearchisopen: getStatus(btsearch.IS_GROUPS),
        btsearchpagemaxnum: Number(btsearch.page_max_num),
        btsearchgetmaxnum: Number(btsearch.BT_MAX_NUM),
        btsearchreg: btsearch.reg,
      }
      await render('admin/index', {
        ...data,
        bg: await rodom()
      }, {
        e,
        scale: 1.4
      })
    }
    async setql2frql(e) {
      let ql2frql = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/ql2frql.yaml', 'utf8'));
      let reg = new RegExp(setreg).exec(e.msg);
        if(reg[4] === '开启'||reg[4] === '关闭'){
          let isopen
          if(reg[4] === '开启'){
            isopen = true
          }else if(reg[4] === '关闭'){
            isopen = false
          }
          ql2frql.isopen = isopen
        }else if(reg[4] === '仅主人生效开启'||reg[4] === '仅主人生效关闭'){
          let isMaster
          if(reg[4] === '仅主人生效开启'){
            isMaster = true
          }else if(reg[4] === '仅主人生效关闭'){
            isMaster = false
          }
          ql2frql.isMaster = isMaster
        }else if(reg[4] === '触发间隔'){
          if(Number.isInteger(Number(reg[5]))){
          let getcd = Number(reg[5])
          ql2frql.getcd = getcd
          }else{
            e.reply('请以数字结尾')
            return true
          }
        }else if(reg[4] === '撤回时间'){
          if(Number.isInteger(Number(reg[5]))){
          let chcd = Number(reg[5])
          ql2frql.chcd = chcd
          }else{
            e.reply('请以数字结尾')
            return true
         }
        }else if(reg[4] === '最大数量'){
          if(Number.isInteger(Number(reg[5]))){
          let maxnum = Number(reg[5])
          ql2frql.maxnum = maxnum
          }else{
            e.reply('请以数字结尾')
            return true
          }
        }else if(reg[4] === '类型混合'){
          let lx = 2
          ql2frql.lx = lx
        }else if(reg[4] === '类型限制级'){
          let lx = 1
          ql2frql.lx = lx
        }else if(reg[4] === '类型全年龄'){
          let lx = 0
          ql2frql.lx = lx
        }else if(reg[4] === '黑名单群删除'||reg[4] === '黑名单群添加'){
          let blackgroup = ql2frql.blackgroup
          if(reg[4] === '黑名单群删除'){
            if(Number.isInteger(Number(reg[5]))){
              let index = blackgroup.indexOf(Number(reg[5]))
              if(index > -1){
                blackgroup.splice(index, 1)
                ql2frql.blackgroup = blackgroup
              }else{
                e.reply('黑名单群没有这个')
                return true
              }
            }else{
              e.reply('请以数字群号结尾')
              return true
            }
          }else if(reg[4] === '黑名单群添加'){
            if(Number.isInteger(Number(reg[5]))){
              blackgroup.push(Number(reg[5]))
              ql2frql.blackgroup = blackgroup
            }else{
              e.reply('请以数字群号结尾')
              return true
            }
          }
        }else if(reg[4] === '白名单群删除'||reg[4] === '白名单群添加'){
          let whitegroup = ql2frql.whitegroup
          if(reg[4] === '白名单群删除'){
            if(Number.isInteger(Number(reg[5]))){
              let index = whitegroup.indexOf(Number(reg[5]))
              if(index > -1){
                whitegroup.splice(index, 1)
                ql2frql.whitegroup = whitegroup
              }else{
                e.reply('白名单群没有这个')
                return true
              }
            }else{
              e.reply('请以数字群号结尾')
              return true
            }
          }else if(reg[4] === '白名单群添加'){
            if(Number.isInteger(Number(reg[5]))){
              whitegroup.push(Number(reg[5]))
              ql2frql.whitegroup = whitegroup
            }else{
              e.reply('请以数字群号结尾')
              return true
            }
          }
        }else if(reg[4] === '指令' ||reg[4] === '正则'){
          let regget = reg[5]
          ql2frql.reg = regget
        }else if(reg[4] === '源添加'||reg[4] === '源删除'){
          let urllist = ql2frql.url
          if (reg[4] === '源添加'){
            urllist.push(reg[5])
            ql2frql.url = urllist
          }else if (reg[4] === '源删除'){
            let index = whitegroup.indexOf(reg[5])
              if(index > -1){
                urllist.splice(index, 1)
                ql2frql.url = urllist
              }else{
                e.reply('源列表无此源')
              }
          }
        }
        fs.writeFileSync('./plugins/ql-plugin/config/ql2frql.yaml',YAML.stringify(ql2frql),'utf8')
        this.aql2frql(e)
        return true
      
    }
    async setql2f18(e){
      let ql2f18 = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/ql2f18.yaml', 'utf8'));
      let reg = new RegExp(setreg).exec(e.msg);
        if(reg[4] === '开启'||reg[4] === '关闭'){
          let isopen
          if(reg[4] === '开启'){
            isopen = true
          }else if(reg[4] === '关闭'){
            isopen = false
          }
          ql2f18.isopen = isopen
        }else if(reg[4] === '仅主人生效开启'||reg[4] === '仅主人生效关闭'){
          let isMaster
          if(reg[4] === '仅主人生效开启'){
            isMaster = true
          }else if(reg[4] === '仅主人生效关闭'){
            isMaster = false
          }
          ql2f18.isMaster = isMaster
        }else if(reg[4] === '触发间隔'){
          if(Number.isInteger(Number(reg[5]))){
          let getcd = Number(reg[5])
          ql2f18.getcd = getcd
          }else{
            e.reply('请以数字结尾')
            return true
          }
        }else if(reg[4] === '撤回时间'){
          if(Number.isInteger(Number(reg[5]))){
          let chcd = Number(reg[5])
          ql2f18.chcd = chcd
          }else{
            e.reply('请以数字结尾')
            return true
         }
        }else if(reg[4] === '最大数量'){
          if(Number.isInteger(Number(reg[5]))){
          let maxnum = Number(reg[5])
          ql2f18.maxnum = maxnum
          }else{
            e.reply('请以数字结尾')
            return true
          }
        }else if(reg[4] === '黑名单群删除'||reg[4] === '黑名单群添加'){
          let blackgroup = ql2f18.blackgroup
          if(reg[4] === '黑名单群删除'){
            if(Number.isInteger(Number(reg[5]))){
              let index = blackgroup.indexOf(Number(reg[5]))
              if(index > -1){
                blackgroup.splice(index, 1)
                ql2f18.blackgroup = blackgroup
              }else{
                e.reply('黑名单群没有这个')
                return true
              }
            }else{
              e.reply('请以数字群号结尾')
              return true
            }
          }else if(reg[4] === '黑名单群添加'){
            if(Number.isInteger(Number(reg[5]))){
              blackgroup.push(Number(reg[5]))
              ql2f18.blackgroup = blackgroup
            }else{
              e.reply('请以数字群号结尾')
              return true
            }
          }
        }else if(reg[4] === '白名单群删除'||reg[4] === '白名单群添加'){
          let whitegroup = ql2f18.whitegroup
          if(reg[4] === '白名单群删除'){
            if(Number.isInteger(Number(reg[5]))){
              let index = whitegroup.indexOf(Number(reg[5]))
              if(index > -1){
                whitegroup.splice(index, 1)
                ql2f18.whitegroup = whitegroup
              }else{
                e.reply('白名单群没有这个')
                return true
              }
            }else{
              e.reply('请以数字群号结尾')
              return true
            }
          }else if(reg[4] === '白名单群添加'){
            if(Number.isInteger(Number(reg[5]))){
              whitegroup.push(Number(reg[5]))
              ql2f18.whitegroup = whitegroup
            }else{
              e.reply('请以数字群号结尾')
              return true
            }
          }
        }else if(reg[4] === '指令' ||reg[4] === '正则'){
          let regget = reg[5]
          ql2f18.reg = regget
        }else if(reg[4] === '源添加'||reg[4] === '源删除'){
          let urllist = ql2f18.url
          if (reg[4] === '源添加'){
            urllist.push(reg[5])
            ql2f18.url = urllist
          }else if (reg[4] === '源删除'){
            let index = whitegroup.indexOf(reg[5])
              if(index > -1){
                urllist.splice(index, 1)
                ql2f18.url = urllist
              }else{
                e.reply('源列表无此源')
              }
          }
        }
        fs.writeFileSync('./plugins/ql-plugin/config/ql2f18.yaml',YAML.stringify(ql2f18),'utf8')
        this.bql2f18(e)
        return true
      }

      async setql2r18(e){
        let ql2r18 = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/ql2r18.yaml', 'utf8'));
        let reg = new RegExp(setreg).exec(e.msg);
        if(reg[4] === '开启'||reg[4] === '关闭'){
          let isopen
          if(reg[4] === '开启'){
            isopen = true
          }else if(reg[4] === '关闭'){
            isopen = false
          }
          ql2r18.isopen = isopen
        }else if(reg[4] === '仅主人生效开启'||reg[4] === '仅主人生效关闭'){
          let isMaster
          if(reg[4] === '仅主人生效开启'){
            isMaster = true
          }else if(reg[4] === '仅主人生效关闭'){
            isMaster = false
          }
          ql2r18.isMaster = isMaster
        }else if(reg[4] === '触发间隔'){
          if(Number.isInteger(Number(reg[5]))){
          let getcd = Number(reg[5])
          ql2r18.getcd = getcd
          }else{
            e.reply('请以数字结尾')
            return true
          }
        }else if(reg[4] === '撤回时间'){
          if(Number.isInteger(Number(reg[5]))){
          let chcd = Number(reg[5])
          ql2r18.chcd = chcd
          }else{
            e.reply('请以数字结尾')
            return true
         }
        }else if(reg[4] === '最大数量'){
          if(Number.isInteger(Number(reg[5]))){
          let maxnum = Number(reg[5])
          ql2r18.maxnum = maxnum
          }else{
            e.reply('请以数字结尾')
            return true
          }
        }else if(reg[4] === '黑名单群删除'||reg[4] === '黑名单群添加'){
          let blackgroup = ql2r18.blackgroup
          if(reg[4] === '黑名单群删除'){
            if(Number.isInteger(Number(reg[5]))){
              let index = blackgroup.indexOf(Number(reg[5]))
              if(index > -1){
                blackgroup.splice(index, 1)
                ql2r18.blackgroup = blackgroup
              }else{
                e.reply('黑名单群没有这个')
                return true
              }
            }else{
              e.reply('请以数字群号结尾')
              return true
            }
          }else if(reg[4] === '黑名单群添加'){
            if(Number.isInteger(Number(reg[5]))){
              blackgroup.push(Number(reg[5]))
              ql2r18.blackgroup = blackgroup
            }else{
              e.reply('请以数字群号结尾')
              return true
            }
          }
        }else if(reg[4] === '白名单群删除'||reg[4] === '白名单群添加'){
          let whitegroup = ql2r18.whitegroup
          if(reg[4] === '白名单群删除'){
            if(Number.isInteger(Number(reg[5]))){
              let index = whitegroup.indexOf(Number(reg[5]))
              if(index > -1){
                whitegroup.splice(index, 1)
                ql2r18.whitegroup = whitegroup
              }else{
                e.reply('白名单群没有这个')
                return true
              }
            }else{
              e.reply('请以数字群号结尾')
              return true
            }
          }else if(reg[4] === '白名单群添加'){
            if(Number.isInteger(Number(reg[5]))){
              whitegroup.push(Number(reg[5]))
              ql2r18.whitegroup = whitegroup
            }else{
              e.reply('请以数字群号结尾')
              return true
            }
          }
        }else if(reg[4] === '指令' ||reg[4] === '正则'){
          let regget = reg[5]
          ql2r18.reg = regget
        }else if(reg[4] === '源添加'||reg[4] === '源删除'){
          let urllist = ql2r18.url
          if (reg[4] === '源添加'){
            urllist.push(reg[5])
            ql2r18.url = urllist
          }else if (reg[4] === '源删除'){
            let index = whitegroup.indexOf(reg[5])
              if(index > -1){
                urllist.splice(index, 1)
                ql2r18.url = urllist
              }else{
                e.reply('源列表无此源')
              }
          }
        }
        fs.writeFileSync('./plugins/ql-plugin/config/ql2r18.yaml',YAML.stringify(ql2r18),'utf8')
        this.cql2r18(e)
        return true
      }
      async setql3f18(e){
        let ql3f18 = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/ql3f18.yaml', 'utf8'));
        let reg = new RegExp(setreg).exec(e.msg);
        if(reg[4] === '开启'||reg[4] === '关闭'){
          let isopen
          if(reg[4] === '开启'){
            isopen = true
          }else if(reg[4] === '关闭'){
            isopen = false
          }
          ql3f18.isopen = isopen
        }else if(reg[4] === '仅主人生效开启'||reg[4] === '仅主人生效关闭'){
          let isMaster
          if(reg[4] === '仅主人生效开启'){
            isMaster = true
          }else if(reg[4] === '仅主人生效关闭'){
            isMaster = false
          }
          ql3f18.isMaster = isMaster
        }else if(reg[4] === '触发间隔'){
          if(Number.isInteger(Number(reg[5]))){
          let getcd = Number(reg[5])
          ql3f18.getcd = getcd
          }else{
            e.reply('请以数字结尾')
            return true
          }
        }else if(reg[4] === '撤回时间'){
          if(Number.isInteger(Number(reg[5]))){
          let chcd = Number(reg[5])
          ql3f18.chcd = chcd
          }else{
            e.reply('请以数字结尾')
            return true
         }
        }else if(reg[4] === '最大数量'){
          if(Number.isInteger(Number(reg[5]))){
          let maxnum = Number(reg[5])
          ql3f18.maxnum = maxnum
          }else{
            e.reply('请以数字结尾')
            return true
          }
        }else if(reg[4] === '黑名单群删除'||reg[4] === '黑名单群添加'){
          let blackgroup = ql3f18.blackgroup
          if(reg[4] === '黑名单群删除'){
            if(Number.isInteger(Number(reg[5]))){
              let index = blackgroup.indexOf(Number(reg[5]))
              if(index > -1){
                blackgroup.splice(index, 1)
                ql3f18.blackgroup = blackgroup
              }else{
                e.reply('黑名单群没有这个')
                return true
              }
            }else{
              e.reply('请以数字群号结尾')
              return true
            }
          }else if(reg[4] === '黑名单群添加'){
            if(Number.isInteger(Number(reg[5]))){
              blackgroup.push(Number(reg[5]))
              ql3f18.blackgroup = blackgroup
            }else{
              e.reply('请以数字群号结尾')
              return true
            }
          }
        }else if(reg[4] === '白名单群删除'||reg[4] === '白名单群添加'){
          let whitegroup = ql3f18.whitegroup
          if(reg[4] === '白名单群删除'){
            if(Number.isInteger(Number(reg[5]))){
              let index = whitegroup.indexOf(Number(reg[5]))
              if(index > -1){
                whitegroup.splice(index, 1)
                ql3f18.whitegroup = whitegroup
              }else{
                e.reply('白名单群没有这个')
                return true
              }
            }else{
              e.reply('请以数字群号结尾')
              return true
            }
          }else if(reg[4] === '白名单群添加'){
            if(Number.isInteger(Number(reg[5]))){
              whitegroup.push(Number(reg[5]))
              ql3f18.whitegroup = whitegroup
            }else{
              e.reply('请以数字群号结尾')
              return true
            }
          }
        }else if(reg[4] === '指令' ||reg[4] === '正则'){
          let regget = reg[5]
          ql3f18.reg = regget
        }else if(reg[4] === '源添加'||reg[4] === '源删除'){
          let urllist = ql3f18.url
          if (reg[4] === '源添加'){
            urllist.push(reg[5])
            ql3f18.url = urllist
          }else if (reg[4] === '源删除'){
            let index = whitegroup.indexOf(reg[5])
              if(index > -1){
                urllist.splice(index, 1)
                ql3f18.url = urllist
              }else{
                e.reply('源列表无此源')
              }
          }
        }
        fs.writeFileSync('./plugins/ql-plugin/config/ql3f18.yaml',YAML.stringify(ql3f18),'utf8')
        this.dql3f18(e)
        return true
      }
      async setmh(e){
        let mh = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/mh.yaml', 'utf8'));
        let reg = new RegExp(setreg).exec(e.msg);
        if(reg[4] === '开启'||reg[4] === '关闭'){
          let isopen
          if(reg[4] === '开启'){
            isopen = true
          }else if(reg[4] === '关闭'){
            isopen = false
          }
          mh.isopen = isopen
        }else if(reg[4] === '仅主人生效开启'||reg[4] === '仅主人生效关闭'){
          let isMaster
          if(reg[4] === '仅主人生效开启'){
            isMaster = true
          }else if(reg[4] === '仅主人生效关闭'){
            isMaster = false
          }
          mh.isMaster = isMaster
        }else if(reg[4] === '触发间隔'){
          if(Number.isInteger(Number(reg[5]))){
          let getcd = Number(reg[5])
          mh.getcd = getcd
          }else{
            e.reply('请以数字结尾')
            return true
          }
        }else if(reg[4] === '撤回时间'){
          if(Number.isInteger(Number(reg[5]))){
          let chcd = Number(reg[5])
          mh.chcd = chcd
          }else{
            e.reply('请以数字结尾')
            return true
         }
        }else if(reg[4] === '最大数量'){
          if(Number.isInteger(Number(reg[5]))){
          let maxnum = Number(reg[5])
          mh.maxnum = maxnum
          }else{
            e.reply('请以数字结尾')
            return true
          }
        }else if(reg[4] === '黑名单群删除'||reg[4] === '黑名单群添加'){
          let blackgroup = mh.blackgroup
          if(reg[4] === '黑名单群删除'){
            if(Number.isInteger(Number(reg[5]))){
              let index = blackgroup.indexOf(Number(reg[5]))
              if(index > -1){
                blackgroup.splice(index, 1)
                mh.blackgroup = blackgroup
              }else{
                e.reply('黑名单群没有这个')
                return true
              }
            }else{
              e.reply('请以数字群号结尾')
              return true
            }
          }else if(reg[4] === '黑名单群添加'){
            if(Number.isInteger(Number(reg[5]))){
              blackgroup.push(Number(reg[5]))
              mh.blackgroup = blackgroup
            }else{
              e.reply('请以数字群号结尾')
              return true
            }
          }
        }else if(reg[4] === '白名单群删除'||reg[4] === '白名单群添加'){
          let whitegroup = mh.whitegroup
          if(reg[4] === '白名单群删除'){
            if(Number.isInteger(Number(reg[5]))){
              let index = whitegroup.indexOf(Number(reg[5]))
              if(index > -1){
                whitegroup.splice(index, 1)
                mh.whitegroup = whitegroup
              }else{
                e.reply('白名单群没有这个')
                return true
              }
            }else{
              e.reply('请以数字群号结尾')
              return true
            }
          }else if(reg[4] === '白名单群添加'){
            if(Number.isInteger(Number(reg[5]))){
              whitegroup.push(Number(reg[5]))
              mh.whitegroup = whitegroup
            }else{
              e.reply('请以数字群号结尾')
              return true
            }
          }
        }else if(reg[4] === '指令' ||reg[4] === '正则'){
          let regget = reg[5]
          mh.reg = regget
        }else if(reg[4] === '源添加'||reg[4] === '源删除'){
          let urllist = mh.url
          if (reg[4] === '源添加'){
            urllist.push(reg[5])
            mh.url = urllist
          }else if (reg[4] === '源删除'){
            let index = whitegroup.indexOf(reg[5])
              if(index > -1){
                urllist.splice(index, 1)
                mh.url = urllist
              }else{
                e.reply('源列表无此源')
              }
          }
        }
        fs.writeFileSync('./plugins/ql-plugin/config/mh.yaml',YAML.stringify(mh),'utf8')
        this.emh(e)
        return true
      }
      async setp18(e){
        let p18 = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/p18.yaml', 'utf8'));
        let reg = new RegExp(setreg).exec(e.msg);
        if(reg[4] === '账号'){
          let tokenget = reg[5]
          p18.token = tokenget
        }else if(reg[4] === '密码'){
          let passwordget = reg[5]
          p18.password = passwordget
        }else if(reg[4] === '开启'||reg[4] === '关闭'){
          let isopen
          if(reg[4] === '开启'){
            isopen = true
          }else if(reg[4] === '关闭'){
            isopen = false
          }
          p18.isopen = isopen
        }else if(reg[4] === '仅主人生效开启'||reg[4] === '仅主人生效关闭'){
          let isMaster
          if(reg[4] === '仅主人生效开启'){
            isMaster = true
          }else if(reg[4] === '仅主人生效关闭'){
            isMaster = false
          }
          p18.isMaster = isMaster
        }else if(reg[4] === '触发间隔'){
          if(Number.isInteger(Number(reg[5]))){
          let getcd = Number(reg[5])
          p18.getcd = getcd
          }else{
            e.reply('请以数字结尾')
            return true
          }
        }else if(reg[4] === '撤回时间'){
          if(Number.isInteger(Number(reg[5]))){
          let chcd = Number(reg[5])
          p18.chcd = chcd
          }else{
            e.reply('请以数字结尾')
            return true
         }
        }else if(reg[4] === '最大数量'){
          if(Number.isInteger(Number(reg[5]))){
          let maxnum = Number(reg[5])
          p18.maxnum = maxnum
          }else{
            e.reply('请以数字结尾')
            return true
          }
        }else if(reg[4] === '黑名单群删除'||reg[4] === '黑名单群添加'){
          let blackgroup = p18.blackgroup
          if(reg[4] === '黑名单群删除'){
            if(Number.isInteger(Number(reg[5]))){
              let index = blackgroup.indexOf(Number(reg[5]))
              if(index > -1){
                blackgroup.splice(index, 1)
                p18.blackgroup = blackgroup
              }else{
                e.reply('黑名单群没有这个')
                return true
              }
            }else{
              e.reply('请以数字群号结尾')
              return true
            }
          }else if(reg[4] === '黑名单群添加'){
            if(Number.isInteger(Number(reg[5]))){
              blackgroup.push(Number(reg[5]))
              p18.blackgroup = blackgroup
            }else{
              e.reply('请以数字群号结尾')
              return true
            }
          }
        }else if(reg[4] === '白名单群删除'||reg[4] === '白名单群添加'){
          let whitegroup = p18.whitegroup
          if(reg[4] === '白名单群删除'){
            if(Number.isInteger(Number(reg[5]))){
              let index = whitegroup.indexOf(Number(reg[5]))
              if(index > -1){
                whitegroup.splice(index, 1)
                p18.whitegroup = whitegroup
              }else{
                e.reply('白名单群没有这个')
                return true
              }
            }else{
              e.reply('请以数字群号结尾')
              return true
            }
          }else if(reg[4] === '白名单群添加'){
            if(Number.isInteger(Number(reg[5]))){
              whitegroup.push(Number(reg[5]))
              p18.whitegroup = whitegroup
            }else{
              e.reply('请以数字群号结尾')
              return true
            }
          }
        }else if(reg[4] === '指令' ||reg[4] === '正则'){
          let regget = reg[5]
          p18.reg = regget
        }else if(reg[4] === '源添加'||reg[4] === '源删除'){
          let urllist = p18.url
          if (reg[4] === '源添加'){
            urllist.push(reg[5])
            p18.url = urllist
          }else if (reg[4] === '源删除'){
            let index = whitegroup.indexOf(reg[5])
              if(index > -1){
                urllist.splice(index, 1)
                p18.url = urllist
              }else{
                e.reply('源列表无此源')
              }
          }
        }
        fs.writeFileSync('./plugins/ql-plugin/config/p18.yaml',YAML.stringify(p18),'utf8')
        this.fp18(e)
        return true
      }
      async setqltao(e){
        let qltao = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/qltao.yaml', 'utf8'));
        let reg = new RegExp(setreg).exec(e.msg);
        if(reg[4] === '开启'||reg[4] === '关闭'){
          let isopen
          if(reg[4] === '开启'){
            isopen = true
          }else if(reg[4] === '关闭'){
            isopen = false
          }
          qltao.isopen = isopen
        }else if(reg[4] === '仅主人生效开启'||reg[4] === '仅主人生效关闭'){
          let isMaster
          if(reg[4] === '仅主人生效开启'){
            isMaster = true
          }else if(reg[4] === '仅主人生效关闭'){
            isMaster = false
          }
          qltao.isMaster = isMaster
        }else if(reg[4] === '触发间隔'){
          if(Number.isInteger(Number(reg[5]))){
          let getcd = Number(reg[5])
          qltao.getcd = getcd
          }else{
            e.reply('请以数字结尾')
            return true
          }
        }else if(reg[4] === '撤回时间'){
          if(Number.isInteger(Number(reg[5]))){
          let chcd = Number(reg[5])
          qltao.chcd = chcd
          }else{
            e.reply('请以数字结尾')
            return true
         }
        }else if(reg[4] === '最大数量'){
          if(Number.isInteger(Number(reg[5]))){
          let maxnum = Number(reg[5])
          qltao.maxnum = maxnum
          }else{
            e.reply('请以数字结尾')
            return true
          }
        }else if(reg[4] === '黑名单群删除'||reg[4] === '黑名单群添加'){
          let blackgroup = qltao.blackgroup
          if(reg[4] === '黑名单群删除'){
            if(Number.isInteger(Number(reg[5]))){
              let index = blackgroup.indexOf(Number(reg[5]))
              if(index > -1){
                blackgroup.splice(index, 1)
                qltao.blackgroup = blackgroup
              }else{
                e.reply('黑名单群没有这个')
                return true
              }
            }else{
              e.reply('请以数字群号结尾')
              return true
            }
          }else if(reg[4] === '黑名单群添加'){
            if(Number.isInteger(Number(reg[5]))){
              blackgroup.push(Number(reg[5]))
              qltao.blackgroup = blackgroup
            }else{
              e.reply('请以数字群号结尾')
              return true
            }
          }
        }else if(reg[4] === '白名单群删除'||reg[4] === '白名单群添加'){
          let whitegroup = qltao.whitegroup
          if(reg[4] === '白名单群删除'){
            if(Number.isInteger(Number(reg[5]))){
              let index = whitegroup.indexOf(Number(reg[5]))
              if(index > -1){
                whitegroup.splice(index, 1)
                qltao.whitegroup = whitegroup
              }else{
                e.reply('白名单群没有这个')
                return true
              }
            }else{
              e.reply('请以数字群号结尾')
              return true
            }
          }else if(reg[4] === '白名单群添加'){
            if(Number.isInteger(Number(reg[5]))){
              whitegroup.push(Number(reg[5]))
              qltao.whitegroup = whitegroup
            }else{
              e.reply('请以数字群号结尾')
              return true
            }
          }
        }else if(reg[4] === '指令' ||reg[4] === '正则'){
          let regget = reg[5]
          qltao.reg = regget
        }else if(reg[4] === '源添加'||reg[4] === '源删除'){
          let urllist = qltao.url
          if (reg[4] === '源添加'){
            urllist.push(reg[5])
            qltao.url = urllist
          }else if (reg[4] === '源删除'){
            let index = whitegroup.indexOf(reg[5])
              if(index > -1){
                urllist.splice(index, 1)
                qltao.url = urllist
              }else{
                e.reply('源列表无此源')
              }
          }
        }
        fs.writeFileSync('./plugins/ql-plugin/config/qltao.yaml',YAML.stringify(qltao),'utf8')
        this.gqltao(e)
        return true
      }
      async setbtsearch(e){
        let btsearch = await YAML.parse(fs.readFileSync(`${Path}/plugins/ql-plugin/config/btsearch.yaml`, 'utf8'));
        let reg = new RegExp(setreg).exec(e.msg);
        if(reg[4] === '开启'||reg[4] === '关闭'){
          let isopen
          if(reg[4] === '开启'){
            isopen = true
          }else if(reg[4] === '关闭'){
            isopen = false
          }
          btsearch.IS_GROUPS = isopen
        }else if(reg[4] === '最大数量'){
          if(Number.isInteger(Number(reg[5]))){
          let maxnum = Number(reg[5])
          btsearch.BT_MAX_NUM = maxnum
          }else{
            e.reply('请以数字结尾')
            return true
          }
        }else if(reg[4] === '指令' ||reg[4] === '正则'){
          let regget = reg[5]
          btsearch.reg = regget
        }else if (reg[4] === '最大页数'){
          if(Number.isInteger(Number(reg[5]))){
            let pagemaxnum = Number(reg[5])
            btsearch.page_max_num = pagemaxnum
            }else{
              e.reply('请以数字结尾')
              return true
            }
        }
        fs.writeFileSync('./plugins/ql-plugin/config/btsearch.yaml',YAML.stringify(btsearch),'utf8')
        this.hbtsearch(e)
        return true
      }
      async setyize(e){
        let yize = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/yize.yaml', 'utf8'));
        let reg = new RegExp(setreg).exec(e.msg);
        if(reg[4] === '开启'||reg[4] === '关闭'){
          let isopen
          if(reg[4] === '开启'){
            isopen = true
          }else if(reg[4] === '关闭'){
            isopen = false
          }
          yize.isopen = isopen
        }else if(reg[4] === '仅主人生效开启'||reg[4] === '仅主人生效关闭'){
          let isMaster
          if(reg[4] === '仅主人生效开启'){
            isMaster = true
          }else if(reg[4] === '仅主人生效关闭'){
            isMaster = false
          }
          yize.isMaster = isMaster
        }else if(reg[4] === '触发间隔'){
          if(Number.isInteger(Number(reg[5]))){
          let getcd = Number(reg[5])
          yize.getcd = getcd
          }else{
            e.reply('请以数字结尾')
            return true
          }
        }else if(reg[4] === '撤回时间'){
          if(Number.isInteger(Number(reg[5]))){
          let chcd = Number(reg[5])
          yize.chcd = chcd
          }else{
            e.reply('请以数字结尾')
            return true
         }
        }else if(reg[4] === '最大数量'){
          if(Number.isInteger(Number(reg[5]))){
          let maxnum = Number(reg[5])
          yize.maxnum = maxnum
          }else{
            e.reply('请以数字结尾')
            return true
          }
        }else if(reg[4] === '黑名单群删除'||reg[4] === '黑名单群添加'){
          let blackgroup = yize.blackgroup
          if(reg[4] === '黑名单群删除'){
            if(Number.isInteger(Number(reg[5]))){
              let index = blackgroup.indexOf(Number(reg[5]))
              if(index > -1){
                blackgroup.splice(index, 1)
                yize.blackgroup = blackgroup
              }else{
                e.reply('黑名单群没有这个')
                return true
              }
            }else{
              e.reply('请以数字群号结尾')
              return true
            }
          }else if(reg[4] === '黑名单群添加'){
            if(Number.isInteger(Number(reg[5]))){
              blackgroup.push(Number(reg[5]))
              yize.blackgroup = blackgroup
            }else{
              e.reply('请以数字群号结尾')
              return true
            }
          }
        }else if(reg[4] === '白名单群删除'||reg[4] === '白名单群添加'){
          let whitegroup = yize.whitegroup
          if(reg[4] === '白名单群删除'){
            if(Number.isInteger(Number(reg[5]))){
              let index = whitegroup.indexOf(Number(reg[5]))
              if(index > -1){
                whitegroup.splice(index, 1)
                yize.whitegroup = whitegroup
              }else{
                e.reply('白名单群没有这个')
                return true
              }
            }else{
              e.reply('请以数字群号结尾')
              return true
            }
          }else if(reg[4] === '白名单群添加'){
            if(Number.isInteger(Number(reg[5]))){
              whitegroup.push(Number(reg[5]))
              yize.whitegroup = whitegroup
            }else{
              e.reply('请以数字群号结尾')
              return true
            }
          }
        }else if(reg[4] === '指令' ||reg[4] === '正则'){
          let regget = reg[5]
          yize.reg = regget
        }else if(reg[4] === '源添加'||reg[4] === '源删除'){
          let urllist = yize.url
          if (reg[4] === '源添加'){
            urllist.push(reg[5])
            yize.url = urllist
          }else if (reg[4] === '源删除'){
            let index = whitegroup.indexOf(reg[5])
              if(index > -1){
                urllist.splice(index, 1)
                yize.url = urllist
              }else{
                e.reply('源列表无此源')
              }
          }
        }
        fs.writeFileSync('./plugins/ql-plugin/config/yize.yaml',YAML.stringify(yize),'utf8')
        this.iyize(e)
        return true
      }
    
    async sethelp(e){
        let msg = []
        msg.push('修改指令为 #(Ql|qL|QL|ql|清凉|ql插件|Ql插件|qL插件|QL插件|清凉插件)(设置|更改)+功能名称+配置项+其他')
        msg.push('其中#可以省略 每个括号内任选其一即可 功能名称为触发指令，例如清秀图')
        msg.push('配置项为(开启|关闭|账号|密码|源添加|源删除|仅主人生效开启|仅主人生效关闭|触发间隔|撤回时间|最大数量|指令|正则|黑名单群添加|黑名单群删除|白名单群添加|白名单群删除|类型混合|类型全年龄|类型限制级|最大页数)')
        msg.push('若配置项为开启或关闭时无 其他')
        msg.push('仅清凉图含配置项类型混合或全年龄或限制级')
        msg.push('仅铯p图含配置项账号和密码，且账密错误或调用次数耗尽会报错')
        msg.push('仅bt含最大页数配置项，且bt仅含开启/关闭（且为群内开关）、最大数量、最大页数、正则/指令四个配置项')
        msg.push('黑/白名单群或者最大数量等为数字的配置项，指令中的 其他 为数字，请勿加单位，请以数字结尾，群一次只能执行一个')
        msg.push('修改正则、触发间隔需要重启才会生效，其他为热更新')
        msg.push('撤回时间单位为秒，触发间隔单位为毫秒')
        msg.push('例如 #清凉设置清秀图开启  #清凉更改清秀图撤回时间60  #ql设置铯p图账号xxxxxx')
        let dec = '点击查看清凉设置指令帮助'
        let Msg = await qlapi.makeForwardMsg(e, msg, dec)
        await e.reply(Msg)
        return true
   }
}

const rodom = async function () {
  let image = fs.readdirSync('./plugins/ql-plugin/resources/admin/imgs/bg')
  let listImg = []
  for (let val of image) {
    listImg.push(val)
  }
  let imgs = listImg.length == 1 ? listImg[0] : listImg[lodash.random(0, listImg.length - 1)]
  return imgs
}

const getStatus = function (rote) {
  if (rote) {
      return `<div class="cfg-status" >已开启</div>`;
  } else {
      return `<div class="cfg-status status-off">已关闭</div>`;
  }

}
const getStatuslx = function (rotes) {
  if (rotes = 0) {
      return `<div class="cfg-status" >全年龄</div>`;
  } else if(rotes = 1) {
      return `<div class="cfg-status" >限制级</div>`;
  }else if(rotes = 2) {
    return `<div class="cfg-status" >混合模式</div>`;
}
}
