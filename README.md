# 文档渲染SDK

一个专门用于渲染组件文档站点的SDK

## 特性

- 🎨 **主题化设计** - 支持自定义主题和样式
- 📱 **响应式布局** - 适配各种屏幕尺寸
- 🔧 **组件化架构** - 高度可复用的文档组件
- 📖 **Demo展示** - 支持代码预览、实时运行、代码折叠
- 📋 **API文档** - 结构化的API参数文档
- 🚀 **热更新** - 开发时支持热更新
- 🎯 **插件系统** - 支持自定义插件扩展功能
- 📦 **零配置** - 开箱即用，同时支持深度定制

## 🚀 快速开始

### 1. CLI 工具

```bash
# 创建新项目
npx doc-render-sdk create my-docs

# 启动开发服务器
npx doc-render-sdk dev

# 构建项目
npx doc-render-sdk build

# 迁移旧项目
npx doc-render-sdk migrate --source ./doc --target ./docs-new
```

### 2. 安装

```bash
npm install doc-render-sdk
```

```javascript
import DocSDK from 'doc-render-sdk';

const docSdk = new DocSDK({
  title: '我的组件库',
  components: {
    'button': {
      label: 'Button 按钮',
      demos: [
        {
          title: '基础用法',
          desc: '最简单的用法',
          source: 'basic'
        }
      ],
      apis: [
        {
          title: 'Button',
          apiKey: 'Button'
        }
      ]
    }
  }
});

docSdk.render('#app');
```


## 🔧 Vite 插件

doc-render-sdk 提供了 Vite 插件，自动读取 demo 文件源码并注入到全局变量。

### 核心特性

- ✅ **自动读取源码** - 从 demo 文件自动读取源代码
- ✅ **零维护成本** - 无需手动维护代码字符串
- ✅ **单一数据源** - demo 文件即是唯一的代码来源
- ✅ **自动同步** - 修改 demo 文件，代码展示自动更新
- ✅ **灵活配置** - 支持自定义配置和预设

### 快速使用

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import demoCodePlugin from 'doc-render-sdk/plugin';

export default defineConfig({
  plugins: [
    demoCodePlugin({
      include: 'src/main.js',
      demoPattern: '/demo/',
      debug: true
    })
  ]
});
```

### 预设配置

```javascript
import demoCodePlugin, { presets } from 'doc-render-sdk/plugin';

// 默认配置
demoCodePlugin(presets.default)

// 严格模式
demoCodePlugin(presets.strict)

// 宽松模式（支持下划线命名）
demoCodePlugin(presets.loose)

// TypeScript 项目
demoCodePlugin(presets.typescript)
```

详细文档请查看 [插件文档](./src/plugin/README.md)

---

## 📚 Playground 文档

- [项目说明](./playground/README.md) - Playground 项目概览
- [组件添加指南](./playground/HOW_TO_ADD_COMPONENT.md) - 如何添加新组件
- [项目总结](./playground/SUMMARY.md) - 完整的项目总结

### 自动化工具

- [Vite 插件文档](./playground/VITE_PLUGIN_README.md) - vite-plugin-demo-code 详细说明
- [代码自动生成](./playground/DEMO_CODE_AUTO_GENERATION.md) - Demo 代码自动生成原理
- [重要变更](./playground/CHANGES.md) - 最新变更说明

## 🔧 Vite 插件：vite-plugin-demo-code

专为 doc-render-sdk 设计的 Vite 插件，自动读取 demo 文件源码并注入到全局变量。

### 核心特性

- ✅ **自动读取源码** - 从 demo 文件自动读取源代码
- ✅ **零维护成本** - 无需手动维护代码字符串
- ✅ **单一数据源** - demo 文件即是唯一的代码来源
- ✅ **自动同步** - 修改 demo 文件，代码展示自动更新
- ✅ **灵活配置** - 支持自定义配置和预设

### 快速使用

```javascript
// vite.config.js
import demoCodePlugin from './vite-plugin-demo-code.js';

export default defineConfig({
  plugins: [
    demoCodePlugin()  // 使用默认配置
  ]
});
```

### 自定义配置

```javascript
demoCodePlugin({
  include: 'src/main.js',           // 处理的文件
  demoPattern: '/components/',      // Demo 文件路径模式
  globalVar: 'window.__MY_CODES__', // 自定义全局变量名
  debug: true,                      // 开启调试模式
  transform: (code) => {            // 自定义代码转换
    return code.replace(/\/\/.*/g, '');
  }
})
```

### 预设配置

```javascript
import demoCodePlugin, { presets } from './vite-plugin-demo-code.js';

// 默认配置
demoCodePlugin(presets.default)

// 严格模式
demoCodePlugin(presets.strict)

// 宽松模式（支持下划线命名）
demoCodePlugin(presets.loose)

// TypeScript 项目
demoCodePlugin(presets.typescript)
```

详细文档请查看 [Vite 插件文档](./playground/VITE_PLUGIN_README.md)

---

## 📚 配置文档

### 配置选项

```javascript
const config = {
  // 基本信息
  title: 'Documentation',
  description: 'Component Documentation Site',
  version: '1.0.0',

  // 主题配置
  theme: {
    name: 'default',
    colors: {
      primary: '#1890ff'
    }
  },

  // 布局配置
  layout: {
    type: 'sidebar', // sidebar, top, mixed
    sidebar: {
      width: 280,
      collapsible: true
    }
  },

  // 组件配置
  components: {
    'component-name': {
      label: '组件名称',
      description: '组件描述',
      demos: [...],
      apis: [...]
    }
  },
};
```

### 组件注册

```javascript
// 注册Demo组件
window.__DOC_SDK_DEMOS__ = {
  'component-name': {
    'demo-name': DemoComponent
  }
};

// 注册Demo代码
window.__DOC_SDK_DEMO_CODES__ = {
  'component-name': {
    'demo-name': 'const Demo = () => <div>Hello</div>;'
  }
};

// 注册API文档
window.__DOC_SDK_APIS__ = {
  'component-name': {
    'api-name': [
      {
        param: 'prop',
        type: 'string',
        desc: '属性描述',
        default: '',
        required: false
      }
    ]
  }
};
```

## 🔧 高级功能

### 自定义主题

```javascript
const customTheme = {
  name: 'custom',
  colors: {
    primary: '#ff6b6b',
    success: '#51cf66',
    warning: '#ffd43b',
    error: '#ff6b6b'
  },
  typography: {
    fontFamily: 'Inter, sans-serif'
  },
  components: {
    demo: `
      .doc-demo {
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
      }
    `
  }
};

const docSdk = new DocSDK({
  theme: customTheme
});
```

### 插件开发

```javascript
const myPlugin = {
  name: 'my-plugin',
  version: '1.0.0',
  install(context) {
    // 添加钩子
    context.hooks.add('beforeRender', () => {
      console.log('Before render');
    });

    // 监听事件
    context.events.on('routeChange', (route) => {
      console.log('Route changed:', route);
    });
  }
};

docSdk.use(myPlugin);
```
