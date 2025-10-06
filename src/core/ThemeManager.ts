/**
 * 主题管理器
 * 负责管理文档站点的主题系统
 */

import defaultTheme from '../themes/default';
import type { Theme } from '../types';

export default class ThemeManager {
  private configManager: any;
  private themes: Map<string, Theme>;
  private currentTheme: Theme | null;
  private styleElement: HTMLStyleElement | null;

  constructor(configManager: any) {
    this.configManager = configManager;
    this.themes = new Map();
    this.currentTheme = null;
    this.styleElement = null;

    // 注册默认主题
    this.registerTheme('default', defaultTheme);

    // 初始化主题
    this.initialize();
  }

  /**
   * 初始化主题管理器
   */
  initialize() {
    const themeConfig = this.configManager.get('theme', {});
    const themeName = themeConfig.name || 'default';
    
    this.setTheme(themeName, themeConfig);
  }

  /**
   * 注册主题
   * @param {string} name - 主题名称
   * @param {Object} theme - 主题对象
   */
  registerTheme(name, theme) {
    this.themes.set(name, theme);
  }

  /**
   * 设置当前主题
   * @param {string|Object} theme - 主题名称或主题对象
   * @param {Object} customConfig - 自定义配置
   */
  setTheme(theme, customConfig = {}) {
    let themeData;

    if (typeof theme === 'string') {
      // 通过名称获取主题
      themeData = this.themes.get(theme);
      if (!themeData) {
        console.warn(`Theme "${theme}" not found, using default theme`);
        themeData = this.themes.get('default');
      }
    } else if (typeof theme === 'object') {
      // 直接使用主题对象
      themeData = theme;
    } else {
      console.warn('Invalid theme type, using default theme');
      themeData = this.themes.get('default');
    }

    // 合并自定义配置
    this.currentTheme = this.mergeTheme(themeData, customConfig);
    
    // 应用主题样式
    this.applyTheme();
  }

  /**
   * 合并主题配置
   * @param {Object} baseTheme - 基础主题
   * @param {Object} customConfig - 自定义配置
   * @returns {Object} 合并后的主题
   */
  mergeTheme(baseTheme, customConfig) {
    return {
      ...baseTheme,
      colors: {
        ...baseTheme.colors,
        ...customConfig.colors
      },
      typography: {
        ...baseTheme.typography,
        ...customConfig.typography
      },
      spacing: {
        ...baseTheme.spacing,
        ...customConfig.spacing
      },
      layout: {
        ...baseTheme.layout,
        ...customConfig.layout
      },
      components: {
        ...baseTheme.components,
        ...customConfig.components
      }
    };
  }

  /**
   * 应用主题样式
   */
  applyTheme() {
    if (!this.currentTheme) {
      return;
    }

    // 移除旧的样式
    if (this.styleElement) {
      this.styleElement.remove();
    }

    // 生成CSS变量
    const cssVariables = this.generateCSSVariables();
    
    // 生成主题样式
    const themeStyles = this.generateThemeStyles();
    
    // 创建样式元素
    this.styleElement = document.createElement('style');
    this.styleElement.setAttribute('data-doc-render-sdk-theme', 'true');
    this.styleElement.textContent = `
      :root {
        ${cssVariables}
      }
      
      ${themeStyles}
    `;
    
    // 插入到head中
    document.head.appendChild(this.styleElement);
  }

  /**
   * 生成CSS变量
   * @returns {string} CSS变量字符串
   */
  generateCSSVariables() {
    const { colors, typography, spacing, layout } = this.currentTheme!;
    const variables: string[] = [];

    // 颜色变量
    if (colors) {
      Object.entries(colors).forEach(([key, value]) => {
        if (typeof value === 'object') {
          Object.entries(value).forEach(([subKey, subValue]) => {
            variables.push(`--doc-color-${key}-${subKey}: ${subValue};`);
          });
        } else {
          variables.push(`--doc-color-${key}: ${value};`);
        }
      });
    }

    // 字体变量
    if (typography) {
      Object.entries(typography).forEach(([key, value]) => {
        if (typeof value === 'object') {
          Object.entries(value).forEach(([subKey, subValue]) => {
            variables.push(`--doc-typography-${key}-${subKey}: ${subValue};`);
          });
        } else {
          variables.push(`--doc-typography-${key}: ${value};`);
        }
      });
    }

    // 间距变量
    if (spacing) {
      Object.entries(spacing).forEach(([key, value]) => {
        variables.push(`--doc-spacing-${key}: ${value};`);
      });
    }

    // 布局变量
    if (layout) {
      Object.entries(layout).forEach(([key, value]) => {
        variables.push(`--doc-layout-${key}: ${value};`);
      });
    }

    return variables.join('\n        ');
  }

  /**
   * 生成主题样式
   * @returns {string} 主题样式字符串
   */
  generateThemeStyles() {
    const { components } = this.currentTheme!;
    const styles: string[] = [];

    // 基础样式
    styles.push(`
      .doc-render-sdk-container {
        font-family: var(--doc-typography-fontFamily, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
        font-size: var(--doc-typography-fontSize, 14px);
        line-height: var(--doc-typography-lineHeight, 1.5);
        color: var(--doc-color-text, #333);
        background-color: var(--doc-color-background, #fff);
      }
    `);

    // 组件样式
    if (components) {
      Object.entries(components).forEach(([componentName, componentStyles]) => {
        if (typeof componentStyles === 'string') {
          styles.push(componentStyles);
        } else if (typeof componentStyles === 'object') {
          // 将对象转换为CSS
          const cssRules = this.objectToCSS(componentStyles, `.doc-${componentName}`);
          styles.push(cssRules);
        }
      });
    }

    return styles.join('\n');
  }

  /**
   * 将对象转换为CSS规则
   * @param {Object} obj - 样式对象
   * @param {string} selector - CSS选择器
   * @returns {string} CSS规则字符串
   */
  objectToCSS(obj, selector) {
    const rules: string[] = [];
    
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'object') {
        // 嵌套选择器
        const nestedSelector = key.startsWith('&') 
          ? key.replace('&', selector)
          : `${selector} ${key}`;
        rules.push(this.objectToCSS(value, nestedSelector));
      } else {
        // CSS属性
        const cssProperty = key.replace(/([A-Z])/g, '-$1').toLowerCase();
        rules.push(`${cssProperty}: ${value};`);
      }
    });

    return `${selector} {\n  ${rules.join('\n  ')}\n}`;
  }

  /**
   * 获取当前主题
   * @returns {Object} 当前主题对象
   */
  getCurrentTheme() {
    return this.currentTheme;
  }

  /**
   * 获取主题变量值
   * @param {string} path - 变量路径
   * @param {*} defaultValue - 默认值
   * @returns {*} 变量值
   */
  getThemeValue(path, defaultValue) {
    const keys = path.split('.');
    let value = this.currentTheme;
    
    for (const key of keys) {
      if (value && typeof value === 'object' && key in value) {
        value = value[key];
      } else {
        return defaultValue;
      }
    }
    
    return value;
  }

  /**
   * 获取所有注册的主题
   * @returns {Array} 主题名称数组
   */
  getAvailableThemes() {
    return Array.from(this.themes.keys());
  }

  /**
   * 销毁主题管理器
   */
  destroy() {
    if (this.styleElement) {
      this.styleElement.remove();
      this.styleElement = null;
    }
    this.themes.clear();
    this.currentTheme = null;
  }
}
