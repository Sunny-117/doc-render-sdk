import React, { useState } from 'react';

export default function LoadingButton() {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
      <button 
        style={buttonStyle}
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? (
          <>
            <span style={spinnerStyle}>⟳</span>
            加载中...
          </>
        ) : (
          '点击加载'
        )}
      </button>
      <button style={{ ...buttonStyle, opacity: 0.6 }} disabled>
        禁用按钮
      </button>
    </div>
  );
}

const buttonStyle = {
  padding: '8px 16px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  backgroundColor: '#1890ff',
  color: 'white',
  transition: 'all 0.3s',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
};

const spinnerStyle = {
  display: 'inline-block',
  animation: 'spin 1s linear infinite',
};
