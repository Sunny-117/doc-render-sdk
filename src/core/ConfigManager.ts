/**
 * 配置管理器
 * 负责管理文档站点的所有配置
 */

import { merge, get, set, cloneDeep } from 'lodash-es';
import defaultConfig from '../config/default';
import type { DocConfig } from '../types';

export default class ConfigManager {
  private config: DocConfig;
  private listeners: Set<(config: DocConfig) => void>;

  constructor(userConfig: Partial<DocConfig> = {}) {
    this.config = this.mergeConfig(defaultConfig, userConfig);
    this.listeners = new Set();
  }

  /**
   * 合并配置
   */
  private mergeConfig(defaultConfig: DocConfig, userConfig: Partial<DocConfig>): DocConfig {
    return merge(cloneDeep(defaultConfig), userConfig);
  }

  /**
   * 获取完整配置
   */
  getConfig(): DocConfig {
    return cloneDeep(this.config);
  }

  /**
   * 获取配置项
   */
  get(path?: string, defaultValue?: any): any {
    if (!path) return this.getConfig();
    return get(this.config, path, defaultValue);
  }

  /**
   * 设置配置项
   */
  set(path: string, value: any): void {
    const oldValue = this.get(path);
    set(this.config, path, value);

    this.notifyChange(path, value, oldValue);
  }

  /**
   * 更新配置
   */
  update(newConfig: Partial<DocConfig>): void {
    const oldConfig = cloneDeep(this.config);
    this.config = this.mergeConfig(this.config, newConfig);

    this.notifyChange('*', this.config, oldConfig);
  }

  /**
   * 重置配置
   */
  reset(newConfig: Partial<DocConfig> = {}): void {
    const oldConfig = cloneDeep(this.config);
    this.config = this.mergeConfig(defaultConfig, newConfig);

    this.notifyChange('*', this.config, oldConfig);
  }

  /**
   * 监听配置变化
   */
  onChange(listener: (config: DocConfig) => void): () => void {
    this.listeners.add(listener);

    // 返回取消监听的函数
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * 通知配置变化
   */
  private notifyChange(path: string, newValue: any, oldValue: any): void {
    this.listeners.forEach(listener => {
      try {
        listener({ path, newValue, oldValue, config: this.config } as any);
      } catch (error) {
        console.error('Config change listener error:', error);
      }
    });
  }

  /**
   * 验证配置
   * @param {Object} config - 要验证的配置
   * @returns {Object} 验证结果
   */
  validate(config = this.config) {
    const errors = [];
    const warnings: string[] = [];

    // 验证必需字段
    if (!config.title) {
      warnings.push('Missing title in config');
    }

    if (!config.components || Object.keys(config.components).length === 0) {
      warnings.push('No components defined in config');
    }

    // 验证组件配置
    if (config.components) {
      Object.entries(config.components).forEach(([id, component]) => {
        if (!component.label) {
          warnings.push(`Component ${id} missing label`);
        }
        
        if (!component.demos || !Array.isArray(component.demos)) {
          warnings.push(`Component ${id} missing demos array`);
        }
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  /**
   * 获取组件配置
   * @param {string} componentId - 组件ID
   * @returns {Object|null} 组件配置
   */
  getComponent(componentId) {
    return this.get(`components.${componentId}`, null);
  }

  /**
   * 获取所有组件配置
   * @returns {Object} 组件配置对象
   */
  getComponents() {
    return this.get('components', {});
  }

  /**
   * 获取主题配置
   * @returns {Object} 主题配置
   */
  getTheme() {
    return this.get('theme', {});
  }

  /**
   * 获取布局配置
   * @returns {Object} 布局配置
   */
  getLayout() {
    return this.get('layout', {});
  }

  /**
   * 获取插件配置
   * @returns {Array} 插件配置数组
   */
  getPlugins() {
    return this.get('plugins', []);
  }
}
