export default {
  Button: [
    {
      param: 'type',
      type: 'string',
      desc: '按钮类型',
      option: 'default | primary | success | warning | danger',
      default: 'default',
      required: false
    },
    {
      param: 'size',
      type: 'string',
      desc: '按钮尺寸',
      option: 'small | medium | large',
      default: 'medium',
      required: false
    },
    {
      param: 'loading',
      type: 'boolean',
      desc: '是否加载中',
      option: 'true | false',
      default: 'false',
      required: false
    },
    {
      param: 'disabled',
      type: 'boolean',
      desc: '是否禁用',
      option: 'true | false',
      default: 'false',
      required: false
    },
    {
      param: 'onClick',
      type: 'function',
      desc: '点击事件回调',
      option: '(event) => void',
      default: '-',
      required: false
    },
  ]
};
