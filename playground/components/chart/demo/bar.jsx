import React, { useState, useEffect } from 'react';

export default function BarChart() {
  const [data, setData] = useState([
    { label: '周一', value: 120 },
    { label: '周二', value: 200 },
    { label: '周三', value: 150 },
    { label: '周四', value: 180 },
    { label: '周五', value: 220 },
    { label: '周六', value: 170 },
    { label: '周日', value: 140 },
  ]);

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div style={containerStyle}>
      <h3 style={{ marginBottom: '20px', fontSize: '16px', fontWeight: '600' }}>
        每周访问量统计
      </h3>
      <div style={chartStyle}>
        {data.map((item, index) => (
          <div key={index} style={barContainerStyle}>
            <div
              style={{
                ...barStyle,
                height: `${(item.value / maxValue) * 100}%`,
                backgroundColor: `hsl(${210 + index * 10}, 70%, 50%)`,
              }}
            >
              <span style={valueStyle}>{item.value}</span>
            </div>
            <div style={labelStyle}>{item.label}</div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '16px', textAlign: 'center', fontSize: '12px', color: '#999' }}>
        数据更新时间: {new Date().toLocaleString('zh-CN')}
      </div>
    </div>
  );
}

const containerStyle = {
  padding: '24px',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
};

const chartStyle = {
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'space-around',
  height: '300px',
  padding: '20px 0',
  borderBottom: '2px solid #e8e8e8',
};

const barContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1,
  maxWidth: '80px',
};

const barStyle = {
  width: '100%',
  minHeight: '20px',
  borderRadius: '4px 4px 0 0',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'center',
  paddingTop: '8px',
  cursor: 'pointer',
};

const valueStyle = {
  fontSize: '12px',
  fontWeight: '600',
  color: 'white',
};

const labelStyle = {
  marginTop: '8px',
  fontSize: '12px',
  color: '#666',
};
