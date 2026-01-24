# 重要变更说明

## 🎉 Demo 代码自动生成

### 变更内容

不再需要手动维护 `window.__DOC_SDK_DEMO_CODES__`！

### 之前 ❌

```javascript
// 需要手动复制粘贴代码，容易出错且难以维护
window.__DOC_SDK_DEMO_CODES__ = {
  'button': {
    'basic': `import React from 'react';

export default function BasicButton() {
  return <button>Click me</button>;
}`,
  }
};
```

### 现在 ✅

```javascript
// 只需要导入，代码会自动注入
import buttonBasic from './components/button/demo/basic.jsx';

window.__DOC_SDK_DEMOS__ = {
  'button': {
    'basic': buttonBasic
  }
};

// 完成！window.__DOC_SDK_DEMO_CODES__ 会自动生成
```

## 实现原理

使用 Vite 插件 `vite-plugin-demo-code.js` 自动读取 demo 文件源码并注入。

### 工作流程

1. 插件扫描 `index.js` 中的 demo 导入语句
2. 读取对应文件的源代码
3. 自动生成 `window.__DOC_SDK_DEMO_CODES__` 并注入

## 命名规范

**重要**：Demo 导入变量名必须遵循 `{组件名}{Demo名}` 格式

```javascript
// ✅ 正确
import buttonBasic from './components/button/demo/basic.jsx';
import buttonSizes from './components/button/demo/sizes.jsx';
import inputValidation from './components/input/demo/validation.jsx';

// ❌ 错误
import myButton from './components/button/demo/basic.jsx';
import btn1 from './components/button/demo/sizes.jsx';
```

规则：
- 组件名：全小写
- Demo名：首字母大写
- 例如：`buttonBasic` → `button/basic`

## 优势

1. **单一数据源**：demo 文件就是唯一的代码来源
2. **自动同步**：修改 demo 文件，代码展示自动更新
3. **无需维护**：不用手动复制粘贴代码
4. **避免错误**：消除手动维护导致的不一致
5. **代码更简洁**：减少了大量模板字符串代码

## 文件变更

### 新增文件

- `playground/vite-plugin-demo-code.js` - Vite 插件
- `playground/DEMO_CODE_AUTO_GENERATION.md` - 详细说明文档
- `playground/HOW_TO_ADD_COMPONENT.md` - 组件添加指南
- `playground/components/button/api.js` - API 配置示例

### 修改文件

- `playground/vite.config.js` - 添加了 demo 代码插件
- `playground/index.js` - 移除了手动维护的 DEMO_CODES

## 迁移指南

如果你有现有的组件需要迁移：

### 步骤 1：检查导入命名

确保所有 demo 导入遵循命名规范：

```javascript
// 检查并修正
import buttonBasic from './components/button/demo/basic.jsx';  // ✅
import myBtn from './components/button/demo/basic.jsx';        // ❌ 需要修正
```

### 步骤 2：删除 DEMO_CODES

删除 `window.__DOC_SDK_DEMO_CODES__` 的手动配置：

```javascript
// 删除这部分
window.__DOC_SDK_DEMO_CODES__ = {
  // ...
};
```

### 步骤 3：测试

启动开发服务器，确认代码展示正常：

```bash
pnpm dev
```

## 常见问题

### Q: 代码没有显示？

A: 检查：
1. 导入变量名是否符合命名规范
2. 文件路径是否正确
3. 查看浏览器控制台是否有错误

### Q: 代码显示不正确？

A: 检查：
1. demo 文件是否有语法错误
2. 文件编码是否为 UTF-8
3. 尝试重启开发服务器

### Q: 如何调试插件？

A: 在 `vite-plugin-demo-code.js` 中添加 console.log：

```javascript
transform(code, id) {
  console.log('Processing:', id);
  // ...
}
```

## 相关文档

- [Demo 代码自动生成说明](./DEMO_CODE_AUTO_GENERATION.md)
- [如何添加新组件](./HOW_TO_ADD_COMPONENT.md)
- [Playground README](./README.md)

## 反馈

如果遇到问题或有建议，请提 Issue 或 PR。
