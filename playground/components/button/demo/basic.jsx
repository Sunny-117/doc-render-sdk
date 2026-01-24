import React from 'react';

export default function BasicButton() {
  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <button style={buttonStyle}>默认按钮</button>
      <button style={{ ...buttonStyle, backgroundColor: '#1890ff', color: 'white' }}>
        主要按钮
      </button>
      <button style={{ ...buttonStyle, backgroundColor: '#52c41a', color: 'white' }}>
        成功按钮
      </button>
      <button style={{ ...buttonStyle, backgroundColor: '#faad14', color: 'white' }}>
        警告按钮
      </button>
      <button style={{ ...buttonStyle, backgroundColor: '#ff4d4f', color: 'white' }}>
        危险按钮
      </button>
    </div>
  );
}

const buttonStyle = {
  padding: '8px 16px',
  border: '1px solid #d9d9d9',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'all 0.3s',
  backgroundColor: 'white',
};
