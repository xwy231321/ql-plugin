/* 当前未完成 请勿使用，当然使用也没问题
*/ 

import fetch from "node-fetch";
import plugin from '../../../lib/plugins/plugin.js';
import fs from 'fs'
import YAML from 'yaml'
import * as qlauto from "../../ql-plugin/model/qlauto.js";
const Path = process.cwd();
const autouse = await YAML.parse(fs.readFileSync(`${Path}/plugins/ql-plugin/config/auto.yaml`, 'utf8'));

export class qlautoget extends plugin{
    constructor(){
        super({
            name:'qlautoget',
            dsc:'qlautoget',
            event:'message',
            priority: 500,
            rule:[
                {
                    reg:'^#?测试保存$',
                    fnc:'autoget'
                },
            ]
        })/*
        this.task = {
            cron: autouse.cron,
            name:'清凉图片自动保存',
            fnc: () => this.autoget(),
            log: false,
          };*/
    }

    async autoget(){
        var ql2f18 = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/ql2f18.yaml', 'utf8'));
        var ql2r18 = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/ql2r18.yaml', 'utf8'));
        var ql3f18 = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/ql3f18.yaml', 'utf8'));
        var mh = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/mh.yaml', 'utf8'));
        var qltao = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/qltao.yaml', 'utf8'));
        var yize = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/yize.yaml', 'utf8'));
        let auto = await YAML.parse(fs.readFileSync(`${Path}/plugins/ql-plugin/config/auto.yaml`, 'utf8'));
        if(auto.mh){
            await qlauto.getimage(mh.url, `mh`, auto.mhmax)
        }

        if(auto.p18){
            if(set.token === `替换成你的账号`||set.password === `替换成你的密码`){
                await e.reply(`请先联系QQ490593431或聊群996413740兑换账密，1块5000+送2000，共7000调用量`)
              }else{
                let usedurl = p18.url+`?token=`+set.token+`&password=`+set.password
                let res = await fetch(usedurl);
                let obj = await res.json()
                let urls = obj.data[0].urls.original
                await qlauto.getimage(urls, `p18`, auto.p18max)
              }
        }
        
        if(auto.ql2f18){
            let urls = ql2f18.url
            let urlnum = urls.length + 1
            let url = urls[Math.floor(Math.random() * urlnum)]
            await qlauto.getimage(url, `ql2f18`, auto.ql2f18max)
        
        }
        
        if(auto.ql2r18){
            let urls = ql2r18.url
            let urlnum = urls.length + 1
            let url = urls[Math.floor(Math.random() * urlnum)]
            await qlauto.getimage(url, `ql2r18`, auto.ql2r18max)
           
        }

        if(auto.ql3f18){
            let urls = ql3f18.url
            let urlnum = urls.length + 1
            let url = urls[Math.floor(Math.random() * urlnum)]
            await qlauto.getimage(url, `ql3f18`, auto.ql3f18max) 
            
        }

        if(auto.qltao){
            let urls = qltao.url
            let urlnum = urls.length + 1
            let url = urls[Math.floor(Math.random() * urlnum)]
            await qlauto.getimage(url, `qltao`, auto.qltaomax)
        }

        if(auto.yize){
             await qlauto.getimage(yize.url, `yize`, auto.yizemax)
            
        }

    

    }
    async add(e){
       
    }
}