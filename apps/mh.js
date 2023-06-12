import fetch from "node-fetch";
import plugin from '../../../lib/plugins/plugin.js';
import fs from 'fs'
import YAML from 'yaml'
import * as qlapi from "../../ql-plugin/model/qlapi.js";

let firstset = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/mh.yaml', 'utf8'));
let secondreg = "^#?"+firstset.reg+"$"

export class mh extends plugin {
  constructor() {
    super({
      name: '图床随机图',
      dsc: 'mh',
      event: 'message',
      priority: 300,
      rule: [{
        reg: secondreg,
        fnc: 'mh'
      },
      ]
    });
  }
  async mh(e) {
    console.log('清凉插件(ql-plugin)触发了 清凉-' + firstset.reg)
    let set = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/mh.yaml', 'utf8'));
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
    await e.reply('我这去翻翻去', true, {
      recallMsg: 7
    })
    let msg = await qlapi.puppeteer(set.url)
    e.reply(msg,{ recallMsg: set.chcd})
    return true
  }
}