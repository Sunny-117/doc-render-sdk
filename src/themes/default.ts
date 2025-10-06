/**
 * 默认主题
 */

export default {
  name: 'default',
  
  // 颜色系统
  colors: {
    // 主色调
    primary: '#1890ff',
    primaryHover: '#40a9ff',
    primaryActive: '#096dd9',
    
    // 成功色
    success: '#52c41a',
    successHover: '#73d13d',
    successActive: '#389e0d',
    
    // 警告色
    warning: '#faad14',
    warningHover: '#ffc53d',
    warningActive: '#d48806',
    
    // 错误色
    error: '#ff4d4f',
    errorHover: '#ff7875',
    errorActive: '#d9363e',
    
    // 文本色
    text: '#262626',
    textSecondary: '#595959',
    textTertiary: '#8c8c8c',
    textQuaternary: '#bfbfbf',
    
    // 背景色
    background: '#ffffff',
    backgroundSecondary: '#fafafa',
    backgroundTertiary: '#f5f5f5',
    
    // 边框色
    border: '#d9d9d9',
    borderSecondary: '#f0f0f0',
    
    // 阴影色
    shadow: 'rgba(0, 0, 0, 0.15)',
    shadowSecondary: 'rgba(0, 0, 0, 0.06)',
    
    // 代码相关
    code: {
      background: '#f6f8fa',
      border: '#e1e4e8',
      text: '#24292e',
      keyword: '#d73a49',
      string: '#032f62',
      comment: '#6a737d',
      number: '#005cc5',
      function: '#6f42c1'
    }
  },
  
  // 字体系统
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    fontFamilyCode: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace',
    
    // 字体大小
    fontSize: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '30px',
      '4xl': '36px'
    },
    
    // 行高
    lineHeight: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75
    },
    
    // 字重
    fontWeight: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    }
  },
  
  // 间距系统
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
    '4xl': '96px'
  },
  
  // 布局系统
  layout: {
    sidebarWidth: '280px',
    headerHeight: '64px',
    footerHeight: '60px',
    contentMaxWidth: '1200px',
    borderRadius: '6px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)'
  },
  
  // 组件样式
  components: {
    // 布局组件
    layout: `
      .doc-layout {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }

      .doc-layout-header {
        background: var(--doc-color-background);
        border-bottom: 1px solid var(--doc-color-border);
        box-shadow: var(--doc-layout-boxShadow);
        z-index: 100;
      }

      .doc-layout-content {
        flex: 1;
        display: flex;
      }

      .doc-layout-sidebar {
        width: var(--doc-layout-sidebarWidth);
        background: var(--doc-color-background);
        border-right: 1px solid var(--doc-color-border);
        overflow-y: auto;
      }

      .doc-layout-main {
        flex: 1;
        background: var(--doc-color-backgroundSecondary);
        overflow-y: auto;
      }

      .doc-layout-footer {
        background: var(--doc-color-background);
        border-top: 1px solid var(--doc-color-border);
        text-align: center;
        padding: var(--doc-spacing-md);
        color: var(--doc-color-textSecondary);
      }
    `,

    // 头部组件
    header: `
      .doc-header {
        height: var(--doc-layout-headerHeight);
        display: flex;
        align-items: center;
        padding: 0 var(--doc-spacing-lg);
      }

      .doc-header-content {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .doc-header-left {
        display: flex;
        align-items: center;
        gap: var(--doc-spacing-md);
      }

      .doc-header-logo img {
        height: 32px;
        width: auto;
      }

      .doc-header-logo-placeholder {
        font-size: 24px;
      }

      .doc-header-title {
        font-size: var(--doc-typography-fontSize-lg);
        font-weight: var(--doc-typography-fontWeight-bold);
        color: var(--doc-color-text);
      }

      .doc-header-version {
        margin-left: var(--doc-spacing-sm);
        font-size: var(--doc-typography-fontSize-sm);
        color: var(--doc-color-textSecondary);
        background: var(--doc-color-backgroundTertiary);
        padding: 2px 6px;
        border-radius: 3px;
      }

      .doc-header-navigation {
        display: flex;
        gap: var(--doc-spacing-lg);
      }

      .doc-header-nav-item {
        color: var(--doc-color-text);
        text-decoration: none;
        padding: var(--doc-spacing-sm) var(--doc-spacing-md);
        border-radius: var(--doc-layout-borderRadius);
        transition: all 0.2s ease;
      }

      .doc-header-nav-item:hover {
        background: var(--doc-color-backgroundTertiary);
        color: var(--doc-color-primary);
      }

      .doc-header-nav-item.active {
        background: var(--doc-color-primary);
        color: white;
      }

      .doc-header-actions {
        display: flex;
        align-items: center;
        gap: var(--doc-spacing-sm);
      }

      .doc-header-action {
        padding: var(--doc-spacing-sm);
        background: none;
        border: none;
        color: var(--doc-color-textSecondary);
        cursor: pointer;
        border-radius: var(--doc-layout-borderRadius);
        transition: all 0.2s ease;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .doc-header-action:hover {
        background: var(--doc-color-backgroundTertiary);
        color: var(--doc-color-primary);
      }
    `,

    // 导航组件
    navigation: `
      .doc-navigation {
        padding: var(--doc-spacing-md);
      }

      .doc-navigation-title {
        font-size: var(--doc-typography-fontSize-lg);
        font-weight: var(--doc-typography-fontWeight-bold);
        color: var(--doc-color-text);
        margin-bottom: var(--doc-spacing-lg);
        padding: 0 var(--doc-spacing-sm);
      }

      .doc-navigation-group {
        margin-bottom: var(--doc-spacing-lg);
      }

      .doc-navigation-group-title {
        font-size: var(--doc-typography-fontSize-sm);
        font-weight: var(--doc-typography-fontWeight-medium);
        color: var(--doc-color-textSecondary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: var(--doc-spacing-sm);
        padding: 0 var(--doc-spacing-sm);
      }

      .doc-navigation-item {
        display: block;
        padding: var(--doc-spacing-sm) var(--doc-spacing-md);
        color: var(--doc-color-text);
        text-decoration: none;
        border-radius: var(--doc-layout-borderRadius);
        transition: all 0.2s ease;
        margin-bottom: 2px;
      }

      .doc-navigation-item:hover {
        background: var(--doc-color-backgroundTertiary);
        color: var(--doc-color-primary);
      }

      .doc-navigation-item.active {
        background: var(--doc-color-primary);
        color: white;
      }
    `,

    // 内容区域
    content: `
      .doc-content {
        flex: 1;
        padding: var(--doc-spacing-lg);
      }

      .doc-content-container {
        max-width: var(--doc-layout-contentMaxWidth);
        margin: 0 auto;
      }

      .doc-content-loading {
        text-align: center;
        padding: var(--doc-spacing-4xl);
        color: var(--doc-color-textSecondary);
      }

      .doc-content-not-found {
        text-align: center;
        padding: var(--doc-spacing-4xl);
      }

      .doc-content-not-found h1 {
        font-size: var(--doc-typography-fontSize-3xl);
        color: var(--doc-color-text);
        margin-bottom: var(--doc-spacing-md);
      }

      .doc-content-not-found p {
        color: var(--doc-color-textSecondary);
      }

      .doc-component-page {
        padding: var(--doc-spacing-lg) 0;
      }

      .doc-component-header {
        margin-bottom: var(--doc-spacing-2xl);
        padding-bottom: var(--doc-spacing-lg);
        border-bottom: 1px solid var(--doc-color-border);
      }

      .doc-component-title {
        font-size: var(--doc-typography-fontSize-4xl);
        font-weight: var(--doc-typography-fontWeight-bold);
        color: var(--doc-color-text);
        margin-bottom: var(--doc-spacing-md);
      }

      .doc-component-description {
        font-size: var(--doc-typography-fontSize-lg);
        color: var(--doc-color-textSecondary);
        line-height: var(--doc-typography-lineHeight-relaxed);
        margin-bottom: var(--doc-spacing-md);
      }

      .doc-component-version {
        font-size: var(--doc-typography-fontSize-sm);
        color: var(--doc-color-textTertiary);
      }

      .doc-component-section-title {
        font-size: var(--doc-typography-fontSize-2xl);
        font-weight: var(--doc-typography-fontWeight-semibold);
        color: var(--doc-color-text);
        margin: var(--doc-spacing-2xl) 0 var(--doc-spacing-lg) 0;
        padding-bottom: var(--doc-spacing-sm);
        border-bottom: 1px solid var(--doc-color-borderSecondary);
      }
    `,

    // Demo组件
    demo: `
      .doc-demo {
        margin-bottom: var(--doc-spacing-2xl);
        border: 1px solid var(--doc-color-border);
        border-radius: var(--doc-layout-borderRadius);
        overflow: hidden;
        background: var(--doc-color-background);
      }

      .doc-demo-header {
        padding: var(--doc-spacing-lg);
        background: var(--doc-color-background);
        border-bottom: 1px solid var(--doc-color-borderSecondary);
      }

      .doc-demo-title {
        font-size: var(--doc-typography-fontSize-lg);
        font-weight: var(--doc-typography-fontWeight-medium);
        color: var(--doc-color-text);
        margin-bottom: var(--doc-spacing-sm);
      }

      .doc-demo-description {
        color: var(--doc-color-textSecondary);
        line-height: var(--doc-typography-lineHeight-relaxed);
      }

      .doc-demo-highlight {
        background: var(--doc-color-warning);
        color: var(--doc-color-background);
        padding: 2px 4px;
        border-radius: 3px;
        font-size: 0.9em;
      }

      .doc-demo-content {
        padding: var(--doc-spacing-xl);
        background: var(--doc-color-background);
        min-height: 100px;
      }

      .doc-demo-error {
        padding: var(--doc-spacing-lg);
        background: var(--doc-color-error);
        color: white;
        text-align: center;
        border-radius: var(--doc-layout-borderRadius);
      }

      .doc-demo-code {
        background: var(--doc-color-code-background);
        border-top: 1px solid var(--doc-color-border);
      }

      .doc-demo-actions {
        display: flex;
        justify-content: flex-end;
        gap: var(--doc-spacing-sm);
        padding: var(--doc-spacing-sm) var(--doc-spacing-md);
        background: var(--doc-color-backgroundTertiary);
        border-top: 1px solid var(--doc-color-border);
      }

      .doc-demo-action {
        padding: var(--doc-spacing-xs) var(--doc-spacing-sm);
        background: none;
        border: none;
        color: var(--doc-color-textSecondary);
        cursor: pointer;
        font-size: var(--doc-typography-fontSize-sm);
        transition: all 0.2s ease;
        border-radius: 3px;
      }

      .doc-demo-action:hover {
        color: var(--doc-color-primary);
        background: var(--doc-color-backgroundSecondary);
      }
    `,

    // API文档组件
    api: `
      .doc-api {
        margin-bottom: var(--doc-spacing-2xl);
      }

      .doc-api-header {
        margin-bottom: var(--doc-spacing-lg);
      }

      .doc-api-title {
        font-size: var(--doc-typography-fontSize-xl);
        font-weight: var(--doc-typography-fontWeight-semibold);
        color: var(--doc-color-text);
        margin-bottom: var(--doc-spacing-sm);
      }

      .doc-api-description {
        color: var(--doc-color-textSecondary);
        line-height: var(--doc-typography-lineHeight-relaxed);
      }

      .doc-api-table {
        border: 1px solid var(--doc-color-border);
        border-radius: var(--doc-layout-borderRadius);
        overflow: hidden;
        background: var(--doc-color-background);
      }

      .doc-api-table-header {
        display: grid;
        grid-template-columns: 1fr 1fr 2fr 1fr 1fr 80px;
        background: var(--doc-color-backgroundTertiary);
        border-bottom: 1px solid var(--doc-color-border);
        font-weight: var(--doc-typography-fontWeight-medium);
      }

      .doc-api-table-cell {
        padding: var(--doc-spacing-md);
        border-right: 1px solid var(--doc-color-borderSecondary);
        font-size: var(--doc-typography-fontSize-sm);
      }

      .doc-api-table-cell:last-child {
        border-right: none;
      }

      .doc-api-table-row {
        display: grid;
        grid-template-columns: 1fr 1fr 2fr 1fr 1fr 80px;
        border-bottom: 1px solid var(--doc-color-borderSecondary);
      }

      .doc-api-table-row:last-child {
        border-bottom: none;
      }

      .doc-api-table-row:hover {
        background: var(--doc-color-backgroundSecondary);
      }

      .doc-api-param-name {
        color: var(--doc-color-primary);
        font-family: var(--doc-typography-fontFamilyCode);
        font-size: 0.9em;
      }

      .doc-api-type {
        color: var(--doc-color-success);
        font-family: var(--doc-typography-fontFamilyCode);
        font-size: 0.9em;
      }

      .doc-api-option {
        color: var(--doc-color-warning);
        font-family: var(--doc-typography-fontFamilyCode);
        font-size: 0.9em;
      }

      .doc-api-default {
        color: var(--doc-color-textTertiary);
        font-family: var(--doc-typography-fontFamilyCode);
        font-size: 0.9em;
      }

      .doc-api-required-yes {
        color: var(--doc-color-error);
        font-weight: var(--doc-typography-fontWeight-medium);
      }

      .doc-api-required-no {
        color: var(--doc-color-textTertiary);
      }

      .doc-api-deprecated {
        background: var(--doc-color-error);
        color: white;
        font-size: 0.8em;
        padding: 2px 4px;
        border-radius: 3px;
        margin-left: var(--doc-spacing-xs);
      }

      .doc-api-highlight {
        background: var(--doc-color-warning);
        color: var(--doc-color-background);
        padding: 2px 4px;
        border-radius: 3px;
        font-size: 0.9em;
      }

      .doc-api-empty {
        padding: var(--doc-spacing-xl);
        text-align: center;
        color: var(--doc-color-textSecondary);
        background: var(--doc-color-backgroundSecondary);
        border-radius: var(--doc-layout-borderRadius);
      }
    `,
    // 首页组件
    home: `
      .doc-home {
        padding: var(--doc-spacing-2xl) 0;
      }

      .doc-home-welcome {
        text-align: center;
        margin-bottom: var(--doc-spacing-4xl);
      }

      .doc-home-title {
        font-size: var(--doc-typography-fontSize-4xl);
        font-weight: var(--doc-typography-fontWeight-bold);
        color: var(--doc-color-text);
        margin-bottom: var(--doc-spacing-lg);
      }

      .doc-home-description {
        font-size: var(--doc-typography-fontSize-lg);
        color: var(--doc-color-textSecondary);
        line-height: var(--doc-typography-lineHeight-relaxed);
        max-width: 600px;
        margin: 0 auto var(--doc-spacing-lg);
      }

      .doc-home-version {
        font-size: var(--doc-typography-fontSize-sm);
        color: var(--doc-color-textTertiary);
      }

      .doc-home-version code {
        background: var(--doc-color-backgroundTertiary);
        padding: 2px 6px;
        border-radius: 3px;
        font-family: var(--doc-typography-fontFamilyCode);
      }

      .doc-home-section {
        margin-bottom: var(--doc-spacing-4xl);
      }

      .doc-home-section-title {
        font-size: var(--doc-typography-fontSize-2xl);
        font-weight: var(--doc-typography-fontWeight-semibold);
        color: var(--doc-color-text);
        margin-bottom: var(--doc-spacing-lg);
        text-align: center;
      }

      .doc-home-code {
        background: var(--doc-color-code-background);
        border: 1px solid var(--doc-color-border);
        border-radius: var(--doc-layout-borderRadius);
        padding: var(--doc-spacing-lg);
        font-family: var(--doc-typography-fontFamilyCode);
        font-size: var(--doc-typography-fontSize-sm);
        overflow-x: auto;
      }

      .doc-home-features {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: var(--doc-spacing-xl);
        margin-top: var(--doc-spacing-lg);
      }

      .doc-home-feature {
        text-align: center;
        padding: var(--doc-spacing-lg);
      }

      .doc-home-feature-icon {
        font-size: var(--doc-typography-fontSize-3xl);
        margin-bottom: var(--doc-spacing-md);
      }

      .doc-home-feature-title {
        font-size: var(--doc-typography-fontSize-lg);
        font-weight: var(--doc-typography-fontWeight-medium);
        color: var(--doc-color-text);
        margin-bottom: var(--doc-spacing-sm);
      }

      .doc-home-feature-description {
        color: var(--doc-color-textSecondary);
        line-height: var(--doc-typography-lineHeight-relaxed);
      }

      .doc-home-components {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: var(--doc-spacing-lg);
        margin-top: var(--doc-spacing-lg);
      }

      .doc-home-component-card {
        background: var(--doc-color-background);
        border: 1px solid var(--doc-color-border);
        border-radius: var(--doc-layout-borderRadius);
        padding: var(--doc-spacing-lg);
        transition: all 0.2s ease;
      }

      .doc-home-component-card:hover {
        box-shadow: var(--doc-layout-boxShadow);
        border-color: var(--doc-color-primary);
      }

      .doc-home-component-title a {
        color: var(--doc-color-text);
        text-decoration: none;
        font-weight: var(--doc-typography-fontWeight-medium);
        font-size: var(--doc-typography-fontSize-lg);
      }

      .doc-home-component-title a:hover {
        color: var(--doc-color-primary);
      }

      .doc-home-component-description {
        color: var(--doc-color-textSecondary);
        margin: var(--doc-spacing-sm) 0;
        line-height: var(--doc-typography-lineHeight-relaxed);
      }

      .doc-home-component-meta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: var(--doc-typography-fontSize-sm);
        color: var(--doc-color-textTertiary);
        margin-top: var(--doc-spacing-md);
      }
    `
  }
};
