import YAML from 'yaml'
import chokidar from 'chokidar'
import fs from 'node:fs'
import lodash from 'lodash'

const Path = process.cwd();
const Plugin_Name = 'ql-plugin'
const Plugin_Path = `${Path}/plugins/${Plugin_Name}`;

if(!Bot.ql_plugin) Bot.ql_plugin = {};

class Config {
	constructor () {
    this.config = {}
	
	Bot.ql_plugin['config'] = this.config;

    /** 监听文件 */
    this.watcher = {}

    this.ignore = []
  }

  /**
   * @param app  功能
   * @param name 配置文件名称
   */
  getdefSet (app, name) {
    return this.getYaml(app, name, 'defSet')
  }

  /** 用户配置 */
  getConfig (app, name) {
	return this.getYaml(app, name, 'config')
  }

  saveConfig (app, name, data) {
    return this.save(app, name, 'config',data)
  }

  /**
   * 获取配置yaml
   * @param app 功能
   * @param name 名称
   * @param type 默认跑配置-defSet，用户配置-config
   */
  getYaml (app, name, type) {
    let file = this.getFilePath(app, name, type)
    let key = `${app}.${name}`

    if (this.config[type][key]) return this.config[type][key]

    try {
      this.config[type][key] = YAML.parse(
        fs.readFileSync(file, 'utf8')
      )
    } catch (error) {
      logger.error(`[清凉插件][${app}][${name}] 格式错误 ${error}`)
      return false
    }

    this.watch(file, app, name, type)

    return this.config[type][key]
  }

  getFilePath (app, name, type) {
	  if(!this.config[type]){
		  this.config[type] = {};
	  }
	  
	  if(!this.watcher[type]){
		  this.watcher[type] = {};
	  }
	  
	  let config_path = `${Plugin_Path}/${type}/`;
	  let file = `${config_path}${app}.${name}.yaml`;
	  try{
		  if(!fs.existsSync(file)){
			  let default_file = `${config_path}default/${app}.${name}.yaml`;
			  fs.copyFileSync(default_file,file);
		  }
	  }catch(err){}
	  return file;
  }

  /** 监听配置文件 */
  watch (file, app, name, type = 'defSet') {
    let key = `${app}.${name}`

    if (this.watcher[type][key]) return

    const watcher = chokidar.watch(file)
    watcher.on('change', path => {
      delete this.config[type][key]
      logger.mark(`[清凉插件][修改配置文件][${type}][${app}][${name}]`)
      this.getYaml(app, name, type)//重新读取文件
      if (this[`change_${app}${name}`]) {
        this[`change_${app}${name}`]()
      }
    })

    this.watcher[type][key] = watcher
  }
  
  save (app, name, type, data) {
	let file = this.getFilePath(app, name, type)
    if (lodash.isEmpty(data)) {
      fs.existsSync(file) && fs.unlinkSync(file)
    } else {
      let yaml = YAML.stringify(data)
      fs.writeFileSync(file, yaml, 'utf8')
    }
  }
  
}
export default new Config()