import React, { useState } from 'react';

export default function InteractiveCard() {
  const [liked, setLiked] = useState([false, false, false]);

  const toggleLike = (index) => {
    const newLiked = [...liked];
    newLiked[index] = !newLiked[index];
    setLiked(newLiked);
  };

  const cards = [
    { title: '产品设计', desc: '创造优秀的用户体验', icon: '🎨' },
    { title: '前端开发', desc: '构建现代化的Web应用', icon: '💻' },
    { title: '数据分析', desc: '洞察数据背后的价值', icon: '📊' },
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
      {cards.map((card, index) => (
        <div
          key={index}
          style={{
            ...cardStyle,
            transform: liked[index] ? 'translateY(-4px)' : 'none',
            boxShadow: liked[index] ? '0 8px 16px rgba(0,0,0,0.12)' : '0 2px 8px rgba(0,0,0,0.06)',
          }}
        >
          <div style={{ fontSize: '48px', textAlign: 'center', marginBottom: '12px' }}>
            {card.icon}
          </div>
          <h3 style={titleStyle}>{card.title}</h3>
          <p style={contentStyle}>{card.desc}</p>
          <button
            style={{
              ...buttonStyle,
              backgroundColor: liked[index] ? '#ff4d4f' : 'white',
              color: liked[index] ? 'white' : '#666',
            }}
            onClick={() => toggleLike(index)}
          >
            {liked[index] ? '❤️ 已喜欢' : '🤍 喜欢'}
          </button>
        </div>
      ))}
    </div>
  );
}

const cardStyle = {
  padding: '24px',
  border: '1px solid #e8e8e8',
  borderRadius: '12px',
  backgroundColor: 'white',
  transition: 'all 0.3s',
  cursor: 'pointer',
};

const titleStyle = {
  margin: '0 0 8px 0',
  fontSize: '18px',
  fontWeight: '600',
  textAlign: 'center',
};

const contentStyle = {
  margin: '0 0 16px 0',
  fontSize: '14px',
  lineHeight: '1.6',
  color: '#666',
  textAlign: 'center',
};

const buttonStyle = {
  width: '100%',
  padding: '8px',
  border: '1px solid #d9d9d9',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '14px',
  transition: 'all 0.3s',
};
