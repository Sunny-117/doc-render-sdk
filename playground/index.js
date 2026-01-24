import DocSDK from 'doc-render-sdk';

// Button 组件 demos
import buttonBasic from './components/button/demo/basic.jsx';
import buttonSizes from './components/button/demo/sizes.jsx';
import buttonLoading from './components/button/demo/loading.jsx';

// Input 组件 demos
import inputBasic from './components/input/demo/basic.jsx';
import inputValidation from './components/input/demo/validation.jsx';

// Card 组件 demos
import cardBasic from './components/card/demo/basic.jsx';
import cardInteractive from './components/card/demo/interactive.jsx';

// Table 组件 demos
import tableBasic from './components/table/demo/basic.jsx';

// Form 组件 demos
import formComplete from './components/form/demo/complete.jsx';

// Chart 组件 demos
import chartBar from './components/chart/demo/bar.jsx';

// Modal 组件 demos
import modalBasic from './components/modal/demo/basic.jsx';

// 注册全局组件
window.__DOC_SDK_DEMOS__ = {
  'button': {
    'basic': buttonBasic,
    'sizes': buttonSizes,
    'loading': buttonLoading,
  },
  'input': {
    'basic': inputBasic,
    'validation': inputValidation,
  },
  'card': {
    'basic': cardBasic,
    'interactive': cardInteractive,
  },
  'table': {
    'basic': tableBasic,
  },
  'form': {
    'complete': formComplete,
  },
  'chart': {
    'bar': chartBar,
  },
  'modal': {
    'basic': modalBasic,
  },
};

// Demo 源码将由 vite-plugin-demo-code 自动注入
// 不再需要手动维护 window.__DOC_SDK_DEMO_CODES__

