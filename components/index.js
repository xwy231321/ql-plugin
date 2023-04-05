const Path = process.cwd();
const Plugin_Name = 'ql-plugin'
const Plugin_Path = `${Path}/plugins/${Plugin_Name}`;
import Version from './Version.js'
import Data from './Data.js'
import render from './renderer.js';
export { render, Data, Version, Path, Plugin_Name, Plugin_Path }