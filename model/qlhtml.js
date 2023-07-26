import lodash from 'lodash'
import {
  createRequire
} from 'module'
import { render } from '../components/index.js'
import * as qlapi from "../../ql-plugin/model/qlapi.js";
import fs from 'fs'
const Path = process.cwd();

function sleep(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

/**
* get方式获取一组图片并转换成html格式v1.1
* @param url 图片的URL，需要直接json,且url位于data.urls.original内
* @param set 已读取到的yaml配置信息
* @param urlcd API获取间隔，单位ms
* @param e oicq/icqq消息
* @return msg 结果
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
      msg.push(url)
    }

    await sleep(urlcd);
    return msg;
  }

/**
* get方式获取一组图片并转换成html格式v1.1
* @param url 图片的URL，需要直接json,且url位于data.urls.original内
* @param set 已读取到的yaml配置信息
* @param urlcd API获取间隔，单位ms
* @param e oicq/icqq消息
* @return msg 结果
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
      msg.push(urls)
      await sleep(urlcd);
    }

  
    return msg;
  }

/** 多url随机选择加入数组并转化成html格式v1.0
* @param e oicq消息e
* @param set 已读取到的yaml配置信息
* @param urls包含多url的数组
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
      msg.push(url);
      await sleep(1000)
      times++;
    }
    return msg;
  }

  export async function puppeteer(filepath ,url) {
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
     const imageDimensions = await page.evaluate(() => {
      const image = document.querySelector('img'); 
      return {
        width: image.clientWidth,
        height: image.clientHeight,
      };
    });
  
    await page.setViewport({
      width: imageDimensions.width,
      height: imageDimensions.height,
    });
  
  
    const screenshotBuffer = await page.screenshot({ fullPage: true });
    await browser.close();
    fs.writeFileSync(filepath, screenshotBuffer);
    
  }

/**
* 图片数组转html格式数组，并直接发送
* @param msg oicq/icqq中图片格式数组
* @param e oicq/icqq消息
* @param dec 功能名称
*/
export async function makehtml(e, msg, dec){
      let image = fs.readdirSync('./plugins/ql-plugin/resources/admin/imgs/bg')
      let listImg = []
      for (let val of image) {
        listImg.push(val)
      }
      let imgs = listImg.length == 1 ? listImg[0] : listImg[lodash.random(0, listImg.length - 1)]

      let urlnum = msg.length;
      let imagemsg = []
      let filename = []

      for (let i = 0; i < [urlnum]; i++) {
        let minnum = 1
        let maxnum = 99999
        let name = await qlapi.random(minnum,maxnum)
        let filepath = `${Path}/plugins/ql-plugin/data/image/${name}.jpg`;
        try{await puppeteer(filepath, msg[i])
        filename.push(name)
        }catch(error){let index = filename.indexOf(name); 
        if (index !== -1) {
          filename.splice(index, name);
        }
        }
        imagemsg.push(`<img class="image" src="`+filepath+`" alt="拉取失败">`)
      }

      let adata = {
        photo : imagemsg,
        name : dec
      }
  
      let res = await render('photo/photo', {
        ...adata,
        bg: imgs
      }, {
        e,
        scale: 1.4
      })
      if(res = false){
        await sleep(2000);
        await render('photo/photo', {
          ...adata,
          bg: imgs
        }, {
          e,
          scale: 1.4
        })
      }
      for (let a = 0; a < [urlnum]; a++) {
        let apath = filename[a]
      let filepath = `${Path}/plugins/ql-plugin/data/image/${apath}.jpg`;
      await fs.unlink(filepath, (err) => {
        if (err) {
          console.error(err);
          return;
        }
      })
      }
  }

export async function upload_image(file) {
    return (await Bot.pickFriend(Bot.uin)._preprocess(segment.image(file))).imgs[0];
}
