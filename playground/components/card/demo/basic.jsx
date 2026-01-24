import React from 'react';

export default function BasicCard() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
      <div style={cardStyle}>
        <h3 style={titleStyle}>基础卡片</h3>
        <p style={contentStyle}>
          这是一个基础的卡片组件，可以用来展示各种内容。
        </p>
      </div>

      <div style={{ ...cardStyle, borderColor: '#1890ff' }}>
        <h3 style={{ ...titleStyle, color: '#1890ff' }}>带边框卡片</h3>
        <p style={contentStyle}>
          这个卡片有彩色边框，可以用来突出显示重要内容。
        </p>
      </div>

      <div style={{ ...cardStyle, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
        <h3 style={{ ...titleStyle, color: 'white' }}>渐变卡片</h3>
        <p style={{ ...contentStyle, color: 'rgba(255,255,255,0.9)' }}>
          使用渐变背景的卡片，视觉效果更加丰富。
        </p>
      </div>
    </div>
  );
}

const cardStyle = {
  padding: '20px',
  border: '1px solid #e8e8e8',
  borderRadius: '8px',
  backgroundColor: 'white',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  transition: 'all 0.3s',
  cursor: 'pointer',
};

const titleStyle = {
  margin: '0 0 12px 0',
  fontSize: '16px',
  fontWeight: '600',
};

const contentStyle = {
  margin: 0,
  fontSize: '14px',
  lineHeight: '1.6',
  color: '#666',
};
