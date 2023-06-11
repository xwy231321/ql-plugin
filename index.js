import fs from 'node:fs'

let is_icqq = false;
let is_oicq = false;

try {
  let icqq = await import("icqq");
  if (icqq) is_icqq = true;
} catch (err) {
  try {
    let oicq = await import("oicq");
    if (oicq) is_oicq = true;
  } catch (err) { }
}

if (!global.segment) {
    global.segment = (await import("oicq")).segment
}


const files = fs.readdirSync('./plugins/ql-plugin/apps').filter(file => file.endsWith('.js'))

let ret = []

logger.info('------（-＾〇＾-）-----')
logger.info('清凉插件初始化～')
logger.info('V2当前重构进度：0.10%')
logger.info('-----(/^▽^)/------')


files.forEach((file) => {
  ret.push(import(`./apps/${file}`))
})

ret = await Promise.allSettled(ret)

let apps = {}
for (let i in files) {
  let name = files[i].replace('.js', '')

  if (ret[i].status != 'fulfilled') {
    logger.error(`载入插件错误：${logger.red(name)}`)
    logger.error(ret[i].reason)
    continue
  }
  apps[name] = ret[i].value[Object.keys(ret[i].value)[0]]
}
export { apps }
