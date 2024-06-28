import fs from 'fs/promises';
import path from 'path'
let is_icqq = false;
let is_oicq = false;
let loadedFilesCount = 0;
let loadedFilesCounterr = 0;
let apps;
const moduleCache = new Map();
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
logger.info('------（-＾〇＾-）-----')
logger.info('清凉插件初始化～')
logger.info('-----(/^▽^)/------')
let AppName = 'ql-plugin'
const startTime = Date.now();
const { apps: loadedApps, loadedFilesCount: count, loadedFilesCounterr: counterr } = await appsOut({ AppsName: 'apps' });
const endTime = Date.now();
apps = loadedApps;
loadedFilesCount = count;
loadedFilesCounterr = counterr;
logger.info(logger.yellow(`[${AppName}] 共加载了 ${loadedFilesCount} 个函数 ${loadedFilesCounterr} 个失败 耗时 ${endTime - startTime} 毫秒`))
export { apps };

async function appsOut({ AppsName }) {
  const firstName = path.join('plugins', AppName);
  const filepath = path.resolve(firstName, AppsName);
  let loadedFilesCount = 0;
  let loadedFilesCounterr = 0;
  const apps = {};

  try {
    const jsFilePaths = await traverseDirectory(filepath);
    await Promise.all(jsFilePaths.map(async (item) => {
      try {
        const allExport = moduleCache.has(item)
          ? moduleCache.get(item)
          : await import(`file://${item}`);

        for (const key of Object.keys(allExport)) {
          if (typeof allExport[key] === 'function' && allExport[key].prototype) {
            let className = key;
            if (Object.prototype.hasOwnProperty.call(apps, className)) {
              let counter = 1;
              while (Object.prototype.hasOwnProperty.call(apps, `${className}_${counter}`)) {
                counter++;
              }
              className = `${className}_${counter}`;
              logger.info(`[${AppName}] 同名导出 ${key} 重命名为 ${className} : ${item}`);
            }
            apps[className] = allExport[key];
            loadedFilesCount++;
          }
        }
      } catch (error) {
        logger.error(`[${AppName}] 加载 ${item} 文件失败: ${error.message}`);
        loadedFilesCounterr++;
      }
    }));
  } catch (error) {
    logger.error('读取插件目录失败:', error.message);
  }

  return { apps, loadedFilesCount, loadedFilesCounterr };
}


async function traverseDirectory(dir) {
  try {
    const files = await fs.readdir(dir, { withFileTypes: true });
    const jsFiles = [];
    for (const file of files) {
      const pathname = path.join(dir, file.name);
      if (file.isDirectory()) {
        jsFiles.push(...await traverseDirectory(pathname));
      } else if (file.isFile() && file.name.endsWith('.js')) {
        jsFiles.push(pathname);
      }
    }
    return jsFiles;
  } catch (error) {
    console.error('读取插件目录失败:', error.message);
    return [];
  }
}

