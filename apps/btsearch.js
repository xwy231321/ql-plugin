import plugin from '../../../lib/plugins/plugin.js';
import axios from 'axios'
import cheerio from 'cheerio'
import fetch from "node-fetch";
import fs from 'fs'
import YAML from 'yaml'

let firstset = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/btsearch.yaml', 'utf8'));
let secondreg = "^#?"+firstset.reg+"(.*)$"
/* 
    免责声明
请注意，使用本代码的用户必须遵守所有适用的法律、规定和政策。本代码仅供参考和教育目的，不应用于任何商业或实际应用。使用本代码造成的任何损失或损害，开发者不承担任何责任。
本代码并不保证其完整性、准确性或可靠性。使用本代码所产生的结果，开发者不对其质量或效果作任何保证或承诺。用户应自行承担任何因使用本代码而导致的后果或风险。
请注意，使用本代码可能会涉及到第三方知识产权或其他权利。用户应确保他们拥有使用所有相关资料的合法权利，并遵守所有适用的法律、规定和政策。本代码开发者不对用户在此方面的行为承担任何责任。
最后，请注意本代码可能存在缺陷或错误，如有任何问题，请联系开发者进行修正。
感谢您的使用。
由于不会安装时自动安装依赖，故需要手动安装axios和cheerio这两个依赖，有哪位好心人知道的话指导指导，谢谢了
*/
export class btsearch extends plugin {
    constructor() {
        super({
            name: 'bt搜索',
            dsc: 'bt搜索',
            event: 'message',
            priority: 5000,
            rule: [
                {
                    reg: secondreg,
                    fnc: 'btSearch',
                }
            ]
        })
    }

    async btSearch(e) {
        let set = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/btsearch.yaml', 'utf8'));
        let IS_GROUPS = set.IS_GROUPS
        if (e.isGroup) {
            if (!IS_GROUPS) {
                e.reply('群聊搜索已关闭，请联系机主开通！')
                return
            }
        }
        logger.info('[用户命令]', e.msg)
        let keyword = e.msg.replace(/#?bt/g, "").trim()
        let urlget = 'https://gitee.com/xwy231321/ql-plugin/raw/master/config/bt.json'
        let r = await fetch(urlget);
        let obj = await r.json()
        let url = obj.url
                const response = await axios.get(`${url}/s/${keyword}_rel_1.html`, { timeout: 5000 });
                const text = response.data;
                const $ = cheerio.load(text);
        const href = $('ul.pagination > li:last-child > a').attr('href');
        const regex = /_rel_(\d+)\.html/;
        const result = regex.exec(href);
        let b = Number(result[1]);
        let reply = "共找到" + b + "页，当前设置单次最大至" + set.page_max_num + "页,正在依次发送,若中途报：没有搜索到，则为网络问题"
        await e.reply(reply)
        let getnum
        if(b > set.page_max_num){
        getnum = set.page_max_num
        }else{
        getnum = b
        }
       for (let i = 1; i < [getnum + 1]; i++) {
        let msgs = await getBtInfo(keyword, i)
        let userInfo = {
            nickname: this.e.sender.card || this.e.user_id,
            user_id: this.e.user_id,
        }
        let msgList = []
        for (let i = 0; i < msgs.length; i++) {
            msgList.push({ ...userInfo, message: msgs[i] })
        }
        if (!msgList.length) {
            await this.e.reply(`没有搜索到: ${keyword}`);
            return
        }
        const res = await this.e.reply(await Bot.makeForwardMsg(msgList), false, {
            recallMsg: -1,
        });
        /*
        if (!res) {
            if (!res) {
                if (this.e.group && this.e.group.is_admin) {
                    if (
                        Number(Math.random().toFixed(2)) * 100 <
                        this.mysterySetData.mute
                    ) {
                        let duration = Math.floor(Math.random() * 600) + 1;
                        this.e.group.muteMember(this.e.sender.user_id, duration);
                        await this.e.reply(
                            `不用等了，不用等了，搜索失败，请重试～～ 并随手将你禁锢${duration}秒`
                        );
                    } else {
                        this.reply(`不用等了，搜索失败，请重试～ `);
                    }
                } else {
                    this.reply(`不用等了，搜索失败，请重试～ `);
                }
            }
        }
        */
    }
    }
        
    }


async function getBtInfo(keyword, page) {
let urlget = 'https://gitee.com/xwy231321/ql-plugin/raw/master/config/bt.json'
let res = await fetch(urlget);
let obj = await res.json()

let url = obj.url
    try {
        const response = await axios.get(`${url}/s/${keyword}_rel_${page}.html`, { timeout: 5000 });
        const text = response.data;

        if (text.includes('大约0条结果')) {
            return [];
        }
        let set = await YAML.parse(fs.readFileSync('./plugins/ql-plugin/config/btsearch.yaml', 'utf8'));
        let BT_MAX_NUM = set.BT_MAX_NUM  

        const $ = cheerio.load(text);
        const itemLst = $('.search-item');
        const btMaxNum = BT_MAX_NUM;
        const maxResults = Math.min(btMaxNum, itemLst.length);

        let results = [];
        for (let i = 0; i < maxResults; i++) {
            let divs = $(itemLst[i]).find('div');

            let title = $(divs[0]).find('a').text().replace(/<em>|<\/em>/g, '').trim();
            let type_ = $(divs[2]).find('span').eq(0).text();
            let createTime = $(divs[2]).find('span b').eq(0).text();
            let fileSize = $(divs[2]).find('span b').eq(1).text();
            let link = await getDownloadLink($(divs[0]).find('a').attr('href'));

            results.push({ title, type_, createTime, fileSize, link });
        }

        let msgs = [];
        for (let i in results) {
            let msg =
                `标题：${results[i].title}
类型：${results[i].type_}
创建时间：${results[i].createTime}
文件大小：${results[i].fileSize}
种子：${results[i].link}`
            msgs.push(msg)
        }

        return msgs;
    } catch (err) {
        logger.error('请先安装cheerio：pnpm add cheerio -w')
        console.log(err);
        return [];
    }
}

async function getDownloadLink(_url) {
let urlget = 'https://gitee.com/xwy231321/ql-plugin/raw/master/config/bt.json'
let res = await fetch(urlget);
let obj = await res.json()

let url = obj.url
    try {
        const response = await axios.get(`${url}${_url}`, { timeout: 5000 });
        const html = response.data;
        const $ = cheerio.load(html);
        const link = $('a#down-url').attr('href');

        return link;
    } catch (err) {
        console.log(err);
        return '';
    }
}