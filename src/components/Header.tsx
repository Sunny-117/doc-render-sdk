/**
 * 头部组件
 */

import React, { useState } from 'react';

const Header = ({ 
  config, 
  theme, 
  currentRoute,
  sidebarCollapsed,
  onSidebarToggle,
  showNavigation = false,
  componentRegistry,
  onNavigate
}) => {
  
  const headerConfig = config.layout?.header || {};

  const renderLogo = () => {
    if (!headerConfig.showLogo) return null;

    return (
      <div className="doc-header-logo">
        {config.logo ? (
          <img src={config.logo} alt={config.title} />
        ) : (
          <div className="doc-header-logo-placeholder">
            📚
          </div>
        )}
      </div>
    );
  };

  const renderTitle = () => {
    if (!headerConfig.showTitle || !config.title) return null;

    return (
      <div className="doc-header-title">
        {config.title}
        {config.version && (
          <span className="doc-header-version">
            v{config.version}
          </span>
        )}
      </div>
    );
  };

  const renderNavigation = () => {
    if (!showNavigation || !componentRegistry) return null;

    const components = componentRegistry.getComponentIds();
    
    return (
      <nav className="doc-header-navigation">
        <a 
          className={`doc-header-nav-item ${currentRoute?.path === '/' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            onNavigate?.('/');
          }}
          href="/"
        >
          首页
        </a>
        
        {components.map(componentId => {
          const componentConfig = componentRegistry.getComponent(componentId);
          const path = `/${componentId}`;
          const isActive = currentRoute?.path === path;
          
          return (
            <a
              key={componentId}
              className={`doc-header-nav-item ${isActive ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                onNavigate?.(path);
              }}
              href={path}
            >
              {componentConfig?.label || componentId}
            </a>
          );
        })}
      </nav>
    );
  };

  const renderActions = () => {
    return (
      <div className="doc-header-actions">
        {/* 侧边栏切换按钮 */}
        {onSidebarToggle && (
          <button
            className="doc-header-action doc-header-sidebar-toggle"
            onClick={onSidebarToggle}
            title={sidebarCollapsed ? '展开侧边栏' : '收起侧边栏'}
          >
            {sidebarCollapsed ? '☰' : '✕'}
          </button>
        )}

        {/* GitHub链接 */}
        {config.github && (
          <a
            className="doc-header-action doc-header-github"
            href={config.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
        )}
      </div>
    );
  };

  return (
    <>
      <header className="doc-header">
        <div className="doc-header-content">
          <div className="doc-header-left">
            {renderLogo()}
            {renderTitle()}
          </div>

          {renderNavigation()}

          <div className="doc-header-right">
            {renderActions()}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
