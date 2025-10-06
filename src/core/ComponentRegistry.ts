/**
 * 组件注册表
 * 负责管理和注册文档组件
 */

export default class ComponentRegistry {
  apis: Map<any, any>;
  demos: Map<any, any>;
  components: Map<any, any>;
  renderer: any;
  constructor(renderer) {
    this.renderer = renderer;
    this.components = new Map();
    this.demos = new Map();
    this.apis = new Map();
  }

  /**
   * 注册组件
   * @param {string} componentId - 组件ID
   * @param {Object} componentConfig - 组件配置
   */
  async register(componentId, componentConfig) {
    try {
      // 存储组件配置
      this.components.set(componentId, componentConfig);

      // 注册demos
      if (componentConfig.demos && Array.isArray(componentConfig.demos)) {
        await this.registerDemos(componentId, componentConfig.demos);
      }

      // 注册APIs
      if (componentConfig.apis && Array.isArray(componentConfig.apis)) {
        await this.registerApis(componentId, componentConfig.apis);
      }

      return true;
    } catch (error) {
      console.error(`Failed to register component ${componentId}:`, error);
      return false;
    }
  }

  /**
   * 注册组件demos
   * @param {string} componentId - 组件ID
   * @param {Array} demos - demo配置数组
   */
  async registerDemos(componentId, demos) {
    const componentDemos = new Map();

    for (const demo of demos) {
      try {
        const demoComponent = await this.loadDemo(componentId, demo);
        const demoCode = await this.loadDemoCode(componentId, demo);
        
        componentDemos.set(demo.source, {
          ...demo,
          component: demoComponent,
          code: demoCode
        });
      } catch (error) {
        console.error(`Failed to load demo ${demo.source} for component ${componentId}:`, error);
      }
    }

    this.demos.set(componentId, componentDemos);
  }

  /**
   * 加载demo组件
   * @param {string} componentId - 组件ID
   * @param {Object} demo - demo配置
   * @returns {React.Component} demo组件
   */
  async loadDemo(componentId, demo) {
    // 这里可以根据不同的加载策略来实现
    // 例如：动态import、require.context等
    try {
      // 尝试动态导入
      const demoPath = `../components/${componentId}/demo/${demo.source}`;
      console.log({demoPath})
      const module = await import(demoPath);
      return module.default || module;
    } catch (error) {
      // 如果动态导入失败，尝试从全局注册的组件中获取
      const globalDemo = window.__DOC_SDK_DEMOS__?.[componentId]?.[demo.source];
      if (globalDemo) {
        return globalDemo;
      }
      
      throw new Error(`Demo component not found: ${componentId}/${demo.source}`);
    }
  }

  /**
   * 加载demo源码
   * @param {string} componentId - 组件ID
   * @param {Object} demo - demo配置
   * @returns {string} demo源码
   */
  async loadDemoCode(componentId, demo) {
    try {
      // 尝试从全局注册的代码中获取
      const globalCode = window.__DOC_SDK_DEMO_CODES__?.[componentId]?.[demo.source];
      if (globalCode) {
        return globalCode;
      }

      // 如果没有预加载的代码，返回占位符
      return `// Demo code for ${componentId}/${demo.source}\n// Code not available`;
    } catch (error) {
      console.error(`Failed to load demo code: ${componentId}/${demo.source}`, error);
      return '// Code not available';
    }
  }

  /**
   * 注册组件APIs
   * @param {string} componentId - 组件ID
   * @param {Array} apis - API配置数组
   */
  async registerApis(componentId, apis) {
    const componentApis = new Map();

    for (const api of apis) {
      try {
        const apiData = await this.loadApiData(componentId, api);
        componentApis.set(api.apiKey, {
          ...api,
          data: apiData
        });
      } catch (error) {
        console.error(`Failed to load API ${api.apiKey} for component ${componentId}:`, error);
      }
    }

    this.apis.set(componentId, componentApis);
  }

  /**
   * 加载API数据
   * @param {string} componentId - 组件ID
   * @param {Object} api - API配置
   * @returns {Array} API数据
   */
  async loadApiData(componentId, api) {
    try {
      // 尝试从全局注册的API数据中获取
      const globalApiData = window.__DOC_SDK_APIS__?.[componentId]?.[api.apiKey];
      console.log(globalApiData, 'globalApiData')
      if (globalApiData) {
        return globalApiData;
      }

      // 尝试动态导入
      const apiPath = `../components/${componentId}/api`;
      const module = await import(apiPath);
      const apiData = module.default || module;
      
      return apiData[api.apiKey] || [];
    } catch (error) {
      console.error(`Failed to load API data: ${componentId}/${api.apiKey}`, error);
      return [];
    }
  }

  /**
   * 获取组件配置
   * @param {string} componentId - 组件ID
   * @returns {Object|null} 组件配置
   */
  getComponent(componentId) {
    return this.components.get(componentId) || null;
  }

  /**
   * 获取组件demos
   * @param {string} componentId - 组件ID
   * @returns {Map} demos Map
   */
  getDemos(componentId) {
    return this.demos.get(componentId) || new Map();
  }

  /**
   * 获取特定demo
   * @param {string} componentId - 组件ID
   * @param {string} demoSource - demo源
   * @returns {Object|null} demo对象
   */
  getDemo(componentId, demoSource) {
    const componentDemos = this.getDemos(componentId);
    return componentDemos.get(demoSource) || null;
  }

  /**
   * 获取组件APIs
   * @param {string} componentId - 组件ID
   * @returns {Map} APIs Map
   */
  getApis(componentId) {
    return this.apis.get(componentId) || new Map();
  }

  /**
   * 获取特定API
   * @param {string} componentId - 组件ID
   * @param {string} apiKey - API键
   * @returns {Object|null} API对象
   */
  getApi(componentId, apiKey) {
    const componentApis = this.getApis(componentId);
    return componentApis.get(apiKey) || null;
  }

  /**
   * 获取所有注册的组件ID
   * @returns {Array} 组件ID数组
   */
  getComponentIds() {
    return Array.from(this.components.keys());
  }

  /**
   * 检查组件是否已注册
   * @param {string} componentId - 组件ID
   * @returns {boolean} 是否已注册
   */
  hasComponent(componentId) {
    return this.components.has(componentId);
  }

  /**
   * 清空注册表
   */
  clear() {
    this.components.clear();
    this.demos.clear();
    this.apis.clear();
  }
}
