import React from 'react';

export default function ButtonSizes() {
  return (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
      <button style={{ ...buttonStyle, padding: '4px 8px', fontSize: '12px' }}>
        小按钮
      </button>
      <button style={{ ...buttonStyle, padding: '8px 16px', fontSize: '14px' }}>
        中按钮
      </button>
      <button style={{ ...buttonStyle, padding: '12px 24px', fontSize: '16px' }}>
        大按钮
      </button>
    </div>
  );
}

const buttonStyle = {
  border: '1px solid #1890ff',
  borderRadius: '4px',
  cursor: 'pointer',
  backgroundColor: '#1890ff',
  color: 'white',
  transition: 'all 0.3s',
};
