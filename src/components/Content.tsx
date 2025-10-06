/**
 * 内容区域组件
 */

import React, { useMemo } from 'react';
import Demo from './Demo';
import ApiDoc from './ApiDoc';
import Home from './Home';

const Content = ({ 
  config, 
  theme, 
  currentRoute, 
  componentRegistry, 
  renderer 
}) => {
  // 根据当前路由渲染内容
  const renderContent = useMemo(() => {
    if (!currentRoute) {
      return <div className="doc-content-loading">加载中...</div>;
    }

    // 首页
    if (currentRoute.component === 'home' || currentRoute.path === '/') {
      return (
        <Home 
          config={config}
          theme={theme}
          componentRegistry={componentRegistry}
        />
      );
    }

    // 组件页面
    const componentId = currentRoute.component;
    const componentConfig = componentRegistry.getComponent(componentId);
    
    if (!componentConfig) {
      return (
        <div className="doc-content-not-found">
          <h1>页面未找到</h1>
          <p>组件 "{componentId}" 不存在</p>
        </div>
      );
    }

    return (
      <ComponentPage
        componentId={componentId}
        componentConfig={componentConfig}
        componentRegistry={componentRegistry}
        config={config}
        theme={theme}
        renderer={renderer}
      />
    );
  }, [currentRoute, componentRegistry, config, theme, renderer]);

  return (
    <main className="doc-content">
      <div className="doc-content-container">
        {renderContent}
      </div>
    </main>
  );
};

// 组件页面
const ComponentPage = ({ 
  componentId, 
  componentConfig, 
  componentRegistry, 
  config, 
  theme, 
  renderer 
}) => {
  const demos = componentRegistry.getDemos(componentId);
  const apis = componentRegistry.getApis(componentId);

  return (
    <div className="doc-component-page">
      {/* 页面标题 */}
      <div className="doc-component-header">
        <h1 className="doc-component-title">
          {componentConfig.label || componentId}
        </h1>
        {componentConfig.description && (
          <p className="doc-component-description">
            {componentConfig.description}
          </p>
        )}
        {componentConfig.version && (
          <div className="doc-component-version">
            版本: {componentConfig.version}
          </div>
        )}
      </div>

      {/* Demo 展示 */}
      {demos.size > 0 && (
        <div className="doc-component-demos">
          <h2 className="doc-component-section-title">示例</h2>
          {Array.from(demos.values()).map((demo, index) => (
            <Demo
              key={demo.source || index}
              demo={demo}
              componentId={componentId}
              config={config}
              theme={theme}
              renderer={renderer}
            />
          ))}
        </div>
      )}

      {/* API 文档 */}
      {apis.size > 0 && (
        <div className="doc-component-apis">
          <h2 className="doc-component-section-title" id="api">
            API
          </h2>
          {Array.from(apis.values()).map((api, index) => (
            <ApiDoc
              key={api.apiKey || index}
              api={api}
              componentId={componentId}
              config={config}
              theme={theme}
            />
          ))}
        </div>
      )}

      {/* 额外内容 */}
      {componentConfig.extra && (
        <div className="doc-component-extra">
          {typeof componentConfig.extra === 'function' 
            ? componentConfig.extra({ componentId, config, theme })
            : componentConfig.extra
          }
        </div>
      )}
    </div>
  );
};

export default Content;
