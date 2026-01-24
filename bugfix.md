**`preserveSymlinks` 决定 esbuild 在“认不认软链接本尊”这件事上，按不按 Node 的规则来。**

---

## 它到底干了啥？

默认情况下，**esbuild 会“解开”软链接**：

```
import pkg from "my-lib"
```

如果：

```
node_modules/my-lib -> ../../packages/my-lib   (symlink)
```

esbuild 默认会：

👉 **顺着 symlink 找到真实路径**
👉 把它当成 `../../packages/my-lib` 来处理
👉 文件身份（identity） = 真实路径

---

## 开了 `--preserve-symlinks` 会发生什么？

启用后：

👉 **不解开 symlink**
👉 按“你 import 时看到的路径”来算
👉 文件身份 = symlink 路径本身

也就是说：

```
node_modules/my-lib/index.js
```

和

```
../../packages/my-lib/index.js
```

**会被认为是两个不同的模块**

---

## 为什么这玩意儿很重要？

### 1️⃣ monorepo / pnpm / workspace 必开

你这种情况我猜你很熟 👀（你之前就提过 esbuild + 组件库）

比如：

* pnpm / yarn / npm workspace
* `node_modules` 里大量 symlink
* 本地 package 被 link 进来

**不开的后果：**

* 同一个包被打包两次
* React / Vue 出现两个实例
* `instanceof` 失效
* hooks 报错（React 最经典）

👉 **症状**：

> “明明只装了一份 React，为什么报 Invalid hook call？”

**解决：**

```bash
esbuild --preserve-symlinks
```

✅ 行为和 Node / Webpack 对齐

---

### 2️⃣ 对齐 Node 的 `--preserve-symlinks`

Node 里有：

```bash
node --preserve-symlinks
```

Webpack 里有：

```js
resolve: {
  symlinks: false
}
```

如果你：

* 运行时用的是 Node 的 preserve-symlinks
* 构建却没开

👉 **构建结果和运行时模块解析不一致**

这会直接踩坑。

---

### 3️⃣ 什么时候「不该」开？

> 官方也提醒了这一点 👇

> 一个真实文件可能会被多个 symlink 指向 → 会被当成多个模块

所以不开更好的场景是：

* 传统单 repo
* 没有 link / workspace
* 追求极致 bundle 去重

---

## 一个超直观对比

### 目录结构

```
packages/
  ui/
    index.ts

node_modules/ui -> ../packages/ui
```

### 不开（默认）

```ts
import "ui"
import "../packages/ui"
```

👉 **同一个模块**（只打一次）

---

### 开了 `preserve-symlinks`

```ts
import "ui"
import "../packages/ui"
```

👉 **两个模块**（打两次）

---

## 结论（给你一句工程师式总结）

> **`preserveSymlinks` 的本质是：模块去重 vs 路径语义正确性 的取舍**

| 场景                         | 建议    |
| -------------------------- | ----- |
| pnpm / monorepo / link 本地包 | ✅ 开   |
| React / Vue 库开发            | ✅ 开   |
| 普通业务项目                     | ❌ 不一定 |
| 追求最小 bundle                | ❌ 谨慎  |

---

如果你愿意，我可以直接结合你之前那个
👉 **“esbuild 构建组件库 + import 'xxx.css' + pnpm”**
给你一套 **最佳实践配置**，包括哪些一定要开、哪些千万别开。
