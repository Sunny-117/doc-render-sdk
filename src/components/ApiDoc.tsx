/**
 * API文档组件
 */

import React from 'react';

const ApiDoc = ({ 
  api, 
  componentId, 
  config, 
  theme 
}) => {
  const apiConfig = config.api || {};
  const { 
    showRequired = true, 
    showType = true, 
    showDefault = true, 
    showDescription = true 
  } = apiConfig;

  const renderApiTable = () => {
    if (!api.data || !Array.isArray(api.data) || api.data.length === 0) {
      return (
        <div className="doc-api-empty">
          <p>暂无API文档</p>
        </div>
      );
    }

    return (
      <div className="doc-api-table">
        <div className="doc-api-table-header">
          <div className="doc-api-table-cell doc-api-table-param">参数</div>
          {showType && (
            <div className="doc-api-table-cell doc-api-table-type">类型</div>
          )}
          {showDescription && (
            <div className="doc-api-table-cell doc-api-table-description">说明</div>
          )}
          <div className="doc-api-table-cell doc-api-table-option">可选值</div>
          {showDefault && (
            <div className="doc-api-table-cell doc-api-table-default">默认值</div>
          )}
          {showRequired && (
            <div className="doc-api-table-cell doc-api-table-required">必需</div>
          )}
        </div>

        <div className="doc-api-table-body">
          {api.data.map((item, index) => (
            <div key={index} className="doc-api-table-row">
              <div className="doc-api-table-cell doc-api-table-param">
                <code className="doc-api-param-name">{item.param}</code>
                {item.deprecated && (
                  <span className="doc-api-deprecated">已废弃</span>
                )}
              </div>

              {showType && (
                <div className="doc-api-table-cell doc-api-table-type">
                  <code className="doc-api-type">{item.type}</code>
                </div>
              )}

              {showDescription && (
                <div className="doc-api-table-cell doc-api-table-description">
                  {renderDescription(item.desc, item.descFlag)}
                </div>
              )}

              <div className="doc-api-table-cell doc-api-table-option">
                {item.option && (
                  <code className="doc-api-option">{item.option}</code>
                )}
              </div>

              {showDefault && (
                <div className="doc-api-table-cell doc-api-table-default">
                  {item.default !== undefined && item.default !== '' && (
                    <code className="doc-api-default">{String(item.default)}</code>
                  )}
                </div>
              )}

              {showRequired && (
                <div className="doc-api-table-cell doc-api-table-required">
                  {item.required ? (
                    <span className="doc-api-required-yes">是</span>
                  ) : (
                    <span className="doc-api-required-no">否</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDescription = (desc, descFlag = true) => {
    if (!desc) return null;

    if (typeof desc === 'string') {
      if (descFlag) {
        // 支持样式化文本（{} 包围的内容会被样式化）
        const styledDesc = desc.replace(
          /{([^}]+)}/g, 
          '<span class="doc-api-highlight">$1</span>'
        );
        return (
          <div dangerouslySetInnerHTML={{ __html: styledDesc }} />
        );
      } else {
        return <div>{desc}</div>;
      }
    }

    // 支持React元素
    return desc;
  };

  const renderCustomContent = () => {
    if (!api.CustomContent) return null;

    try {
      const CustomContent = api.CustomContent;
      return <CustomContent />;
    } catch (error) {
      console.error('API custom content render error:', error);
      return null;
    }
  };

  return (
    <div className="doc-api" id={`api-${api.apiKey}`}>
      <div className="doc-api-header">
        <h3 className="doc-api-title">{api.title}</h3>
        {api.description && (
          <p className="doc-api-description">{api.description}</p>
        )}
      </div>

      {/* 自定义内容 */}
      {renderCustomContent()}

      {/* API表格 */}
      {renderApiTable()}

      {/* 示例代码 */}
      {api.example && (
        <div className="doc-api-example">
          <h4 className="doc-api-example-title">示例</h4>
          <pre className="doc-api-example-code">
            <code>{api.example}</code>
          </pre>
        </div>
      )}

      {/* 注意事项 */}
      {api.notes && (
        <div className="doc-api-notes">
          <h4 className="doc-api-notes-title">注意事项</h4>
          <div className="doc-api-notes-content">
            {Array.isArray(api.notes) ? (
              <ul>
                {api.notes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            ) : (
              <p>{api.notes}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiDoc;
