import fetch from "node-fetch";
import plugin from '../../../lib/plugins/plugin.js';
import common from'../../../lib/common/common.js'
import co from "../../../lib/common/common.js";
import fs from 'fs'
import YAML from 'yaml'

let firstset = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/qltao.yaml','utf8'));
let secondreg = "^#?(\\d+张)?"+firstset.reg+"$"

export class qltao extends plugin { 
    constructor() { 
        super({
            name: '清凉淘宝秀',
            dsc: 'qltao',
            event: 'message',
            priority: 300,
            rule: [
             {
                    reg: secondreg, 
                    fnc: 'qltao'
                },
     
            ]
        });
        }
        async qltao(e) {
            console.log('\x1B[31m%s\x1B[0m', '清凉插件(ql-plugin)触发了 清凉-淘宝秀')
            let set = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/qltao.yaml','utf8'));
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
            if(!e.isMaster) return false
            }
            if (e.isGroup) {
                if (set.whitegroup === null) {
                     if (set.blackgroup.includes(e.group_id)) return e.reply("当前群未开启哦~", true);
                 }else if (set.whitegroup.length === 0 ){
                     if (set.blackgroup.includes(e.group_id)) return e.reply("当前群未开启哦~", true);
                 }else{
                     let openGroup = set.whitegroup
                      if (!openGroup.includes(e.group_id)) return e.reply("当前群未开启哦~", true);
                 }
            }
            await e.reply('我这去翻翻去',true,{recallMsg:7})
            let numa 
            if(e.msg.match(/\d+/) === null){
                numa = 1
            }else{
                numa = e.msg.match(/\d+/)
            }
            
            let num
            if (numa > set.maxnum) {num = set.maxnum;await e.reply('一次最多'+ set.maxnum +'张，不可以贪杯哦')}else {num = numa }
            
            let msg = []
            for (let i = 0; i < [num]; i++) {
            let image = [await segment.image(set.url)]
             msg.push(image)
             await common.sleep(2000);
             }
            msg.push('from ql-plugin')
            await e.reply(num > 0 ? await co.makeForwardMsg(e,msg,'来啦') : image,false,{ recallMsg:set.chcd });
         return true
            
            }
}