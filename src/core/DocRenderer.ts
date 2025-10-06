/**
 * 文档渲染器核心类
 * 负责整个文档站点的渲染和管理
 */

import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '../components/Layout';
import RouterManager from './RouterManager';
import ComponentRegistry from './ComponentRegistry';
import type { RendererOptions } from '../types';

export default class DocRenderer {
  private configManager: any;
  private themeManager: any;
  private pluginManager: any;
  private routerManager: any;
  private componentRegistry: any;
  private targetElement: HTMLElement | null;
  private isRendered: boolean;

  constructor({ configManager, themeManager, pluginManager }: RendererOptions) {

    this.configManager = configManager;
    this.themeManager = themeManager;
    this.pluginManager = pluginManager;

    this.routerManager = new RouterManager(this);
    this.componentRegistry = new ComponentRegistry(this);

    this.targetElement = null;
    this.isRendered = false;

    // 初始化插件
    this.pluginManager.initialize(this);
  }

  /**
   * 渲染文档到指定容器
   * @param {string|HTMLElement} target - 目标容器
   */
  async render(target) {
    try {
      this.targetElement = typeof target === 'string' 
        ? document.querySelector(target) 
        : target;

      if (!this.targetElement) {
        throw new Error('Target element not found');
      }

      // 触发渲染前事件
      // this.emit('beforeRender', { target: this.targetElement });

      // 注册组件
      await this.registerComponents();

      // 初始化路由
      this.routerManager.initialize();

      // 渲染主布局
      this.renderLayout();

      this.isRendered = true;

      // 触发渲染完成事件
      // this.emit('rendered', { target: this.targetElement });

      return this;
    } catch (error) {
      // this.emit('renderError', { error, target });
      throw error;
    }
  }

  /**
   * 渲染主布局
   */
  renderLayout() {
    const config = this.configManager.getConfig();
    const theme = this.themeManager.getCurrentTheme();
    
    const layoutProps = {
      config,
      theme,
      renderer: this,
      routerManager: this.routerManager,
      componentRegistry: this.componentRegistry,
      onRouteChange: this.handleRouteChange.bind(this)
    };

    ReactDOM.render(
      React.createElement(Layout, layoutProps),
      this.targetElement
    );
  }

  /**
   * 注册组件
   */
  async registerComponents() {
    const config = this.configManager.getConfig();
    const { components = {} } = config;

    for (const [componentId, componentConfig] of Object.entries(components)) {
      await this.componentRegistry.register(componentId, componentConfig);
    }
  }

  /**
   * 处理路由变化
   * @param {Object} route - 路由信息
   */
  handleRouteChange(route) {
    // this.emit('routeChange', route);
    
    // 更新页面标题
    if (route.title) {
      document.title = `${route.title} - ${this.configManager.get('title', 'Documentation')}`;
    }
  }

  /**
   * 更新渲染
   */
  update() {
    if (this.isRendered) {
      this.renderLayout();
      // this.emit('updated');
    }
    return this;
  }

  /**
   * 销毁渲染器
   */
  destroy() {
    if (this.targetElement && this.isRendered) {
      ReactDOM.unmountComponentAtNode(this.targetElement);
      this.routerManager.destroy();
      this.componentRegistry.clear();
      // this.destroyEvents();
      this.isRendered = false;
      
      // this.emit('destroyed');
    }
    return this;
  }

  /**
   * 获取组件注册表
   */
  getComponentRegistry() {
    return this.componentRegistry;
  }

  /**
   * 获取路由管理器
   */
  getRouterManager() {
    return this.routerManager;
  }

  /**
   * 获取当前路由
   */
  getCurrentRoute() {
    return this.routerManager.getCurrentRoute();
  }

  /**
   * 导航到指定路由
   * @param {string} path - 路由路径
   * @param {Object} params - 路由参数
   */
  navigate(path, params = {}) {
    return this.routerManager.navigate(path, params);
  }
}
