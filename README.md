<div align="center">
<h1>清凉插件(ql-plugin)</h1>

<a href="https://www.murphysec.com/console/report/1671125207802994688/1671125207849132032" alt="Security Status"><img src="https://www.murphysec.com/platform3/v31/badge/1671125207849132032.svg" /></a>

[![Gitee](https://img.shields.io/badge/Gitee-清凉插件-black?style=flat-square&logo=gitee)](https://gitee.com/xwy231321/ql-plugin) [![云崽bot](https://img.shields.io/badge/云崽-v3.0.0-black?style=flat-square&logo=dependabot)](https://gitee.com/Le-niao/Yunzai-Bot) [![Group](https://img.shields.io/badge/群号-597427372-red?style=flat-square&logo=GroupMe&logoColor=white)](https://jq.qq.com/?_wv=1027&k=rPN5Kmfx)<a href='https://gitee.com/xwy231321/ql-plugin/stargazers'><img src='https://gitee.com/xwy231321/ql-plugin/badge/star.svg?theme=dark' alt='star'></img></a>

[![访问量](https://profile-counter.glitch.me/ql-plugin/count.svg)](https://gitee.com/xwy231321/ql-plugin)


## 安装教程

Yunzai-Bot目录下执行

```
git clone https://gitee.com/xwy231321/ql-plugin.git ./plugins/ql-plugin/

```
```
git clone https://github.com/xwy231321/ql-plugin.git ./plugins/ql-plugin/

```

### 请手动安装axios和cheerio，下面是从别的作者那看到的安装依赖的方法，一共3种，本人并不知道依赖应该如何安装，请自行辨别
```
pnpm install -P
```
```
pnpm i
```
```
pnpm install --filter=ql-plugin
```


| 食用方法 | 更新方法 | 查看设置帮助 | 查看版本 |
| :------: | :------: | :----: | :---: |
| #清凉帮助 | #清凉更新 | #清凉修改设置帮助 | #清凉版本 |



## 插件功能 [V2.0.4](./CHANGELOG.md)


| 年.龄.限制 | 无 | | |
|----|---------|-----|-----|
| 名称 | 默认单次最大数量 | 默认开启状态 | 重构进度 |
| 清凉图 | 10 | 开启(可设置分级) | 90% |
| 二元图 | 10 | 开启 | 90% |
| 三元图 | 10 | 开启 | 90% |
| 404 | 10 | 开启 | 0% |
| 清秀图 | 10 | 开启 | new |
| bt搜索(须手动安装axios和cheerio依赖) |  | 开启(群聊可关) | new |
| 图床随机图 | 10 | 开启 | new |


| 年.龄.限制 | 18及以上 | | |
|---|---|---|---|
| 名称 | 默认单次最大数量 | 默认开启状态 | 重构进度 |
| 三铯图 | 10 | 关闭 | 0% |
| 原神cos图 | 10 | 关闭 | 0% |
| p18图 | 10 | 开启 | 90% |
| 铯图 | 10 | 开启 | 90% |
| 绎泽随机图 | 10 | 开启 | new |

| 其他功能 | | | |
|--|--|--|---|
| 功能名称 | 默认状态 | 备注 | 重构进度 |
| 消息风控处理 | 开启 | 自动处理发送失败的消息 | × |
| 仓库动态检测 | 关闭 | gitee/github仓库日志检测发送，需手动添加地址 | × |

| 饼 | 介绍 |
|----|-----|
| 定时缓存 | 定时从api里拉去部分图片缓存到本地，等触发指令时优先使用已缓存图片 |
| 自动保存 | 获取过的图片自动保存至本地 |
| api检测 | 定时自动检测api是否可用 |
| token验证 | 三铯图 原神cos图token本地、云端验证 |


#### 反馈

QQ：2060403379（准大一小白）

Q群：[597427372](https://jq.qq.com/?_wv=1027&k=rPN5Kmfx)（交流.外群）

爱发电：[点我前往爱发电页面](https://afdian.net/a/xwy231321/plan)

如果可以的话，给本项目个star，来支持本项目，您的支持就是给我的最大的鼓励，谢谢。

<details><summary>赞助与支持</summary>

由于插件性质特殊，内群**分享交流**只提供给开发者/赞助商等有贡献人士，在此也感谢大家一路的支持

#### 支持与赞助

鸣谢（排名不分先后）

| 名单  | 主要贡献      |
|-----|-----------|
| 小飞  | 消息风控处理等   |
| 星念  | 仓库动态检测 |
| Parker Liang  | 图库支持 |
| 绎泽  | 图床支持 |

#### 赞助

**赞助方式请联系作者**


#### 推荐修改配置使用：

蓝奏云：[☞Windows](https://xwy2.lanzouf.com/ipg2u0im7ybi)/[☞Android](https://xwy2.lanzouf.com/iABUt0im7y8f)密码；1234，蓝奏云无法打开自行百度解决办法

gitee仓库：[☞Windows](https://gitee.com/xwy231321/cv-plugins-in-resources/blob/master/PC%E7%AB%AF%E4%BA%91%E5%B4%BDjs%E6%8F%92%E4%BB%B6%E7%BC%96%E8%BE%91%E5%99%A8.rar)/[☞Android](https://gitee.com/xwy231321/cv-plugins-in-resources/blob/master/NMM_1.12.6.apk)

注：软件源于网络

</details>

# 免责声明

1) 功能仅限内部交流与小范围使用，请勿将ql-plugin及yunzai-c-v-plugin用于以盈利为目的的场景

2) 本插件仅供交流学习使用，如有侵权请联系，会立即删除

3) 使用本插件造成的一切损失，以及不良影响，由使用者承担



Yunzai-Bot插件库：[☞Github](https://github.com/yhArcadia/Yunzai-Bot-plugins-index)/[☞Gitee](https://gitee.com/yhArcadia/Yunzai-Bot-plugins-index)

Yunzai-Bot（V3）：[☞Github](https://github.com/Le-niao/Yunzai-Bot)/[☞Gitee](https://gitee.com/Le-niao/Yunzai-Bot) 

Yunzai-Bot（V2）：[☞Github](https://github.com/yoimiya-kokomi/Yunzai-Bot)/[☞Gitee](https://gitee.com/yoimiya-kokomi/Yunzai-Bot) 

ql-plugin：[☞Gitee](https://gitee.com/xwy231321/ql-plugin)/[☞Github](https://github.com/xwy231321/ql-plugin)


</div>