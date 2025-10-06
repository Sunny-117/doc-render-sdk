/**
 * 导航组件
 */

import React, { useMemo } from 'react';

const Navigation = ({ 
  config, 
  theme, 
  currentRoute, 
  componentRegistry, 
  onNavigate,
  compact = false 
}) => {
  // 生成导航菜单
  const navigationItems = useMemo(() => {
    const navigationConfig = config.navigation || {};
    const { mode = 'auto', groups = [], showHome = true } = navigationConfig;

    const items = [];

    // 添加首页
    if (showHome) {
      items.push({
        id: 'home',
        label: navigationConfig.homeTitle || '首页',
        path: '/',
        type: 'home'
      });
    }

    if (mode === 'manual' && groups.length > 0) {
      // 手动配置模式
      groups.forEach(group => {
        items.push({
          id: group.id,
          label: group.label,
          type: 'group',
          children: group.items || []
        });
      });
    } else {
      // 自动生成模式
      const components = componentRegistry.getComponentIds();
      
      if (components.length > 0) {
        // 按组件分组
        const componentGroup = {
          id: 'components',
          label: '组件',
          type: 'group',
          children: components.map(componentId => {
            const componentConfig = componentRegistry.getComponent(componentId);
            return {
              id: componentId,
              label: componentConfig?.label || componentId,
              path: `/${componentId}`,
              type: 'component'
            };
          })
        };
        
        items.push(componentGroup);
      }
    }

    return items;
  }, [config, componentRegistry]);

  const handleItemClick = (item) => {
    if (item.path && onNavigate) {
      onNavigate(item.path);
    }
  };

  const isItemActive = (item) => {
    if (!currentRoute) return false;
    
    if (item.type === 'home') {
      return currentRoute.path === '/';
    }
    
    if (item.type === 'component') {
      return currentRoute.path === item.path;
    }
    
    return false;
  };

  const renderNavigationItem = (item, level = 0) => {
    const isActive = isItemActive(item);
    const hasChildren = item.children && item.children.length > 0;
    
    if (item.type === 'group') {
      return (
        <div key={item.id} className="doc-navigation-group">
          {!compact && (
            <div className="doc-navigation-group-title">
              {item.label}
            </div>
          )}
          {hasChildren && (
            <div className="doc-navigation-group-items">
              {item.children.map(child => renderNavigationItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    }

    return (
      <a
        key={item.id}
        className={`doc-navigation-item ${isActive ? 'active' : ''} ${compact ? 'compact' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          handleItemClick(item);
        }}
        href={item.path || '#'}
        style={{ paddingLeft: `${16 + level * 16}px` }}
      >
        {item.icon && (
          <span className="doc-navigation-item-icon">
            {item.icon}
          </span>
        )}
        <span className="doc-navigation-item-label">
          {item.label}
        </span>
        {item.badge && (
          <span className="doc-navigation-item-badge">
            {item.badge}
          </span>
        )}
      </a>
    );
  };

  return (
    <nav className={`doc-navigation ${compact ? 'compact' : ''}`}>
      {!compact && config.title && (
        <div className="doc-navigation-title">
          {config.title}
        </div>
      )}
      
      <div className="doc-navigation-items">
        {navigationItems.map(item => renderNavigationItem(item))}
      </div>
    </nav>
  );
};

export default Navigation;
