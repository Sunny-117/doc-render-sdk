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


// 注册全局组件和代码
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

window.__DOC_SDK_DEMO_CODES__ = {
  'button': {
    'basic': `import React from 'react';

export default function BasicButton() {
  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <button>默认按钮</button>
      <button style={{ backgroundColor: '#1890ff', color: 'white' }}>
        主要按钮
      </button>
      <button style={{ backgroundColor: '#52c41a', color: 'white' }}>
        成功按钮
      </button>
    </div>
  );
}`,
    'sizes': `import React from 'react';

export default function ButtonSizes() {
  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <button style={{ padding: '4px 8px', fontSize: '12px' }}>小按钮</button>
      <button style={{ padding: '8px 16px', fontSize: '14px' }}>中按钮</button>
      <button style={{ padding: '12px 24px', fontSize: '16px' }}>大按钮</button>
    </div>
  );
}`,
    'loading': `import React, { useState } from 'react';

export default function LoadingButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? '加载中...' : '点击加载'}
    </button>
  );
}`,
  },
  'input': {
    'basic': `import React, { useState } from 'react';

export default function BasicInput() {
  const [value, setValue] = useState('');

  return (
    <div>
      <input
        placeholder="请输入内容"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div>输入值: {value}</div>
    </div>
  );
}`,
    'validation': `import React, { useState } from 'react';

export default function ValidationInput() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (value) => {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    if (!emailRegex.test(value)) {
      setError('请输入有效的邮箱地址');
    } else {
      setError('');
    }
  };

  return (
    <div>
      <input
        placeholder="请输入邮箱"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          validateEmail(e.target.value);
        }}
      />
      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}`,
  },
  'card': {
    'basic': `import React from 'react';

export default function BasicCard() {
  return (
    <div style={{ padding: '20px', border: '1px solid #e8e8e8', borderRadius: '8px' }}>
      <h3>基础卡片</h3>
      <p>这是一个基础的卡片组件</p>
    </div>
  );
}`,
    'interactive': `import React, { useState } from 'react';

export default function InteractiveCard() {
  const [liked, setLiked] = useState(false);

  return (
    <div style={{ padding: '20px', border: '1px solid #e8e8e8' }}>
      <h3>交互卡片</h3>
      <button onClick={() => setLiked(!liked)}>
        {liked ? '❤️ 已喜欢' : '🤍 喜欢'}
      </button>
    </div>
  );
}`,
  },
  'table': {
    'basic': `import React from 'react';

export default function BasicTable() {
  const data = [
    { id: 1, name: '张三', age: 28 },
    { id: 2, name: '李四', age: 32 },
  ];

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>姓名</th>
          <th>年龄</th>
        </tr>
      </thead>
      <tbody>
        {data.map(row => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.name}</td>
            <td>{row.age}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}`,
  },
  'form': {
    'complete': `import React, { useState } from 'react';

export default function CompleteForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('提交数据:', formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="用户名"
        value={formData.username}
        onChange={(e) => setFormData({...formData, username: e.target.value})}
      />
      <input
        type="email"
        placeholder="邮箱"
        value={formData.email}
        onChange={(e) => setFormData({...formData, email: e.target.value})}
      />
      <button type="submit">提交</button>
    </form>
  );
}`,
  },
  'chart': {
    'bar': `import React from 'react';

export default function BarChart() {
  const data = [
    { label: '周一', value: 120 },
    { label: '周二', value: 200 },
    { label: '周三', value: 150 },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', height: '200px' }}>
      {data.map((item, index) => (
        <div key={index} style={{ flex: 1, textAlign: 'center' }}>
          <div style={{
            height: item.value + 'px',
            backgroundColor: '#1890ff',
            margin: '0 10px'
          }} />
          <div>{item.label}</div>
        </div>
      ))}
    </div>
  );
}`,
  },
  'modal': {
    'basic': `import React, { useState } from 'react';

export default function BasicModal() {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <button onClick={() => setVisible(true)}>打开模态框</button>
      {visible && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.45)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '24px',
            borderRadius: '8px'
          }}>
            <h3>模态框标题</h3>
            <p>这是模态框内容</p>
            <button onClick={() => setVisible(false)}>关闭</button>
          </div>
        </div>
      )}
    </>
  );
}`,
  },
  'feat': {
    'normal': `import React, {PureComponent} from 'react';

export default class Normal extends PureComponent {
    componentDidMount() {
        // SDK 初始化逻辑
    }

    render() {
        return (
            <div style={{backgroundColor: '#f6f7fa'}}>
                <div id="report-sdk-normal-demo"></div>
            </div>
        );
    }
}`
  }
};

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
  'feat': {
    'feat': [
      {
        param: 'mode',
        type: 'string',
        desc: '渲染模式',
        option: 'embed | standalone',
        default: 'embed',
        required: true
      },
      {
        param: 'token',
        type: 'string',
        desc: '访问令牌',
        option: '',
        default: '',
        required: true
      },
    ]
  }
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
