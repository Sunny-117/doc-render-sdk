/**
 * Demo展示组件
 */

import React, { useState, useRef, useEffect } from 'react';
import CodeBlock from './CodeBlock';

const Demo = ({ 
  demo, 
  componentId, 
  config, 
  theme, 
  renderer 
}) => {
  const [codeVisible, setCodeVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const demoRef = useRef(null);
  
  const demoConfig = config.demo || {};
  const { 
    showCode = true, 
    codeCollapsed = true, 
    showCopyButton = true, 
    showExpandButton = true 
  } = demoConfig;

  useEffect(() => {
    // 初始化代码显示状态
    setCodeVisible(!codeCollapsed);
  }, [codeCollapsed]);

  const handleCodeToggle = () => {
    setCodeVisible(!codeVisible);
  };

  const handleCopyCode = async () => {
    if (!demo.code) return;

    try {
      await navigator.clipboard.writeText(demo.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  };

  const renderDemo = () => {
    if (!demo.component) {
      return (
        <div className="doc-demo-error">
          <p>Demo组件加载失败</p>
        </div>
      );
    }

    try {
      const DemoComponent = demo.component;
      return <DemoComponent />;
    } catch (error) {
      console.error('Demo render error:', error);
      return (
        <div className="doc-demo-error">
          <p>Demo渲染出错: {error.message}</p>
        </div>
      );
    }
  };

  const renderDescription = () => {
    if (!demo.desc) return null;

    // 支持HTML描述
    if (demo.descFlag === false) {
      return <div className="doc-demo-description">{demo.desc}</div>;
    }

    // 支持样式化文本（{} 包围的内容会被样式化）
    const styledDesc = demo.desc.replace(
      /{([^}]+)}/g, 
      '<span class="doc-demo-highlight">$1</span>'
    );

    return (
      <div 
        className="doc-demo-description"
        dangerouslySetInnerHTML={{ __html: styledDesc }}
      />
    );
  };

  return (
    <div className="doc-demo" data-demo={demo.source}>
      {/* Demo 标题和描述 */}
      <div className="doc-demo-header">
        <h3 className="doc-demo-title">{demo.title}</h3>
        {renderDescription()}
      </div>

      {/* Demo 内容 */}
      <div className="doc-demo-content" ref={demoRef}>
        {renderDemo()}
      </div>

      {/* 代码展示 */}
      {showCode && demo.code && (
        <>
          {codeVisible && (
            <div className="doc-demo-code">
              <CodeBlock
                code={demo.code}
                language="jsx"
                theme={theme}
                showLineNumbers={true}
              />
            </div>
          )}

          {/* 操作按钮 */}
          <div className="doc-demo-actions">
            {showCopyButton && (
              <button
                className="doc-demo-action"
                onClick={handleCopyCode}
                title="复制代码"
              >
                {copied ? '已复制' : '复制代码'}
              </button>
            )}

            {showExpandButton && (
              <button
                className="doc-demo-action"
                onClick={handleCodeToggle}
                title={codeVisible ? '隐藏代码' : '显示代码'}
              >
                {codeVisible ? '隐藏代码' : '显示代码'}
              </button>
            )}

            {/* 在新窗口打开 */}
            <button
              className="doc-demo-action"
              onClick={() => {
                // 触发事件，让外部处理
                renderer?.emit('demo.openInNewWindow', {
                  componentId,
                  demo
                });
              }}
              title="在新窗口打开"
            >
              新窗口打开
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Demo;
