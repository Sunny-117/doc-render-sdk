/**
 * 文档渲染SDK入口文件
 * @author Doc SDK Team
 */

import DocRenderer from './core/DocRenderer';
import ConfigManager from './core/ConfigManager';
import ThemeManager from './core/ThemeManager';
import PluginManager from './core/PluginManager';
import type { DocConfig, Plugin, Theme } from './types';

// 导出核心类
export { DocRenderer, ConfigManager, ThemeManager, PluginManager };

// 导出组件
export { default as Layout } from './components/Layout';
export { default as Navigation } from './components/Navigation';
export { default as Demo } from './components/Demo';
export { default as ApiDoc } from './components/ApiDoc';
export { default as CodeBlock } from './components/CodeBlock';


// 导出类型
export type * from './types';

// 默认导出主类
export default class DocSDK {
  private configManager: ConfigManager;
  private themeManager: ThemeManager;
  private pluginManager: PluginManager;
  private renderer: DocRenderer;

  constructor(config: Partial<DocConfig> = {}) {
    this.configManager = new ConfigManager(config);
    this.themeManager = new ThemeManager(this.configManager);
    this.pluginManager = new PluginManager(this.configManager);
    this.renderer = new DocRenderer({
      configManager: this.configManager,
      themeManager: this.themeManager,
      pluginManager: this.pluginManager
    });
  }

  /**
   * 渲染文档到指定容器
   */
  async render(target: string | HTMLElement): Promise<void> {
    await this.renderer.render(target);
  }

  /**
   * 销毁文档实例
   */
  destroy(): void {
    this.renderer.destroy();
  }

  /**
   * 更新配置
   */
  updateConfig(config: Partial<DocConfig>): void {
    this.configManager.update(config);
    this.renderer.update();
  }

  /**
   * 注册插件
   */
  use(plugin: Plugin): this {
    this.pluginManager.register(plugin);
    return this;
  }

  /**
   * 设置主题
   */
  setTheme(theme: Theme | string): void {
    this.themeManager.setTheme(theme);
    this.renderer.update();
  }

  /**
   * 获取当前配置
   */
  getConfig(): DocConfig {
    return this.configManager.getConfig();
  }

  /**
   * 监听事件
   */
  on(event: string, handler: Function): void {
    // TODO: 实现事件监听
  }

  /**
   * 移除事件监听
   */
  off(event: string, handler: Function): void {
    // TODO: 实现事件移除
  }

  /**
   * 触发事件
   */
  emit(event: string, data?: any): void {
    // TODO: 实现事件触发
  }
}