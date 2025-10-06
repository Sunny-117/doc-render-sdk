/**
 * 插件管理器
 * 负责管理文档站点的插件系统
 */

export default class PluginManager {
  configManager: any;
  plugins: Map<any, any>;
  hooks: Map<any, any>;
  renderer: any;
  constructor(configManager) {
    this.configManager = configManager;
    this.plugins = new Map();
    this.hooks = new Map();
    this.renderer = null;
  }

  /**
   * 初始化插件管理器
   * @param {DocRenderer} renderer - 文档渲染器实例
   */
  initialize(renderer) {
    this.renderer = renderer;
    
    // 加载配置中的插件
    const pluginConfigs = this.configManager.get('plugins', []);
    pluginConfigs.forEach(pluginConfig => {
      this.loadPlugin(pluginConfig);
    });
  }

  /**
   * 注册插件
   * @param {Object} plugin - 插件对象
   * @returns {boolean} 注册是否成功
   */
  register(plugin) {
    try {
      // 验证插件
      if (!this.validatePlugin(plugin)) {
        return false;
      }

      const { name, version = '1.0.0' } = plugin;
      
      // 检查插件是否已存在
      if (this.plugins.has(name)) {
        console.warn(`Plugin "${name}" already registered`);
        return false;
      }

      // 存储插件
      this.plugins.set(name, {
        ...plugin,
        version,
        status: 'registered'
      });

      // 如果渲染器已初始化，立即激活插件
      if (this.renderer) {
        this.activatePlugin(name);
      }

      return true;
    } catch (error) {
      console.error(`Failed to register plugin:`, error);
      return false;
    }
  }

  /**
   * 加载插件
   * @param {Object|string} pluginConfig - 插件配置或插件名称
   */
  async loadPlugin(pluginConfig) {
    try {
      let plugin;

      if (typeof pluginConfig === 'string') {
        // 通过名称加载插件
        plugin = await this.loadPluginByName(pluginConfig);
      } else if (typeof pluginConfig === 'object') {
        if (pluginConfig.name && !pluginConfig.install) {
          // 配置对象，需要加载插件
          plugin = await this.loadPluginByName(pluginConfig.name);
          plugin.config = pluginConfig.config || {};
        } else {
          // 直接的插件对象
          plugin = pluginConfig;
        }
      }

      if (plugin) {
        this.register(plugin);
      }
    } catch (error) {
      console.error(`Failed to load plugin:`, error);
    }
  }

  /**
   * 通过名称加载插件
   * @param {string} name - 插件名称
   * @returns {Object} 插件对象
   */
  async loadPluginByName(name) {
    // 尝试从全局注册的插件中获取
    // @ts-expect-error
    const globalPlugin = window.__DOC_SDK_PLUGINS__?.[name];
    if (globalPlugin) {
      return globalPlugin;
    }

    // 尝试动态导入 (暂时禁用以避免构建错误)
    // try {
    //   const module = await import(`../plugins/${name}`);
    //   return module.default || module;
    // } catch (error) {
    //   throw new Error(`Plugin "${name}" not found`);
    // }

    throw new Error(`Plugin "${name}" not found`);
  }

  /**
   * 激活插件
   * @param {string} name - 插件名称
   */
  activatePlugin(name) {
    const plugin = this.plugins.get(name);
    if (!plugin || plugin.status === 'active') {
      return;
    }

    try {
      // 创建插件上下文
      const context = this.createPluginContext(plugin);

      // 调用插件的install方法
      if (typeof plugin.install === 'function') {
        plugin.install(context);
      }

      // 更新插件状态
      plugin.status = 'active';
      
      console.log(`Plugin "${name}" activated`);
    } catch (error) {
      console.error(`Failed to activate plugin "${name}":`, error);
      plugin.status = 'error';
    }
  }

  /**
   * 停用插件
   * @param {string} name - 插件名称
   */
  deactivatePlugin(name) {
    const plugin = this.plugins.get(name);
    if (!plugin || plugin.status !== 'active') {
      return;
    }

    try {
      // 调用插件的uninstall方法
      if (typeof plugin.uninstall === 'function') {
        plugin.uninstall();
      }

      // 移除插件注册的钩子
      this.removePluginHooks(name);

      // 更新插件状态
      plugin.status = 'inactive';
      
      console.log(`Plugin "${name}" deactivated`);
    } catch (error) {
      console.error(`Failed to deactivate plugin "${name}":`, error);
    }
  }

