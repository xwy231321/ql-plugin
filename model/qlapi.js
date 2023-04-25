import {
  createRequire
} from 'module'
import fs from 'fs'
import YAML from 'yaml'
import fetch from "node-fetch";

function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

/** 权限判断v1.0
* @param e oicq消息e
* @param set 已读取到的yaml配置信息
*/
export async function permissions(e, set) {
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

}

/**
* get方式获取一组图片并返回数组格式v1.0
* @param url 图片的URL，需要直接返回图片
* @param num 获取数量
* @param urlcd API获取间隔，单位ms
* @return msg 数组结果
*/
export async function geturl(url, urlcd, set, e) {
  let numa
  if (e.msg.match(/\d+/) === null) {
    numa = 1
  } else {
    numa = e.msg.match(/\d+/)
  }
  let num
  if (numa > set.maxnum) {
    num = set.maxnum; await e.reply('一次最多'+ set.maxnum +'张，不可以贪杯哦')} else {
    num = numa
  }
  let msg = []
  for (let i = 0; i < [num]; i++) {
    let image = [segment.image(url)]
    msg.push(image)
  }
  msg.push('from ql-plugin')
  await sleep(urlcd);
  return msg;
}

/**
* get方式获取一组图片并返回数组格式v1.1
* @param url 图片的URL，需要直接json,且url位于data.urls.original内
* @param num 获取数量
* @param urlcd API获取间隔，单位ms
* @return msg 数组结果
*/
export async function geturljson(url, urlcd, set, e) {
  let numa
  if (e.msg.match(/\d+/) === null) {
    numa = 1
  } else {
    numa = e.msg.match(/\d+/)
  }

  let num
  if (numa > set.maxnum) {
    num = set.maxnum; await e.reply('一次最多'+ set.maxnum +'张，不可以贪杯哦')} else {
    num = numa
  }

  let msg = []
  for (let i = 0; i < [num]; i++) {
    let res = await fetch(url);
    let obj = await res.json()
    let urls = obj.data[0].urls.original
    let image = [segment.image(urls)]
    msg.push(image)
    await sleep(urlcd);
  }
  msg.push('from ql-plugin')

  return msg;
}

/** 多url随机选择并加入数组v1.0
* @param e oicq消息e
* @param set 已读取到的yaml配置信息
* @param urls包含多url的数组
* @param num需要的数量
*/
export async function geturls(e, set) {
  var urls = set.url
  let numa
  if (e.msg.match(/\d+/) === null) {
    numa = 1
  } else {
    numa = e.msg.match(/\d+/)
  }
  let num
  if (numa > set.maxnum) {
    num = set.maxnum; await e.reply('一次最多'+ set.maxnum +'张，不可以贪杯哦')} else {
    num = numa
  }
  var MAX_INDEX = urls.length;
  var MAX_TIMES = num;
  var msg = [];
  var times = 0;
  while (msg.length < num) {
    if (times == MAX_TIMES) {
      break;
    }
    var url = urls[Math.floor(Math.random() * MAX_INDEX)];
    if (msg.includes(segment.image(url))) {
      while (msg.includes(segment.image(url))) {
        url = urls[Math.floor(Math.random() * MAX_INDEX)];
      }
    }
    msg.push(segment.image(url));
    times++;
  }
  msg.push('from ql-plugin')
  return msg;
}

/** 对url进行截屏(需要url返回图片)v1.0
* @param url 图片API
* @return aimage 截屏后图片（宽）
*/
export async function puppeteer(url) {
  const require = createRequire(import.meta.url)
  // const path=process.cwd()
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch( {
    headless: true,
    args: [
      '--disable-gpu',
      '--disable-setuid-sandbox',
      '--no-sandbox',
      '--no-zygote'
    ]
  });
  const page = await browser.newPage();
  await page.goto(url);
  await page.setViewport( {
    width: 1920,
    height: 1080
  });

  let aimage = await segment.image(await page.screenshot( {
    fullPage: true
  }))
  return aimage
  await browser.close();
}

/**
* 获取[min,max)范围内的随机数（内部方法）
* @param {*} min 随机数最小值
* @param {*} max 随机数最大值
*/
export async function random(min, max) {
  const range = max - min;
  const random = Math.random();
  const result = min + Math.round(random * range);
  return result;
}
/**
* 制作转发消息v1.1
* @param e oicq消息e
* @param msg 消息数组
* @param dec 转发描述
* @return forwardMsg 聊天记录
*/
export async function makeForwardMsg (e, msg = [], dec = '') {
  let nickname = Bot.nickname
  if (e.isGroup) {
    let info = await Bot.getGroupMemberInfo(e.group_id, Bot.uin)
    nickname = info.card || info.nickname
  }
  let userInfo = {
    nickname: Bot.nickname,
    user_id: Bot.uin,
    nickname
  }

  let forwardMsg = []
  msg.forEach(v => {
    forwardMsg.push({
      ...userInfo,
      message: v
    })
  })

  if (e.isGroup) {
    forwardMsg = await e.group.makeForwardMsg(forwardMsg)
  } else if (e.friend) {
    forwardMsg = await e.friend.makeForwardMsg(forwardMsg)
  } else {
    return false
  }

  if (dec) {
    forwardMsg.data = forwardMsg.data
    .replace('<?xml version="1.0" encoding="utf-8"?>', '<?xml version="1.0" encoding="utf-8" ?>')
    .replace(/\n/g, '')
    .replace(/<title color="#777777" size="26">(.+?)<\/title>/g, '___')
    .replace(/___+/, `<title color="#777777" size="26">${dec}</title>`)
  }

  return forwardMsg
}