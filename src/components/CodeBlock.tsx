/**
 * 代码块组件
 */

import React, { useEffect, useRef } from 'react';

const CodeBlock = ({ 
  code, 
  language = 'javascript', 
  theme, 
  showLineNumbers = false,
  highlightLines = [],
  className = ''
}) => {
  const codeRef = useRef(null);
  useEffect(() => {
    // 如果有highlight.js，使用它进行语法高亮
    if (window.hljs && codeRef.current) {
      window.hljs.highlightElement(codeRef.current);
    }
  }, [code, language]);

  const renderLineNumbers = () => {
    if (!showLineNumbers) return null;

    const lines = code.split('\n');
    return (
      <div className="doc-code-line-numbers">
        {lines.map((_, index) => (
          <div 
            key={index} 
            className={`doc-code-line-number ${
              highlightLines.includes(index + 1) ? 'highlighted' : ''
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>
    );
  };

  const renderCode = () => {
    if (showLineNumbers) {
      const lines = code.split('\n');
      return (
        <div className="doc-code-content">
          {lines.map((line, index) => (
            <div 
              key={index}
              className={`doc-code-line ${
                highlightLines.includes(index + 1) ? 'highlighted' : ''
              }`}
            >
              {line || ' '}
            </div>
          ))}
        </div>
      );
    }

    return (
      <pre className="doc-code-content">
        <code 
          ref={codeRef}
          className={`language-${language}`}
        >
          {code}
        </code>
      </pre>
    );
  };

  return (
    <div className={`doc-code-block ${className}`}>
      <div className="doc-code-header">
        <span className="doc-code-language">{language}</span>
      </div>
      
      <div className="doc-code-body">
        {renderLineNumbers()}
        {renderCode()}
      </div>
    </div>
  );
};

export default CodeBlock;