  /**
   * 创建插件上下文
   * @param {Object} plugin - 插件对象
   * @returns {Object} 插件上下文
   */
  createPluginContext(plugin) {
    return {
      // 插件信息
      plugin: {
        name: plugin.name,
        version: plugin.version,
        config: plugin.config || {}
      },
      
      // 渲染器实例
      renderer: this.renderer,
      
      // 配置管理器
      config: this.configManager,
      
      // 主题管理器
      theme: this.renderer?.themeManager,
      
      // 组件注册表
      components: this.renderer.componentRegistry,
      
      // 路由管理器
      router: this.renderer.routerManager,
      
      // 钩子系统
      hooks: {
        add: this.addHook.bind(this),
        remove: this.removeHook.bind(this),
        call: this.callHook.bind(this)
      },
      
      // 事件系统
      events: {
        on: this.renderer.on.bind(this.renderer),
        off: this.renderer.off.bind(this.renderer),
        emit: this.renderer.emit.bind(this.renderer)
      }
    };
  }

  /**
   * 添加钩子
   * @param {string} hookName - 钩子名称
   * @param {Function} handler - 处理函数
   * @param {string} pluginName - 插件名称
   */
  addHook(hookName, handler, pluginName) {
    if (!this.hooks.has(hookName)) {
      this.hooks.set(hookName, []);
    }
    
    this.hooks.get(hookName).push({
      handler,
      plugin: pluginName
    });
  }

  /**
   * 移除钩子
   * @param {string} hookName - 钩子名称
   * @param {Function} handler - 处理函数
   */
  removeHook(hookName, handler) {
    const hooks = this.hooks.get(hookName);
    if (hooks) {
      const index = hooks.findIndex(hook => hook.handler === handler);
      if (index !== -1) {
        hooks.splice(index, 1);
      }
    }
  }

  /**
   * 移除插件的所有钩子
   * @param {string} pluginName - 插件名称
   */
  removePluginHooks(pluginName) {
    this.hooks.forEach((hooks, hookName) => {
      const filteredHooks = hooks.filter(hook => hook.plugin !== pluginName);
      this.hooks.set(hookName, filteredHooks);
    });
  }

  /**
   * 调用钩子
   * @param {string} hookName - 钩子名称
   * @param {...any} args - 参数
   * @returns {Array} 钩子返回值数组
   */
  callHook(hookName, ...args) {
    const hooks = this.hooks.get(hookName);
    if (!hooks || hooks.length === 0) {
      return [];
    }

    const results: any[] = [];
    hooks.forEach(({ handler, plugin }) => {
      try {
        const result = handler(...args);
        results.push(result);
      } catch (error) {
        console.error(`Hook "${hookName}" error in plugin "${plugin}":`, error);
      }
    });

    return results;
  }

  /**
   * 验证插件
   * @param {Object} plugin - 插件对象
   * @returns {boolean} 是否有效
   */
  validatePlugin(plugin) {
    if (!plugin || typeof plugin !== 'object') {
      console.error('Plugin must be an object');
      return false;
    }

    if (!plugin.name || typeof plugin.name !== 'string') {
      console.error('Plugin must have a name');
      return false;
    }

    if (!plugin.install || typeof plugin.install !== 'function') {
      console.error('Plugin must have an install function');
      return false;
    }

    return true;
  }

  /**
   * 获取插件信息
   * @param {string} name - 插件名称
   * @returns {Object|null} 插件信息
   */
  getPlugin(name) {
    return this.plugins.get(name) || null;
  }

  /**
   * 获取所有插件
   * @returns {Array} 插件数组
   */
  getPlugins() {
    return Array.from(this.plugins.values());
  }

  /**
   * 获取活跃插件
   * @returns {Array} 活跃插件数组
   */
  getActivePlugins() {
    return this.getPlugins().filter(plugin => plugin.status === 'active');
  }

  /**
   * 销毁插件管理器
   */
  destroy() {
    // 停用所有插件
    this.plugins.forEach((plugin, name) => {
      if (plugin.status === 'active') {
        this.deactivatePlugin(name);
      }
    });

    this.plugins.clear();
    this.hooks.clear();
    this.renderer = null;
  }
}
