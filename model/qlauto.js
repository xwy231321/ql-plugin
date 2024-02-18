import fs from 'fs'
import YAML from 'yaml'
import fetch from "node-fetch";
import common from'../../../lib/common/common.js'
import * as qlapi from "./qlapi.js";
const Path = process.cwd();

//本文件目前并未使用，对其中逻辑并未做验证

/** 图片自动保存程序
* @param  url api
* @param  path 保存目录
* @param  maxnum 保存最大数量
*/
export async function getimage(intourl, path, maxnum) {
    const filePath = `${Path}/plugins/ql-plugin/data/${path}/${path}.yaml`
    fs.access(filePath, fs.constants.F_OK, (error) => {
        if (error) {
            let sourcePath = `${Path}/plugins/ql-plugin/data/set/${path}.yaml`
            let targetPath = `${Path}/plugins/ql-plugin/data/${path}/${path}.yaml`
            fs.copyFile(sourcePath, targetPath, (error) => {
                if (error) {
                  console.log('文件复制失败：', error);
                } else {
                  console.log('文件成功复制到目标目录。');
                }
              });
        }
      });
      await common.sleep(1500);
  let set = await YAML.parse(fs.readFileSync(`${Path}/plugins/ql-plugin/data/${path}/${path}.yaml`, 'utf8'));
  if (set.first - set.last >= maxnum) {
    return true;
  }
  let name = set.first + 1
  let url = intourl

  /*let image = await upload_image(url);
 if(image.md5){let md5 = (image.md5.toString('hex') || '').toUpperCase();
    var geturl = 'https://gchat.qpic.cn/gchatpic_new/0/0-0-'+md5+'/0';}*/

  fetch(url)
  .then(response => response.buffer())
  .then(buffer => {
  let filepath = `${Path}/plugins/ql-plugin/data/${path}/${name}.jpg`;
  fs.writeFile(filepath, buffer, (error) => {
    if (error) {
      console.error(path+'保存图片时出错:', error);
      return true;
    } else {
        fs.stat(`${Path}/plugins/ql-plugin/data/${path}/${name}.jpg`, (err, stats) => {
            if (err) {
              console.error(err);
              return;
            }
            if (stats.size === 0) {
              console.log(path+'失败');
            } else {
                set.first = name;
                fs.writeFileSync(`${Path}/plugins/ql-plugin/data/${path}/${path}.yaml`,YAML.stringify(set),'utf8')          
            }
          });
      
    }
  });
  })
  .catch(error => {
    console.error(path+'获取图片数据时出错:', error);
   //puppeteer(url, path, maxnum)
      return true;
    
  });

  }

/** 截屏且自动保存图片程序
 * @param intourl 访问的地址
 * @param path 保存的地址
 * @param maxnum 保存最大的数量
 * 
 */
export async function puppeteer(intourl, path, maxnum) {
    const filePath = `${Path}/plugins/ql-plugin/data/${path}/${path}.yaml`
    fs.access(filePath, fs.constants.F_OK, (error) => {
        if (error) {
            let sourcePath = `${Path}/plugins/ql-plugin/data/set/${path}.yaml`
            let targetPath = `${Path}/plugins/ql-plugin/data/${path}/${path}.yaml`
            fs.copyFile(sourcePath, targetPath, (error) => {
                if (error) {
                  console.log('文件复制失败：', error);
                  
                } else {
                  console.log('文件成功复制到目标目录。');
                }
              });
        }
      });
      await common.sleep(1500);
  let set = await YAML.parse(fs.readFileSync(`${Path}/plugins/ql-plugin/data/${path}/${path}.yaml`, 'utf8'));
  if (set.first - set.last >= maxnum) {
    return true;
  }
  let name = set.first + 1
  let aurl = intourl
  let image = qlapi.puppeteer(aurl)
  let filepath = `${Path}/plugins/ql-plugin/data/${path}/${name}.jpg`;
  let a = await fs.writeFile(filepath, image)
  if (a){
    set.first = name;
    fs.writeFileSync(`${Path}/plugins/ql-plugin/data/${path}/${path}.yaml`,YAML.stringify(set),'utf8')
  
  }
}

export async function upload_image(file) {
    return (await Bot.pickFriend(Bot.uin)._preprocess(segment.image(file))).imgs[0];
}