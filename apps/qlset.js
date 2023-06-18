import plugin from '../../../lib/plugins/plugin.js'
import lodash from 'lodash'
import { render , Data } from '../components/index.js'
import fs from 'fs'
import YAML from 'yaml'
import * as qlapi from "../../ql-plugin/model/qlapi.js";

var ql2f18 = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/ql2f18.yaml', 'utf8'));
var ql2frql = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/ql2frql.yaml', 'utf8'));
var ql2r18 = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/ql2r18.yaml', 'utf8'));
var ql3f18 = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/ql3f18.yaml', 'utf8'));
var mh = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/mh.yaml', 'utf8'));
var p18 = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/p18.yaml', 'utf8'));
var qltao = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/qltao.yaml', 'utf8'));
var btsearch = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/btsearch.yaml', 'utf8'));

let setreg = '^#?(Ql|qL|QL|ql|清凉|ql插件|Ql插件|qL插件|QL插件|清凉插件)(设置|更改)(.*)(开启|关闭|源添加|源删除|仅主人生效开启|仅主人生效关闭|触发间隔|撤回时间|最大数量|指令|正则|黑名单群添加|黑名单群删除|白名单群添加|白名单群删除|类型混合|类型全年龄|类型限制级|最大页数)(.*)$'
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
            reg: '^#?(Ql|qL|QL|ql|清凉|ql插件|Ql插件|qL插件|QL插件|清凉插件)(设置|更改)('+p18.reg+')(开启|关闭|源添加|源删除|仅主人生效开启|仅主人生效关闭|触发间隔|撤回时间|最大数量|指令|正则|黑名单群添加|黑名单群删除|白名单群添加|白名单群删除|类型混合|类型全年龄|类型限制级|最大页数)(.*)$',
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
            reg: '^#?(Ql|qL|QL|ql|清凉|ql插件|Ql插件|qL插件|QL插件|清凉插件)修改设置(帮助|help|指令|菜单|命令)$',
            fnc: 'sethelp',
            permission: "master",
          }
        ]
      });
    }
    async setql2frql(e) {
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
        e.reply('已执行')
        return true
      
    }
    async setql2f18(e){
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
        e.reply('已执行')
        return true
      }

      async setql2r18(e){
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
        e.reply('已执行')
        return true
      }
      async setql3f18(e){
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
        e.reply('已执行')
        return true
      }
      async setmh(e){
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
        e.reply('已执行')
        return true
      }
      async setp18(e){
        let reg = new RegExp(setreg).exec(e.msg);
        if(reg[4] === '开启'||reg[4] === '关闭'){
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
        e.reply('已执行')
        return true
      }
      async setqltao(e){
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
        e.reply('已执行')
        return true
      }
      async setbtsearch(e){
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
        e.reply('已执行')
        return true
      }
    
    async sethelp(e){
        let msg = []
        msg.push('修改指令为 #(Ql|qL|QL|ql|清凉|ql插件|Ql插件|qL插件|QL插件|清凉插件)(设置|更改)+功能名称+配置项+其他')
        msg.push('其中#可以省略 每个括号内任选其一即可 功能名称为触发指令，例如清秀图')
        msg.push('配置项为(开启|关闭|源添加|源删除|仅主人生效开启|仅主人生效关闭|触发间隔|撤回时间|最大数量|指令|正则|黑名单群添加|黑名单群删除|白名单群添加|白名单群删除|类型混合|类型全年龄|类型限制级|最大页数)')
        msg.push('若配置项为开启或关闭时无 其他')
        msg.push('仅清凉图含配置项类型混合或全年龄或限制级')
        msg.push('仅bt含最大页数配置项，且bt仅含开启/关闭（且为群内开关）、最大数量、最大页数、正则/指令四个配置项')
        msg.push('黑/白名单群或者最大数量等为数字的配置项，指令中的 其他 为数字，请勿加单位，请以数字结尾，群一次只能执行一个')
        msg.push('撤回时间单位为秒，触发间隔单位为毫秒')
        msg.push('例如 #清凉设置清秀图开启  #清凉设置清秀图撤回时间60')
        let dec = '点击查看清凉设置指令帮助'
        let Msg = await qlapi.makeForwardMsg(e, msg, dec)
        await e.reply(Msg)
        return true
   }
}
