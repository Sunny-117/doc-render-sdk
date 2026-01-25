/**
 * 代码块组件
 */

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { EditorState } from '@codemirror/state';
import { EditorView, keymap, lineNumbers, highlightActiveLineGutter, highlightActiveLine } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import { defaultKeymap, indentWithTab } from '@codemirror/commands';

const CodeBlock = ({ 
  code, 
  language = 'javascript', 
  theme, 
  showLineNumbers = false,
  highlightLines = [],
  className = '',
  onChange,
  // editable = true
}: {
  code: string;
  language?: string;
  theme?: any;
  showLineNumbers?: boolean;
  highlightLines?: number[];
  className?: string;
  onChange?: (code: string) => void;
  // editable?: boolean;
}) => {
  const editable = false;
  const containerRef = useRef<HTMLDivElement | null>(null);
  const editorRef = useRef<EditorView | null>(null);
  const [internalCode, setInternalCode] = useState(code);

  // 处理代码变化的回调
  const handleCodeChange = useCallback((newCode) => {
    setInternalCode(newCode);
    if (onChange) {
      onChange(newCode);
    }
  }, [onChange]);

  useEffect(() => {
    if (!containerRef.current) return;

    // 初始化编辑器状态
    const startState = EditorState.create({
      doc: internalCode,
      extensions: [
        lineNumbers(),
        highlightActiveLineGutter(),
        highlightActiveLine(),
        javascript(),
        oneDark,
        keymap.of([...defaultKeymap, indentWithTab]),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            handleCodeChange(update.state.doc.toString());
          }
        }),
        EditorView.lineWrapping,
        EditorView.editable.of(editable),
        // 自定义样式
        EditorView.theme({
          '&': {
            height: '100%',
            fontSize: '14px',
            lineHeight: '1.5'
          },
          '.cm-content': {
            fontFamily: '"Fira Code", "Consolas", monospace'
          },
          '.cm-gutters': {
            borderRight: '1px solid #333'
          }
        })
      ]
    });

    // 创建编辑器视图
    const view = new EditorView({
      state: startState,
      parent: containerRef.current
    });

    editorRef.current = view;

    // 清理函数
    return () => {
      view.destroy();
    };
  }, [internalCode, editable, handleCodeChange]);

  // 当外部code prop变化时，更新编辑器内容
  useEffect(() => {
    if (code !== internalCode && editorRef.current) {
      editorRef.current.dispatch({
        changes: {
          from: 0,
          to: editorRef.current.state.doc.length,
          insert: code
        }
      });
      setInternalCode(code);
    }
  }, [code]);

  return (
    <div className={`doc-code-block ${className}`}>
      <div className="doc-code-header">
        <span className="doc-code-language">{language}</span>
        {editable && <span className="doc-code-edit-mode">编辑模式</span>}
      </div>
      
      <div className="doc-code-body" style={{ position: 'relative', height: '100%' }}>
        <div ref={containerRef} style={{ height: '100%' }} />
      </div>
    </div>
  );
};

export default CodeBlock;
