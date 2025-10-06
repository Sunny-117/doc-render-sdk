/**
 * 默认配置
 */

import type { DocConfig } from '../types';

const defaultConfig: DocConfig = {
  // 站点基本信息
  title: 'Documentation',
  description: 'Component Documentation Site',
  version: '1.0.0',
  
  // 主题配置
  theme: {
    name: 'default',
    colors: {},
    typography: {},
    spacing: {},
    layout: {}
  },
  
  // 布局配置
  layout: {
    type: 'sidebar', // sidebar, top, mixed
    sidebar: {
      width: 280,
      collapsible: true,
    },
    header: {
      height: 64,
    },
  },
  
  // 组件配置
  components: {},
  
  // 插件配置
  plugins: [],
};

export default defaultConfig;
