import fs from 'node:fs'

const files = fs.readdirSync('./plugins/ql-plugin/apps').filter(file => file.endsWith('.js'))

let ret = []

logger.info('------（-＾〇＾-）-----')
logger.info('清凉插件V2极速加载中～')
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
