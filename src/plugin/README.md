# doc-render-sdk/plugin

自动注入 demo 源码的 Vite 插件。

## 🎯 用途

在构建组件文档站点时，通常需要同时展示：
1. **可运行的 Demo** - 让用户看到组件的实际效果
2. **Demo 的源代码** - 让用户了解如何使用组件

传统做法需要手动维护两份内容，容易出错且维护成本高。

**这个插件解决了这个问题**：
- ✅ 自动从 demo 文件读取源码
- ✅ 自动注入到全局变量
- ✅ 单一数据源，避免重复
- ✅ 自动同步更新
- ✅ 零维护成本

## 📦 安装

```bash
npm install doc-render-sdk
```

## 🚀 快速开始

```javascript
// vite.config.js
import { defineConfig } from 'vite';
import demoCodePlugin from 'doc-render-sdk/plugin';

export default defineConfig({
  plugins: [
    demoCodePlugin()
  ]
});
```

## ⚙️ 配置选项

```typescript
interface DemoCodePluginOptions {
  // 需要处理的文件路径模式
  include?: string | RegExp;
  
  // Demo 文件路径匹配模式
  demoPattern?: string;
  
  // 全局变量名
  globalVar?: string;
  
  // 是否开启调试模式
  debug?: boolean;
  
  // 支持的文件扩展名
  extensions?: string[];
  
  // 文件编码
  encoding?: BufferEncoding;
  
  // 自定义导入语句匹配正则
  importRegex?: RegExp;
  
  // 自定义变量名解析函数
  parseVarName?: (varName: string) => { component: string; demo: string } | null;
  
  // 自定义代码转换函数
  transform?: (code: string, filePath: string, varName: string) => string;
  
  // 注入位置标记
  injectBefore?: string;
}
```

## 📝 使用示例

### 示例 1：基础用法

```javascript
// vite.config.js
import demoCodePlugin from 'doc-render-sdk/plugin';

export default {
  plugins: [
    demoCodePlugin({
      include: 'src/main.js',
      demoPattern: '/demo/',
      globalVar: 'window.__DOC_SDK_DEMO_CODES__',
      debug: true
    })
  ]
};
```

### 示例 2：自定义代码转换

```javascript
demoCodePlugin({
  transform: (code, filePath, varName) => {
    // 移除所有注释
    code = code.replace(/\/\*[\s\S]*?\*\//g, '');
    code = code.replace(/\/\/.*/g, '');
    
    // 添加文件路径注释
    return `// File: ${filePath}\n${code}`;
  }
})
```

### 示例 3：TypeScript 项目

```javascript
import demoCodePlugin, { presets } from 'doc-render-sdk/plugin';

export default {
  plugins: [
    demoCodePlugin({
      ...presets.typescript,
      debug: true
    })
  ]
};
```

## � 预设配置

### `presets.default`

默认配置，适用于大多数场景。

```javascript
import demoCodePlugin, { presets } from 'doc-render-sdk/plugin';

demoCodePlugin(presets.default)
```

### `presets.strict`

严格模式，更严格的命名检查。

```javascript
demoCodePlugin(presets.strict)
```

### `presets.loose`

宽松模式，支持下划线分隔的命名。

```javascript
// 支持 button_basic 这样的命名
demoCodePlugin(presets.loose)
```

### `presets.typescript`

TypeScript 项目配置。

```javascript
demoCodePlugin(presets.typescript)
```

## 🔍 命名规范

**重要**：Demo 导入变量名必须遵循特定格式才能被正确解析。

### 默认规范（camelCase）

格式：`{组件名}{Demo名}`

- 组件名：全小写
- Demo名：首字母大写

```javascript
// ✅ 正确
import buttonBasic from './components/button/demo/basic.jsx';
import buttonSizes from './components/button/demo/sizes.jsx';
import inputValidation from './components/input/demo/validation.jsx';

// ❌ 错误
import myButton from './components/button/demo/basic.jsx';
import btn1 from './components/button/demo/sizes.jsx';
```

## 🎯 工作原理

1. **扫描导入语句** - 使用正则表达式匹配 demo 文件的导入语句
2. **读取源码** - 根据文件路径读取 demo 文件的源代码
3. **解析变量名** - 提取组件名和 demo 名
4. **生成代码** - 将所有源码组织成对象结构
5. **注入代码** - 在合适的位置注入生成的代码

## 🔄 热更新

插件支持热更新：

- 修改 demo 文件后，会自动触发页面重载
- 代码展示会立即更新
- 无需手动刷新

## 🐛 调试

### 开启调试模式

```javascript
demoCodePlugin({ debug: true })
```

调试模式会输出：
- 处理的文件路径
- 找到的 demo 导入
- 加载成功/失败的 demo
- 代码注入位置

## 📄 许可证

MIT
