import React from 'react';
import DocSDK from 'doc-render-sdk';

// 从原有doc目录迁移的组件
import featDemo from './components/feat/demo/index.jsx';

// 模拟原有的工具函数
const getSpecialColumnsRender = (field) => {
  return field && typeof field.map === 'function' 
    ? field.map(f => `<div style="line-height: 19px">${f}</div>`).join('')
    : field;
};

// 注册全局组件和代码
window.__DOC_SDK_DEMOS__ = {
  'feat': {
    'normal': featDemo
  }
};

window.__DOC_SDK_DEMO_CODES__ = {
  'feat': {
    'normal': `import React, {PureComponent} from 'react';
import {Button} from 'one-ui';
import {IconQuestionCircle} from 'dls-icons-react';
import TestService from '../../../ReportSdkTestService';
import SDK from 'sdk';
import {getSpecialColumnsRender} from '../../../utils';

const hourMap = {
    '0': '0:00 ~ 1:00',
    '1': '1:00 ~ 2:00',
    // ... 其他时间映射
};

const getCookie = name => {
    let arr = null;
    const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
    if (arr = document.cookie.match(reg)) {
        return unescape(arr[2]);
    } else {
        return null;
    }
};

const Operate = (text, column) => {
    if (column.isSummeryRow) {
        return '-';
    }
    return (
        <div>
            <Button type="text-strong" size="small">编辑</Button>
            <Button type="text-strong" size="small">删除</Button>
        </div>
    );
};

export default class Normal extends PureComponent {
    componentDidMount() {
        this.service = new TestService({
            token: '9a21f7c3-b9e1-11ea-947a-6c92bf28d381',
            hairuo: {
                userId: getCookie('CPID_3'),
                optId: getCookie('CPID_3'),
            }
        });

        const config = {
            mode: 'embed',
            tableReportType: 2208157,
            token: '9a21f7c3-b9e1-11ea-947a-6c92bf28d381',
            // ... 完整配置
        };
        
        this.sdkEntry = new ReportSdkEntry(config);
        this.sdkEntry.init('report-sdk-normal-demo');
    }

    render() {
        return (
            <div style={{backgroundColor: '#f6f7fa'}}>
                <div id="report-sdk-normal-demo"></div>
            </div>
        );
    }
}`
  }
};

window.__DOC_SDK_APIS__ = {
  'feat': {
    'feat': [
      {
        param: 'mode',
        type: 'string',
        desc: '渲染模式',
        option: 'embed | standalone',
        default: 'embed',
        required: true
      },
      {
        param: 'token',
        type: 'string',
        desc: '访问令牌',
        option: '',
        default: '',
        required: true
      },
    ]
  }
};

// 创建文档SDK实例
const docSdk = new DocSDK({
  title: 'doc-render-sdk',
  description: '文档 SDK',
  version: '0.0.1',
  
  // 主题配置
  theme: {
    name: 'default',
    colors: {
      primary: '#1890ff'
    }
  },
  
  // 布局配置
  layout: {
    type: 'sidebar',
    sidebar: {
      width: 280,
      collapsible: true
    }
  },
  
  // 组件配置
  components: {
    'feat': {
      label: 'feat label',
      description: '特性描述',
      demos: [
        {
          title: '普通feat',
          desc: '普通feat有xxx',
          source: 'normal'
        }
      ],
      apis: [
        {
          title: 'feat',
          apiKey: 'feat'
        }
      ]
    }
  },
  
  // 首页配置
  installation: 'npm install sdk',
  usage: `import SDK from sdk';

const config = {};

const sdkEntry = new SDK(config);
sdkEntry.init('id');`,
  
  features: [
    {
      icon: '📊',
      title: '丰富的图表类型',
      description: '支持折线图、柱状图、饼图等多种图表类型，满足不同的数据展示需求。'
    },
    {
      icon: '🔍',
      title: '强大的筛选功能',
      description: '提供时间筛选、维度筛选、指标对比等多种筛选方式。'
    },
    {
      icon: '📱',
      title: '响应式设计',
      description: '完美适配桌面端和移动端，提供一致的用户体验。'
    },
    {
      icon: '⚡',
      title: '高性能渲染',
      description: '采用虚拟滚动和懒加载技术，支持大数据量的流畅展示。'
    }
  ],
  
  
  // 页脚配置
  footerLinks: [
    {
      text: 'GitHub',
      url: 'https://github.com/Sunny-117/doc-render-sdk',
      external: true
    },
    {
      text: '更新日志',
      url: '#/changelog'
    }
  ]
});

// 渲染文档
docSdk.render('#app');