// 注册 API 文档
window.__DOC_SDK_APIS__ = {
  'button': {
    'Button': [
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
  },
  'input': {
    'Input': [
      {
        param: 'value',
        type: 'string',
        desc: '输入框的值',
        option: '-',
        default: '-',
        required: false
      },
      {
        param: 'placeholder',
        type: 'string',
        desc: '占位文本',
        option: '-',
        default: '-',
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
        param: 'readOnly',
        type: 'boolean',
        desc: '是否只读',
        option: 'true | false',
        default: 'false',
        required: false
      },
      {
        param: 'onChange',
        type: 'function',
        desc: '值变化时的回调',
        option: '(value: string) => void',
        default: '-',
        required: false
      },
      {
        param: 'onBlur',
        type: 'function',
        desc: '失去焦点时的回调',
        option: '(event) => void',
        default: '-',
        required: false
      },
    ]
  },
  'card': {
    'Card': [
      {
        param: 'title',
        type: 'string | ReactNode',
        desc: '卡片标题',
        option: '-',
        default: '-',
        required: false
      },
      {
        param: 'bordered',
        type: 'boolean',
        desc: '是否有边框',
        option: 'true | false',
        default: 'true',
        required: false
      },
      {
        param: 'hoverable',
        type: 'boolean',
        desc: '鼠标悬浮时是否有阴影',
        option: 'true | false',
        default: 'false',
        required: false
      },
      {
        param: 'children',
        type: 'ReactNode',
        desc: '卡片内容',
        option: '-',
        default: '-',
        required: false
      },
      {
        param: 'onClick',
        type: 'function',
        desc: '点击卡片的回调',
        option: '(event) => void',
        default: '-',
        required: false
      },
    ]
  },
  'table': {
    'Table': [
      {
        param: 'data',
        type: 'array',
        desc: '表格数据源',
        option: '-',
        default: '[]',
        required: true
      },
      {
        param: 'columns',
        type: 'array',
        desc: '表格列配置',
        option: '-',
        default: '[]',
        required: true
      },
      {
        param: 'rowKey',
        type: 'string | function',
        desc: '行的唯一标识',
        option: '-',
        default: 'id',
        required: false
      },
      {
        param: 'pagination',
        type: 'boolean | object',
        desc: '分页配置',
        option: '-',
        default: 'false',
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
    ]
  },
  'form': {
    'Form': [
      {
        param: 'initialValues',
        type: 'object',
        desc: '表单初始值',
        option: '-',
        default: '{}',
        required: false
      },
      {
        param: 'onSubmit',
        type: 'function',
        desc: '提交表单的回调',
        option: '(values) => void',
        default: '-',
        required: false
      },
      {
        param: 'onValuesChange',
        type: 'function',
        desc: '表单值变化时的回调',
        option: '(changedValues, allValues) => void',
        default: '-',
        required: false
      },
      {
        param: 'layout',
        type: 'string',
        desc: '表单布局',
        option: 'horizontal | vertical | inline',
        default: 'horizontal',
        required: false
      },
      {
        param: 'validateTrigger',
        type: 'string | array',
        desc: '验证触发时机',
        option: 'onChange | onBlur | onSubmit',
        default: 'onChange',
        required: false
      },
    ]
  },
  'chart': {
    'Chart': [
      {
        param: 'data',
        type: 'array',
        desc: '图表数据',
        option: '-',
        default: '[]',
        required: true
      },
      {
        param: 'type',
        type: 'string',
        desc: '图表类型',
        option: 'bar | line | pie | area',
        default: 'bar',
        required: false
      },
      {
        param: 'width',
        type: 'number | string',
        desc: '图表宽度',
        option: '-',
        default: '100%',
        required: false
      },
      {
        param: 'height',
        type: 'number | string',
        desc: '图表高度',
        option: '-',
        default: '300',
        required: false
      },
      {
        param: 'colors',
        type: 'array',
        desc: '自定义颜色',
        option: '-',
        default: '-',
        required: false
      },
    ]
  },
  'modal': {
    'Modal': [
      {
        param: 'visible',
        type: 'boolean',
        desc: '是否显示',
        option: 'true | false',
        default: 'false',
        required: true
      },
      {
        param: 'title',
        type: 'string | ReactNode',
        desc: '标题',
        option: '-',
        default: '-',
        required: false
      },
      {
        param: 'onOk',
        type: 'function',
        desc: '点击确定的回调',
        option: '() => void',
        default: '-',
        required: false
      },
      {
        param: 'onCancel',
        type: 'function',
        desc: '点击取消的回调',
        option: '() => void',
        default: '-',
        required: false
      },
      {
        param: 'width',
        type: 'number | string',
        desc: '模态框宽度',
        option: '-',
        default: '520',
        required: false
      },
      {
        param: 'maskClosable',
        type: 'boolean',
        desc: '点击遮罩是否关闭',
        option: 'true | false',
        default: 'true',
        required: false
      },
    ]
  },
};

// 创建文档SDK实例
const docSdk = new DocSDK({
  title: 'doc-render-sdk',
  description: '文档 SDK',
  version: '0.0.1',
  
  // 主题配置
  theme: {
    name: 'default',
    colors: {
      primary: '#1890ff'
    }
  },
  
  // 布局配置
  layout: {
    type: 'sidebar',
    sidebar: {
      width: 280,
      collapsible: true
    }
  },
  
  // 组件配置
  components: {
    'button': {
      label: 'Button 按钮',
      description: '按钮用于触发一个操作，如提交表单',
      group: '基础组件',
      demos: [
        {
          title: '按钮类型',
          desc: '按钮有五种类型：默认按钮、主要按钮、成功按钮、警告按钮和危险按钮',
          source: 'basic'
        },
        {
          title: '按钮尺寸',
          desc: '按钮有三种尺寸：小、中、大',
          source: 'sizes'
        },
        {
          title: '加载状态',
          desc: '添加 loading 属性即可让按钮处于加载状态',
          source: 'loading'
        }
      ],
      apis: [
        {
          title: 'Button Props',
          apiKey: 'Button'
        }
      ]
    },
    'input': {
      label: 'Input 输入框',
      description: '通过鼠标或键盘输入内容，是最基础的表单域的包装',
      group: '表单组件',
      demos: [
        {
          title: '基础用法',
          desc: '基础的输入框用法，包括禁用和只读状态',
          source: 'basic'
        },
        {
          title: '输入验证',
          desc: '结合验证规则，实时校验用户输入',
          source: 'validation'
        }
      ],
      apis: [
        {
          title: 'Input Props',
          apiKey: 'Input'
        }
      ]
    },
    'card': {
      label: 'Card 卡片',
      description: '通用卡片容器，可承载文字、列表、图片、段落等内容',
      group: '数据展示',
      demos: [
        {
          title: '基础卡片',
          desc: '包含标题、内容的基础卡片',
          source: 'basic'
        },
        {
          title: '可交互卡片',
          desc: '卡片可以添加交互功能，如点赞、收藏等',
          source: 'interactive'
        }
      ],
      apis: [
        {
          title: 'Card Props',
          apiKey: 'Card'
        }
      ]
    },
    'table': {
      label: 'Table 表格',
      description: '用于展示行列数据',
      group: '数据展示',
      demos: [
        {
          title: '基础表格',
          desc: '简单的表格展示，包含表头和数据行',
          source: 'basic'
        }
      ],
      apis: [
        {
          title: 'Table Props',
          apiKey: 'Table'
        }
      ]
    },
    'form': {
      label: 'Form 表单',
      description: '具有数据收集、校验和提交功能的表单',
      group: '表单组件',
      demos: [
        {
          title: '完整表单',
          desc: '包含多种表单元素和验证规则的完整示例',
          source: 'complete'
        }
      ],
      apis: [
        {
          title: 'Form Props',
          apiKey: 'Form'
        }
      ]
    },
    'chart': {
      label: 'Chart 图表',
      description: '数据可视化图表组件，支持多种图表类型',
      group: '数据展示',
      demos: [
        {
          title: '柱状图',
          desc: '使用柱状图展示数据对比',
          source: 'bar'
        }
      ],
      apis: [
        {
          title: 'Chart Props',
          apiKey: 'Chart'
        }
      ]
    },
    'modal': {
      label: 'Modal 模态框',
      description: '模态对话框，在当前页面打开一个浮层',
      group: '反馈组件',
      demos: [
        {
          title: '基础用法',
          desc: '最简单的用法，包括确认对话框',
          source: 'basic'
        }
      ],
      apis: [
        {
          title: 'Modal Props',
          apiKey: 'Modal'
        }
      ]
    },
  },
  
  // 首页配置
  installation: `# 使用 npm
npm install doc-render-sdk

# 使用 yarn
yarn add doc-render-sdk

# 使用 pnpm
pnpm add doc-render-sdk`,
  
  usage: `import DocSDK from 'doc-render-sdk';

// 注册组件 demos
window.__DOC_SDK_DEMOS__ = {
  'button': {
    'basic': ButtonDemo
  }
};

// 注册 API 文档
window.__DOC_SDK_APIS__ = {
  'button': {
    'Button': [
      {
        param: 'type',
        type: 'string',
        desc: '按钮类型',
        default: 'default'
      }
    ]
  }
};

// 创建文档实例
const docSdk = new DocSDK({
  title: '我的组件库',
  components: {
    'button': {
      label: 'Button 按钮',
      demos: [
        {
          title: '基础用法',
          source: 'basic'
        }
      ],
      apis: [
        {
          title: 'Button Props',
          apiKey: 'Button'
        }
      ]
    }
  }
});

// 渲染文档
docSdk.render('#app');`,
  
  features: [
    {
      icon: '🎨',
      title: '主题定制',
      description: '支持自定义主题颜色、字体、间距等，轻松打造符合品牌风格的文档站点。'
    },
    {
      icon: '📱',
      title: '响应式设计',
      description: '完美适配桌面端和移动端，提供一致的用户体验，随时随地查看文档。'
    },
    {
      icon: '⚡',
      title: '高性能渲染',
      description: '采用 React 18 和虚拟滚动技术，支持大量组件文档的流畅展示。'
    },
    {
      icon: '🔍',
      title: '智能搜索',
      description: '内置全文搜索功能，快速定位所需的组件和 API 文档。'
    },
    {
      icon: '💻',
      title: '代码高亮',
      description: '集成 highlight.js，支持多种编程语言的语法高亮显示。'
    },
    {
      icon: '🎯',
      title: '插件系统',
      description: '灵活的插件机制，可以轻松扩展文档站点的功能。'
    },
    {
      icon: '📦',
      title: '零配置',
      description: '开箱即用的默认配置，同时支持深度定制，满足各种需求。'
    },
    {
      icon: '🚀',
      title: '热更新',
      description: '开发模式下支持热模块替换，修改代码后立即看到效果。'
    }
  ],
  
  // 页脚配置
  footerLinks: [
    {
      text: 'GitHub',
      url: 'https://github.com/Sunny-117/doc-render-sdk',
      external: true
    },
    {
      text: '更新日志',
      url: '#/changelog'
    }
  ]
});

// 渲染文档
docSdk.render('#app');
