import fetch from "node-fetch";
import plugin from '../../../lib/plugins/plugin.js';
import fs from 'fs'
import YAML from 'yaml'
import * as qlapi from "../../ql-plugin/model/qlapi.js";
import * as qlhtml from "../../ql-plugin/model/qlhtml.js";

let firstset = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/p18.yaml', 'utf8'));
let secondreg = "^#?(\\d+张)?"+firstset.reg+"$"

export class qlp18 extends plugin {
  constructor() {
    super({
      name: '清凉p18图',
      dsc: 'qlp18',
      event: 'message',
      priority: 1,
      rule: [{
        reg: secondreg,
        fnc: 'qlp18'
      },
      ]
    });
  }
  async qlp18(e) {
    console.log('清凉插件(ql-plugin)触发了 清凉-' + firstset.reg)
    let set = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/p18.yaml', 'utf8'));
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
    if(set.token === `替换成你的账号`||set.password === `替换成你的密码`){
      await e.reply(`请先联系QQ1044945572兑换账密,账密错误或调用量耗尽会报错(开发者注:本插件仅提供该api的使用方式,不提供密钥等信息)`)
      return true
    }
    await e.reply('我这去翻翻去', false, {
      recallMsg: 7
    })
    let url = set.url+`?token=`+set.token+`&password=`+set.password
    let urlcd = 200

    let way = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/method.yaml', 'utf8'));
    if(way.showway === 0){
    let msg = await qlhtml.geturljson(url, urlcd, set, e)
    let dec = firstset.reg+'来啦'
    await qlhtml.makehtml(e, msg, dec)
  }else if(way.showway === 1){
    let msg = await qlapi.geturljson(url, urlcd, set, e)
    let dec = firstset.reg+'来啦'
    let Msg = await qlapi.makeForwardMsg(e, msg, dec)
    await e.reply(Msg, false, {
      recallMsg: set.chcd
    })
  }

    
    return true
  }
}