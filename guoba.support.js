import setting from "./components/settings.js";
import lodash from "lodash";
const addGroupPromptProps = {
  content: '请输入群号：',
  placeholder: '请输入群号',
  okText: '添加',
  rules: [
    {required: true, message: '群号得填上才行哦~'},
    {pattern: '^\\d+$', message: '群号应该是纯数字的吧'},
    {min: 5, message: '真的有这么短的群号吗？'},
    {max: 10, message: '太…太长了……'},
  ],
}
export function supportGuoba () {
    return {
            pluginInfo: {
      name: '清凉插件',
      title: 'ql-plugin',
      author: '@xwy',
      authorLink: 'https://gitee.com/xwy231321',
      link: 'https://gitee.com/xwy231321/ql-plugin',
      isV3: true,
      isV2: false,
      description: '清凉图重构版',
      // 显示图标，此为个性化配置
      // 图标可在 https://icon-sets.iconify.design 这里进行搜索
      //icon: 'mdi:stove',
      // 图标颜色，例：#FF0000 或 rgb(255, 0, 0)
     // iconColor: '#d19f56',
      // 如果想要显示成图片，也可以填写图标路径（绝对路径）
    //  iconPath: path.join(_paths.pluginRoot, 'resources/images/icon.png'),
    },
        configInfo: {
            schemas: [
               {
                component: 'Divider',
                label: '清秀图-清凉淘宝秀',
              },{
                field: 'qltao.isopen',
                label: '功能开关',
                bottomHelpMessage: '是否开启',
                component: 'Switch'
            },{
                field: 'qltao.isMaster',
                label: '主人生效',
                bottomHelpMessage: '是否开启',
                component: 'Switch'
            },{
                field: 'qltao.maxnum',
                label: '单次极限数量',
                helpMessage: '修改后直接生效',
                bottomHelpMessage: '单次获取最大数量 默认10',
                component: 'InputNumber',
                required: true,
                componentProps: {
                  min: 1,
                  max: 50,
                  placeholder: '请输入数字',
                },
            },{
                field: 'qltao.getcd',
                label: '触发CD',
                helpMessage: '重启后生效',
                bottomHelpMessage: '为0则无间隔，单位毫秒，连续两次触发最短间隔（非全局）',
                component: 'InputNumber',
                required: true,
                componentProps: {
                  min: 0,
                  max: 99999999,
                  placeholder: '请输入数字',
                },
            },{
                field: 'qltao.chcd',
                label: '撤回CD',
                helpMessage: '修改后直接生效',
                bottomHelpMessage: '撤回CD，单位秒，为0不撤回，最大119',
                component: 'InputNumber',
                required: true,
                componentProps: {
                  min: 0,
                  max: 119,
                  placeholder: '请输入数字',
                },
            },{
          field: 'qltao.reg',
          label: '触发指令正则',
          bottomHelpMessage: '支持自行更换触发指令，支持不带#，支持多张如3张xx，重启生效',
          component: 'Input',
          required: true,
          componentProps: {
            placeholder: '请输入触发正则',
          },
        },{
          field: 'qltao.url',
          label: '请求地址',
          bottomHelpMessage: '支持自行更换，url返回图片格式',
          component: 'Input',
          required: true,
          componentProps: {
            placeholder: '请输入接口请求地址',
          },
        },{
          field: 'qltao.whitegroup',
          label: '白名单群',
          bottomHelpMessage: '白名单群，可以设置多个，当存在白名单群时黑名单群配置将失效',
          component: 'GTags',
          componentProps: {
            placeholder: '请输入白名单群',
            allowAdd: true,
            allowDel: true,
            showPrompt: true,
            promptProps: addGroupPromptProps,
            valueFormatter: ((value) => Number.parseInt(value)).toString(),
          },
        },
        {
          field: 'qltao.blackgroup',
          label: '黑名单群',
          bottomHelpMessage: '黑名单群，可以设置多个，当存在白名单群时，该配置失效',
          component: 'GTags',
          componentProps: {
            placeholder: '请输入黑名单群',
            allowAdd: true,
            allowDel: true,
            showPrompt: true,
            promptProps: addGroupPromptProps,
            valueFormatter: ((value) => Number.parseInt(value)).toString(),
          },
        },{
                component: 'Divider',
                label: '敬请期待',
              },
            
            ],
            getConfigData () {
                return setting.merge()
            },
            setConfigData (data, { Result }) {
                let config = {}
                for (let [keyPath, value] of Object.entries(data)) {
                    lodash.set(config, keyPath, value)
                }
                config = lodash.merge({}, setting.merge, config)
                setting.analysis(config)
                return Result.ok({}, '保存成功~')
            }
        }
    }
}