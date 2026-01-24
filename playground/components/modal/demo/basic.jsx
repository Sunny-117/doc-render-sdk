import React, { useState } from 'react';

export default function BasicModal() {
  const [visible, setVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <button style={buttonStyle} onClick={() => setVisible(true)}>
        打开模态框
      </button>
      <button style={{ ...buttonStyle, backgroundColor: '#ff4d4f' }} onClick={() => setConfirmVisible(true)}>
        确认对话框
      </button>

      {/* 基础模态框 */}
      {visible && (
        <div style={overlayStyle} onClick={() => setVisible(false)}>
          <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
            <div style={headerStyle}>
              <h3 style={{ margin: 0, fontSize: '16px' }}>模态框标题</h3>
              <button style={closeButtonStyle} onClick={() => setVisible(false)}>
                ✕
              </button>
            </div>
            <div style={bodyStyle}>
              <p>这是模态框的内容区域。</p>
              <p>你可以在这里放置任何内容，如表单、图片、文本等。</p>
            </div>
            <div style={footerStyle}>
              <button style={cancelButtonStyle} onClick={() => setVisible(false)}>
                取消
              </button>
              <button style={okButtonStyle} onClick={() => setVisible(false)}>
                确定
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 确认对话框 */}
      {confirmVisible && (
        <div style={overlayStyle} onClick={() => setConfirmVisible(false)}>
          <div style={{ ...modalStyle, maxWidth: '400px' }} onClick={(e) => e.stopPropagation()}>
            <div style={headerStyle}>
              <h3 style={{ margin: 0, fontSize: '16px', color: '#ff4d4f' }}>⚠️ 确认删除</h3>
              <button style={closeButtonStyle} onClick={() => setConfirmVisible(false)}>
                ✕
              </button>
            </div>
            <div style={bodyStyle}>
              <p>确定要删除这条记录吗？此操作不可恢复。</p>
            </div>
            <div style={footerStyle}>
              <button style={cancelButtonStyle} onClick={() => setConfirmVisible(false)}>
                取消
              </button>
              <button style={{ ...okButtonStyle, backgroundColor: '#ff4d4f' }} onClick={() => {
                alert('已删除');
                setConfirmVisible(false);
              }}>
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const buttonStyle = {
  padding: '8px 16px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#1890ff',
  color: 'white',
  cursor: 'pointer',
  fontSize: '14px',
};

const overlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.45)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000,
  animation: 'fadeIn 0.3s',
};

const modalStyle = {
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  maxWidth: '520px',
  width: '90%',
  maxHeight: '80vh',
  overflow: 'auto',
  animation: 'fadeIn 0.3s',
};

const headerStyle = {
  padding: '16px 24px',
  borderBottom: '1px solid #f0f0f0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const closeButtonStyle = {
  border: 'none',
  background: 'none',
  fontSize: '20px',
  cursor: 'pointer',
  color: '#999',
  padding: '0',
  width: '24px',
  height: '24px',
};

const bodyStyle = {
  padding: '24px',
  fontSize: '14px',
  lineHeight: '1.6',
  color: '#666',
};

const footerStyle = {
  padding: '10px 16px',
  borderTop: '1px solid #f0f0f0',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '8px',
};

const cancelButtonStyle = {
  padding: '6px 16px',
  border: '1px solid #d9d9d9',
  borderRadius: '4px',
  backgroundColor: 'white',
  cursor: 'pointer',
  fontSize: '14px',
};

const okButtonStyle = {
  padding: '6px 16px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#1890ff',
  color: 'white',
  cursor: 'pointer',
  fontSize: '14px',
};
