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
            
        configInfo: {
            schemas: [
               {
                component: 'Divider',
                label: '猜角色',
              },{
                field: 'guess.maxtime',
                label: '猜角色等待时间',
                helpMessage: '修改后直接生效',
                bottomHelpMessage: '单位秒',
                component: 'InputNumber',
                required: true,
                componentProps: {
                  min: 0,
                  max: 99999999,
                  placeholder: '请输入数字',
                },
            },{
                component: 'Divider',
                label: '出图方式',
              },{
                field: 'method.showway',
                label: '图片发送方式',
                helpMessage: '修改后直接生效',
                bottomHelpMessage: '0-浏览器渲染 1-聊天记录 默认1',
                component: 'InputNumber',
                required: true,
                componentProps: {
                  min: 0,
                  max: 1,
                  placeholder: '请输入数字',
                },
            },{
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
        },

        {
                component: 'Divider',
                label: '铯p图',
              },{
                field: 'p18.isopen',
                label: '功能开关',
                bottomHelpMessage: '是否开启',
                component: 'Switch'
            },{
                field: 'p18.isMaster',
                label: '主人生效',
                bottomHelpMessage: '是否开启',
                component: 'Switch'
            },{
              field: 'p18.token',
              label: '您的账号',
              bottomHelpMessage: '联系QQ490593431或聊群996413740兑换账密，1块5000+送2000，共7000调用量',
              component: 'Input',
              required: true,
              componentProps: {
                placeholder: '请输入您的账号',
              },
              },{
                field: 'p18.password',
                label: '您的密码',
                bottomHelpMessage: '联系QQ490593431或聊群996413740兑换账密，1块5000+送2000，共7000调用量',
                component: 'Input',
                required: true,
                componentProps: {
                  placeholder: '请输入您的密码',
                },
              },{
                field: 'p18.maxnum',
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
                field: 'p18.getcd',
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
                field: 'p18.chcd',
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
          field: 'p18.reg',
          label: '触发指令正则',
          bottomHelpMessage: '支持自行更换触发指令，支持不带#，支持多张如3张xx，重启生效',
          component: 'Input',
          required: true,
          componentProps: {
            placeholder: '请输入触发正则',
          },
             },{
          field: 'p18.url',
          label: '请求地址',
          bottomHelpMessage: '支持自行更换，url返回图片格式',
          component: 'Input',
          required: true,
          componentProps: {
            placeholder: '请输入接口请求地址',
          },
        },{
          field: 'p18.whitegroup',
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
          field: 'p18.blackgroup',
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
        }, {
          component: 'Divider',
          label: '图床随机图',
        },{
          field: 'mh.isopen',
          label: '功能开关',
          bottomHelpMessage: '是否开启',
          component: 'Switch'
      },{
          field: 'mh.isMaster',
          label: '主人生效',
          bottomHelpMessage: '是否开启',
          component: 'Switch'
      },{
        field: 'mh.maxnum',
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
          field: 'mh.getcd',
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
          field: 'mh.chcd',
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
    field: 'mh.reg',
    label: '触发指令正则',
    bottomHelpMessage: '支持自行更换触发指令，支持不带#，仅支持单次一张，重启生效',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入触发正则',
    },
  },{
    field: 'mh.url',
    label: '请求地址',
    bottomHelpMessage: '支持自行更换，url返回图片格式',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入接口请求地址',
    },
  },{
    field: 'mh.whitegroup',
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
    field: 'mh.blackgroup',
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
    label: '绎泽随机图',
  },{
    field: 'yize.isopen',
    label: '功能开关',
    bottomHelpMessage: '是否开启',
    component: 'Switch'
},{
    field: 'yize.isMaster',
    label: '主人生效',
    bottomHelpMessage: '是否开启',
    component: 'Switch'
},{
  field: 'yize.maxnum',
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
    field: 'yize.getcd',
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
    field: 'yize.chcd',
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
field: 'yize.reg',
label: '触发指令正则',
bottomHelpMessage: '支持自行更换触发指令，支持不带#，仅支持单次一张，重启生效',
component: 'Input',
required: true,
componentProps: {
placeholder: '请输入触发正则',
},
},{
field: 'yize.url',
label: '请求地址',
bottomHelpMessage: '支持自行更换，url返回图片格式',
component: 'Input',
required: true,
componentProps: {
placeholder: '请输入接口请求地址',
},
},{
field: 'yize.whitegroup',
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
field: 'yize.blackgroup',
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
          label: 'bt搜索',
        },{
          field: 'btsearch.IS_GROUPS',
          label: '群聊开关',
          bottomHelpMessage: '是否开启',
          component: 'Switch'
      },{
          field: 'btsearch.BT_MAX_NUM',
          label: '单次获取极限数量低于10且页数最大为1生效，否则请定义高于10',
          helpMessage: '修改后直接生效',
          bottomHelpMessage: '单次获取最大数量 默认3',
          component: 'InputNumber',
          required: true,
          componentProps: {
            min: 1,
            max: 100,
            placeholder: '请输入数字',
          },
      },{
        field: 'btsearch.page_max_num',
        label: '单次获取页数极限数量',
        helpMessage: '修改后直接生效',
        bottomHelpMessage: '单次获取最大数量 默认3',
        component: 'InputNumber',
        required: true,
        componentProps: {
          min: 1,
          max: 100000000000,
          placeholder: '请输入数字',
        },
    },{
      field: 'btsearch.reg',
      label: '触发指令正则',
      bottomHelpMessage: '支持自行更换触发指令，支持不带#，重启生效',
      component: 'Input',
      required: true,
      componentProps: {
        placeholder: '请输入触发正则',
      },
    },{
        component: 'Divider',
        label: '清凉图',
      },{
        field: 'ql2frql.isopen',
        label: '功能开关',
        bottomHelpMessage: '是否开启',
        component: 'Switch'
      },{
        field: 'ql2frql.isMaster',
        label: '主人生效',
        bottomHelpMessage: '是否开启',
        component: 'Switch'
       },{
         field: 'ql2frql.lx',
         label: '图片类型',
         helpMessage: '修改后直接生效',
         bottomHelpMessage: '0为非18,1为18,2为混合模式',
         component: 'InputNumber',
         required: true,
         componentProps: {
         min: 0,
         max: 2,
         placeholder: '请输入数字',
         },
       },{
         field: 'ql2frql.maxnum',
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
        field: 'ql2frql.getcd',
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
         field: 'ql2frql.chcd',
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
          field: 'ql2frql.reg',
          label: '触发指令正则',
          bottomHelpMessage: '支持自行更换触发指令，支持不带#，支持多张如3张xx，重启生效',
          component: 'Input',
         required: true,
         componentProps: {
          placeholder: '请输入触发正则',
          },
         },{
         field: 'ql2frql.url',
         label: '请求地址',
         bottomHelpMessage: '支持自行更换，url返回图片格式',
         component: 'Input',
         required: true,
         componentProps: {
         placeholder: '请输入接口请求地址',
         },
        },{
          field: 'ql2frql.whitegroup',
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
         }, {
    field: 'ql2frql.blackgroup',
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
          label: '铯图',
        },{
          field: 'ql2r18.isopen',
          label: '功能开关',
          bottomHelpMessage: '是否开启',
          component: 'Switch'
      },{
          field: 'ql2r18.isMaster',
          label: '主人生效',
          bottomHelpMessage: '是否开启',
          component: 'Switch'
      },{
          field: 'ql2r18.maxnum',
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
          field: 'ql2r18.getcd',
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
          field: 'ql2r18.chcd',
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
    field: 'ql2r18.reg',
    label: '触发指令正则',
    bottomHelpMessage: '支持自行更换触发指令，支持不带#，支持多张如3张xx，重启生效',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入触发正则',
    },
  },{
    field: 'ql2r18.url',
    label: '请求地址',
    bottomHelpMessage: '支持自行更换，url返回图片格式',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入接口请求地址',
    },
  },{
    field: 'ql2r18.whitegroup',
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
    field: 'ql2r18.blackgroup',
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
                label: '二元图',
              },{
                field: 'ql2f18.isopen',
                label: '功能开关',
                bottomHelpMessage: '是否开启',
                component: 'Switch'
            },{
                field: 'ql2f18.isMaster',
                label: '主人生效',
                bottomHelpMessage: '是否开启',
                component: 'Switch'
            },{
                field: 'ql2f18.maxnum',
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
                field: 'ql2f18.getcd',
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
                field: 'ql2f18.chcd',
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
          field: 'ql2f18.reg',
          label: '触发指令正则',
          bottomHelpMessage: '支持自行更换触发指令，支持不带#，支持多张如3张xx，重启生效',
          component: 'Input',
          required: true,
          componentProps: {
            placeholder: '请输入触发正则',
          },
        },{
          field: 'ql2f18.url',
          label: '请求地址',
          bottomHelpMessage: '支持自行更换，url返回图片格式',
          component: 'Input',
          required: true,
          componentProps: {
            placeholder: '请输入接口请求地址',
          },
        },{
          field: 'ql2f18.whitegroup',
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
        }, {
          field: 'ql2f18.blackgroup',
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
          label: '三元图',
        },{
          field: 'ql3f18.isopen',
          label: '功能开关',
          bottomHelpMessage: '是否开启',
          component: 'Switch'
      },{
          field: 'ql3f18.isMaster',
          label: '主人生效',
          bottomHelpMessage: '是否开启',
          component: 'Switch'
      },{
          field: 'ql3f18.maxnum',
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
          field: 'ql3f18.getcd',
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
          field: 'ql3f18.chcd',
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
    field: 'ql3f18.reg',
    label: '触发指令正则',
    bottomHelpMessage: '支持自行更换触发指令，支持不带#，支持多张如3张xx，重启生效',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入触发正则',
    },
  },{
    field: 'ql3f18.url',
    label: '请求地址',
    bottomHelpMessage: '支持自行更换，url返回图片格式',
    component: 'Input',
    required: true,
    componentProps: {
      placeholder: '请输入接口请求地址',
    },
  },{
    field: 'ql3f18.whitegroup',
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
    field: 'ql3f18.blackgroup',
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