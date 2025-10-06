/**
 * Doc SDK 类型定义
 */

import PluginManager from '@/core/PluginManager';
import { ReactNode, ComponentType } from 'react';

// 基础类型
export interface DocConfig {
  title: string;
  description?: string;
  version?: string;
  theme?: Theme | string;
  layout?: LayoutConfig;
  components?: Record<string, ComponentConfig>;
  installation?: string;
  usage?: string;
  features?: Feature[];
  footerLinks?: FooterLink[];
  homeContent?: HomeContent;
  footerContent?: FooterContent;
  plugins?: Plugin[];
  debug?: boolean;
}

// 主题配置
export interface Theme {
  name: string;
  colors?: ThemeColors;
  typography?: ThemeTypography;
  spacing?: ThemeSpacing;
  layout?: ThemeLayout;
  components?: Record<string, string>;
}

export interface ThemeColors {
  primary?: string;
  success?: string;
  warning?: string;
  error?: string;
  text?: string;
  textSecondary?: string;
  textTertiary?: string;
  background?: string;
  backgroundSecondary?: string;
  backgroundTertiary?: string;
  border?: string;
  borderSecondary?: string;
  code?: {
    background?: string;
    text?: string;
  };
}

export interface ThemeTypography {
  fontFamily?: string;
  fontFamilyCode?: string;
  fontSize?: Record<string, string>;
  fontWeight?: Record<string, string | number>;
  lineHeight?: Record<string, string | number>;
}

export interface ThemeSpacing {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  '2xl'?: string;
  '3xl'?: string;
  '4xl'?: string;
}

export interface ThemeLayout {
  borderRadius?: string;
  boxShadow?: string;
  maxWidth?: string;
}

// 布局配置
export interface LayoutConfig {
  type?: 'sidebar' | 'top' | 'mixed';
  sidebar?: SidebarConfig;
  header?: HeaderConfig;
}

export interface SidebarConfig {
  width?: number;
  collapsible?: boolean;
  collapsed?: boolean;
}

export interface HeaderConfig {
  height?: number;
  logo?: string;
  title?: string;
  navigation?: NavigationItem[];
  actions?: HeaderAction[];
}

// 组件配置
export interface ComponentConfig {
  label: string;
  description?: string;
  demos?: DemoConfig[];
  apis?: ApiConfig[];
  group?: string;
  order?: number;
}

export interface DemoConfig {
  title: string;
  desc?: string;
  source: string;
  code?: string;
}

export interface ApiConfig {
  title: string;
  apiKey: string;
  description?: string;
}

// API文档数据
export interface ApiItem {
  param: string;
  type: string;
  desc: string;
  option?: string;
  default?: string;
  required?: boolean;
  deprecated?: boolean;
}

// 导航配置
export interface NavigationItem {
  label: string;
  path?: string;
  children?: NavigationItem[];
  external?: boolean;
}

// 头部操作
export interface HeaderAction {
  type: 'link' | 'button';
  label: string;
  url?: string;
  onClick?: () => void;
  icon?: ReactNode;
}

// 功能特性
export interface Feature {
  icon: string;
  title: string;
  description: string;
}

// 页脚链接
export interface FooterLink {
  text: string;
  url: string;
  external?: boolean;
}

// 首页内容
export interface HomeContent {
  welcome?: {
    title?: string;
    description?: string;
    version?: string;
  };
  features?: Feature[];
  quickStart?: {
    installation?: string;
    usage?: string;
  };
}

// 页脚内容
export interface FooterContent {
  copyright?: string;
  links?: FooterLink[];
  poweredBy?: string;
}

// 插件接口
export interface Plugin {
  name: string;
  version?: string;
  install: (context: PluginContext) => void;
}

export interface PluginContext {
  hooks: HookManager;
  events: EventManager;
  config: ConfigManager;
  theme: ThemeManager;
}

// 钩子管理器
export interface HookManager {
  add: (name: string, handler: Function) => void;
  remove: (name: string, handler: Function) => void;
  call: (name: string, ...args: any[]) => any[];
}

// 事件管理器
export interface EventManager {
  on: (event: string, handler: Function) => void;
  off: (event: string, handler: Function) => void;
  emit: (event: string, data?: any) => void;
}

// 配置管理器接口
export interface ConfigManager {
  get: (path?: string) => any;
  set: (path: string, value: any) => void;
  update: (config: Partial<DocConfig>) => void;
  getConfig: () => DocConfig;
}

// 主题管理器接口
export interface ThemeManager {
  setTheme: (theme: Theme | string) => void;
  applyTheme: () => void;
}

// 组件注册表
export interface ComponentRegistry {
  register: (name: string, component: ComponentType) => void;
  get: (name: string) => ComponentType | undefined;
  getDemo: (componentName: string, demoName: string) => ComponentType | undefined;
  getApi: (componentName: string, apiName: string) => ApiItem[] | undefined;
}

// 路由管理器
export interface RouterManager {
  navigate: (path: string) => void;
  getCurrentRoute: () => string;
  onRouteChange: (handler: (route: string) => void) => void;
}

// 渲染器选项
export interface RendererOptions {
  configManager: ConfigManager;
  themeManager: ThemeManager;
  pluginManager: PluginManager;
}

// 全局注册的组件
export interface GlobalDemos {
  [componentName: string]: {
    [demoName: string]: ComponentType;
  };
}

export interface GlobalDemoCodes {
  [componentName: string]: {
    [demoName: string]: string;
  };
}

export interface GlobalApis {
  [componentName: string]: {
    [apiName: string]: ApiItem[];
  };
}

// 扩展 Window 接口
declare global {
  interface Window {
    __DOC_SDK_DEMOS__?: GlobalDemos;
    __DOC_SDK_DEMO_CODES__?: GlobalDemoCodes;
    __DOC_SDK_APIS__?: GlobalApis;
  }
}
