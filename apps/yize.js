import fetch from "node-fetch";
import plugin from '../../../lib/plugins/plugin.js';
import fs from 'fs'
import YAML from 'yaml'
import * as qlapi from "../../ql-plugin/model/qlapi.js";
import * as qlhtml from "../../ql-plugin/model/qlhtml.js";

let firstset = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/yize.yaml', 'utf8'));
let secondreg = "^#?(\\d+张)?"+firstset.reg+"$"

export class yize extends plugin {
  constructor() {
    super({
      name: '绎泽随机图',
      dsc: 'yize',
      event: 'message',
      priority: 300,
      rule: [{
        reg: secondreg,
        fnc: 'yize'
      },
      ]
    });
  }
  async yize(e) {
    console.log('清凉插件(ql-plugin)触发了 清凉-' + firstset.reg)
    let set = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/yize.yaml', 'utf8'));
    let isopen = set.isopen
    let cdtime = firstset.getcd
    if (!isopen) {
      return false
    } else {
      isopen = false;
      setTimeout(async () => {
        isopen = true;
      }, cdtime);
    }
    let ismaster = set.isMaster
    if (ismaster) {
      if (!e.isMaster) return false
    }
    if (e.isGroup) {
      if (set.whitegroup === null) {
        if (set.blackgroup.includes(e.group_id)) return e.reply("当前群未开启哦~", true);
      } else if (set.whitegroup.length === 0) {
        if (set.blackgroup.includes(e.group_id)) return e.reply("当前群未开启哦~", true);
      } else {
        let openGroup = set.whitegroup
        if (!openGroup.includes(e.group_id)) return e.reply("当前群未开启哦~", true);
      }
    }
    await e.reply('我这去翻翻去', false, {
      recallMsg: 7
    })

    let way = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/method.yaml', 'utf8'));
    if(way.showway === 0){
    let msg = await qlhtml.geturl(set.url, set.getcd, set, e)
    let dec = firstset.reg+'来啦'
    await qlhtml.makehtml(e, msg, dec)
  }else if(way.showway === 1){
    let msg = await qlapi.geturl(set.url, set.getcd, set, e)
    let dec = firstset.reg+'来啦'
    let Msg = await qlapi.makeForwardMsg(e, msg, dec)
    await e.reply(Msg, false, {
      recallMsg: set.chcd
    })
  }

  
    return true
  }
}