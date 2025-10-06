/**
 * 首页组件
 */

import React from 'react';

const Home = ({ config, theme, componentRegistry }) => {
  const components = componentRegistry.getComponentIds();

  const renderWelcome = () => (
    <div className="doc-home-welcome">
      <h1 className="doc-home-title">
        {config.title || 'Documentation'}
      </h1>
      
      {config.description && (
        <p className="doc-home-description">
          {config.description}
        </p>
      )}

      {config.version && (
        <div className="doc-home-version">
          当前版本: <code>{config.version}</code>
        </div>
      )}
    </div>
  );

  const renderQuickStart = () => {
    if (config.quickStart === false) return null;

    return (
      <div className="doc-home-section">
        <h2 className="doc-home-section-title">快速开始</h2>
        
        {config.installation && (
          <div className="doc-home-installation">
            <h3>安装</h3>
            <pre className="doc-home-code">
              <code>{config.installation}</code>
            </pre>
          </div>
        )}

        {config.usage && (
          <div className="doc-home-usage">
            <h3>使用</h3>
            <pre className="doc-home-code">
              <code>{config.usage}</code>
            </pre>
          </div>
        )}
      </div>
    );
  };

  const renderComponents = () => {
    if (components.length === 0) return null;

    return (
      <div className="doc-home-section">
        <h2 className="doc-home-section-title">组件列表</h2>
        
        <div className="doc-home-components">
          {components.map(componentId => {
            const componentConfig = componentRegistry.getComponent(componentId);
            const demos = componentRegistry.getDemos(componentId);
            
            return (
              <div key={componentId} className="doc-home-component-card">
                <h3 className="doc-home-component-title">
                  <a href={`#/${componentId}`}>
                    {componentConfig?.label || componentId}
                  </a>
                </h3>
                
                {componentConfig?.description && (
                  <p className="doc-home-component-description">
                    {componentConfig.description}
                  </p>
                )}

                <div className="doc-home-component-meta">
                  <span className="doc-home-component-demos">
                    {demos.size} 个示例
                  </span>
                  
                  {componentConfig?.version && (
                    <span className="doc-home-component-version">
                      v{componentConfig.version}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderFeatures = () => {
    if (!config.features || !Array.isArray(config.features)) return null;

    return (
      <div className="doc-home-section">
        <h2 className="doc-home-section-title">特性</h2>
        
        <div className="doc-home-features">
          {config.features.map((feature, index) => (
            <div key={index} className="doc-home-feature">
              {feature.icon && (
                <div className="doc-home-feature-icon">
                  {feature.icon}
                </div>
              )}
              
              <h3 className="doc-home-feature-title">
                {feature.title}
              </h3>
              
              {feature.description && (
                <p className="doc-home-feature-description">
                  {feature.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderCustomContent = () => {
    if (!config.homeContent) return null;

    if (typeof config.homeContent === 'function') {
      const CustomContent = config.homeContent;
      return <CustomContent config={config} theme={theme} componentRegistry={componentRegistry} />;
    }

    if (typeof config.homeContent === 'string') {
      return (
        <div 
          className="doc-home-custom-content"
          dangerouslySetInnerHTML={{ __html: config.homeContent }}
        />
      );
    }

    return config.homeContent;
  };

  return (
    <div className="doc-home">
      {renderWelcome()}
      {renderQuickStart()}
      {renderFeatures()}
      {renderComponents()}
      {renderCustomContent()}
    </div>
  );
};

export default Home;
