/**
 * 路由管理器
 * 负责管理文档站点的路由系统
 */

export default class RouterManager {
  renderer: any;
  currentRoute: null;
  routes: Map<any, any>;
  listeners: Set<(route: any) => void>;
  isInitialized: boolean;
  constructor(renderer) {
    this.renderer = renderer;
    this.currentRoute = null;
    this.routes = new Map();
    this.listeners = new Set();
    this.isInitialized = false;
  }

  /**
   * 初始化路由系统
   */
  initialize() {
    if (this.isInitialized) {
      return;
    }

    // 注册路由
    this.registerRoutes();

    // 监听浏览器路由变化
    window.addEventListener('hashchange', this.handleHashChange.bind(this));
    window.addEventListener('popstate', this.handlePopState.bind(this));

    // 处理初始路由
    this.handleInitialRoute();

    this.isInitialized = true;
  }

  /**
   * 注册路由
   */
  registerRoutes() {
    const config = this.renderer.configManager.getConfig();
    const { components = {} } = config;

    // 注册首页路由
    this.routes.set('/', {
      path: '/',
      component: 'home',
      title: config.title || 'Documentation'
    });

    // 注册组件路由
    Object.entries(components).forEach(([componentId, componentConfig]) => {
      const path = `/${componentId}`;
      this.routes.set(path, {
        path,
        component: componentId,
        title: (componentConfig as any).label || componentId,
        config: componentConfig
      });
    });
  }

  /**
   * 处理初始路由
   */
  handleInitialRoute() {
    const hash = window.location.hash;
    const path = this.parseHashToPath(hash);
    this.navigate(path, {}, false);
  }

  /**
   * 处理hash变化
   */
  handleHashChange() {
    const hash = window.location.hash;
    const path = this.parseHashToPath(hash);
    this.navigate(path, {}, false);
  }

  /**
   * 处理浏览器前进后退
   */
  handlePopState(event) {
    if (event.state && event.state.path) {
      this.navigate(event.state.path, event.state.params || {}, false);
    }
  }

  /**
   * 解析hash为路径
   * @param {string} hash - URL hash
   * @returns {string} 路径
   */
  parseHashToPath(hash) {
    if (!hash || hash === '#') {
      return '/';
    }
    
    // 移除#号并解析参数
    const hashWithoutSymbol = hash.substring(1);
    const [path, queryString] = hashWithoutSymbol.split('?');
    
    return path || '/';
  }

  /**
   * 解析查询参数
   * @param {string} queryString - 查询字符串
   * @returns {Object} 参数对象
   */
  parseQuery(queryString) {
    const params = {};
    if (!queryString) return params;

    queryString.split('&').forEach(param => {
      const [key, value] = param.split('=');
      if (key) {
        params[decodeURIComponent(key)] = decodeURIComponent(value || '');
      }
    });

    return params;
  }

  /**
   * 导航到指定路径
   * @param {string} path - 路径
   * @param {Object} params - 参数
   * @param {boolean} pushState - 是否推入历史记录
   */
  navigate(path, params = {}, pushState = true) {
    const route = this.routes.get(path);
    
    if (!route) {
      console.warn(`Route not found: ${path}`);
      // 导航到首页
      return this.navigate('/', {}, pushState);
    }

    const newRoute = {
      ...route,
      params,
      query: this.parseQuery(window.location.hash.split('?')[1])
    };

    // 更新当前路由
    this.currentRoute = newRoute;

    // 更新URL
    if (pushState) {
      const hash = this.buildHash(path, params);
      window.location.hash = hash;
      
      // 推入历史记录
      window.history.pushState(
        { path, params },
        newRoute.title,
        window.location.pathname + window.location.search + hash
      );
    }

    // 通知路由变化
    this.notifyRouteChange(newRoute);

    return newRoute;
  }

  /**
   * 构建hash
   * @param {string} path - 路径
   * @param {Object} params - 参数
   * @returns {string} hash字符串
   */
  buildHash(path, params = {}) {
    let hash = path === '/' ? '' : path;
    
    const queryParams = Object.entries(params)
      .filter(([key, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`)
      .join('&');

    if (queryParams) {
      hash += `?${queryParams}`;
    }

    return hash;
  }

  /**
   * 获取当前路由
   * @returns {Object|null} 当前路由信息
   */
  getCurrentRoute() {
    return this.currentRoute;
  }

  /**
   * 监听路由变化
   * @param {Function} listener - 监听函数
   * @returns {Function} 取消监听的函数
   */
  onRouteChange(listener) {
    this.listeners.add(listener);
    
    return () => {
      this.listeners.delete(listener);
    };
  }

  /**
   * 通知路由变化
   * @param {Object} route - 路由信息
   */
  notifyRouteChange(route) {
    this.listeners.forEach(listener => {
      try {
        listener(route);
      } catch (error) {
        console.error('Route change listener error:', error);
      }
    });

    // 通知渲染器
    if (this.renderer && typeof this.renderer.handleRouteChange === 'function') {
      this.renderer.handleRouteChange(route);
    }
  }

  /**
   * 销毁路由管理器
   */
  destroy() {
    if (this.isInitialized) {
      window.removeEventListener('hashchange', this.handleHashChange.bind(this));
      window.removeEventListener('popstate', this.handlePopState.bind(this));
      this.listeners.clear();
      this.routes.clear();
      this.currentRoute = null;
      this.isInitialized = false;
    }
  }
}
