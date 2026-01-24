# Doc Render SDK Playground

这是 doc-render-sdk 的演示项目，展示了如何使用 SDK 构建组件文档站点。

## 📦 包含的组件示例

### 基础组件
- **Button 按钮** - 展示不同类型、尺寸和加载状态的按钮

### 表单组件
- **Input 输入框** - 基础输入框和带验证的输入框
- **Form 表单** - 完整的表单示例，包含多种表单元素和验证

### 数据展示
- **Card 卡片** - 基础卡片和可交互卡片
- **Table 表格** - 数据表格展示
- **Chart 图表** - 柱状图数据可视化

### 反馈组件
- **Modal 模态框** - 基础模态框和确认对话框

## 🚀 运行项目

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

访问 http://localhost:3000 查看文档站点。

## 📝 如何添加新组件

### 1. 创建组件 Demo

在 `components/your-component/demo/` 目录下创建 demo 文件：

```jsx
// components/your-component/demo/basic.jsx
import React from 'react';

export default function BasicDemo() {
  return <div>Your component demo</div>;
}
```

### 2. 注册 Demo

在 `index.js` 中导入并注册：

```javascript
import yourDemo from './components/your-component/demo/basic.jsx';

window.__DOC_SDK_DEMOS__ = {
  'your-component': {
    'basic': yourDemo
  }
};
```

### 3. 添加代码示例

```javascript
window.__DOC_SDK_DEMO_CODES__ = {
  'your-component': {
    'basic': `// 你的代码示例`
  }
};
```

### 4. 添加 API 文档

```javascript
window.__DOC_SDK_APIS__ = {
  'your-component': {
    'YourComponent': [
      {
        param: 'propName',
        type: 'string',
        desc: '属性描述',
        default: 'default value',
        required: false
      }
    ]
  }
};
```

### 5. 配置组件信息

```javascript
const docSdk = new DocSDK({
  components: {
    'your-component': {
      label: 'YourComponent 组件名',
      description: '组件描述',
      group: '组件分组',
      demos: [
        {
          title: 'Demo 标题',
          desc: 'Demo 描述',
          source: 'basic'
        }
      ],
      apis: [
        {
          title: 'API 标题',
          apiKey: 'YourComponent'
        }
      ]
    }
  }
});
```

## 🎨 特性展示

- ✅ 多种组件类型示例
- ✅ 交互式 Demo 展示
- ✅ 完整的 API 文档
- ✅ 代码高亮显示
- ✅ 响应式设计
- ✅ 丰富的动画效果
- ✅ 表单验证示例
- ✅ 数据可视化示例

## 📖 更多信息

查看主项目 [README](../README.md) 了解更多关于 doc-render-sdk 的信息。
