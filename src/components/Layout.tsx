/**
 * 主布局组件
 */

import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import Header from './Header';
import Content from './Content';
import Footer from './Footer';

const Layout = ({ 
  config, 
  theme, 
  renderer, 
  routerManager, 
  componentRegistry,
  onRouteChange 
}) => {
  const [currentRoute, setCurrentRoute] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    // 监听路由变化
    const unsubscribe = routerManager.onRouteChange((route) => {
      setCurrentRoute(route);
      if (onRouteChange) {
        onRouteChange(route);
      }
    });

    // 获取初始路由
    setCurrentRoute(routerManager.getCurrentRoute());

    return unsubscribe;
  }, [routerManager, onRouteChange]);

  const layoutConfig = config.layout || {};
  const { type = 'sidebar' } = layoutConfig;

  const handleSidebarToggle = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleNavigate = (path, params) => {
    routerManager.navigate(path, params);
  };

  // 渲染侧边栏布局
  const renderSidebarLayout = () => (
    <div className="doc-layout doc-layout-sidebar-type">
      <Header 
        config={config}
        theme={theme}
        currentRoute={currentRoute}
        sidebarCollapsed={sidebarCollapsed}
        onSidebarToggle={handleSidebarToggle}
      />
      
      <div className="doc-layout-content">
        {!sidebarCollapsed && (
          <div className="doc-layout-sidebar">
            <Navigation
              config={config}
              theme={theme}
              currentRoute={currentRoute}
              componentRegistry={componentRegistry}
              onNavigate={handleNavigate}
            />
          </div>
        )}
        
        <div className="doc-layout-main">
          <Content
            config={config}
            theme={theme}
            currentRoute={currentRoute}
            componentRegistry={componentRegistry}
            renderer={renderer}
          />
        </div>
      </div>
      
      {layoutConfig.footer?.show !== false && (
        <Footer 
          config={config}
          theme={theme}
        />
      )}
    </div>
  );

  // 渲染顶部导航布局
  const renderTopLayout = () => (
    <div className="doc-layout doc-layout-top-type">
      <Header 
        config={config}
        theme={theme}
        currentRoute={currentRoute}
        showNavigation={true}
        componentRegistry={componentRegistry}
        onNavigate={handleNavigate}
      />
      
      <div className="doc-layout-content">
        <div className="doc-layout-main">
          <Content
            config={config}
            theme={theme}
            currentRoute={currentRoute}
            componentRegistry={componentRegistry}
            renderer={renderer}
          />
        </div>
      </div>
      
      {layoutConfig.footer?.show !== false && (
        <Footer 
          config={config}
          theme={theme}
        />
      )}
    </div>
  );

  // 渲染混合布局
  const renderMixedLayout = () => (
    <div className="doc-layout doc-layout-mixed-type">
      <Header 
        config={config}
        theme={theme}
        currentRoute={currentRoute}
        showNavigation={true}
        componentRegistry={componentRegistry}
        onNavigate={handleNavigate}
      />
      
      <div className="doc-layout-content">
        <div className="doc-layout-sidebar">
          <Navigation
            config={config}
            theme={theme}
            currentRoute={currentRoute}
            componentRegistry={componentRegistry}
            onNavigate={handleNavigate}
            compact={true}
          />
        </div>
        
        <div className="doc-layout-main">
          <Content
            config={config}
            theme={theme}
            currentRoute={currentRoute}
            componentRegistry={componentRegistry}
            renderer={renderer}
          />
        </div>
      </div>
      
      {layoutConfig.footer?.show !== false && (
        <Footer 
          config={config}
          theme={theme}
        />
      )}
    </div>
  );

  // 根据布局类型渲染
  switch (type) {
    case 'top':
      return renderTopLayout();
    case 'mixed':
      return renderMixedLayout();
    case 'sidebar':
    default:
      return renderSidebarLayout();
  }
};

export default Layout;
