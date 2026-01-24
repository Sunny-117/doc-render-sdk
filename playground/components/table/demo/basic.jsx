import React from 'react';

export default function BasicTable() {
  const data = [
    { id: 1, name: '张三', age: 28, city: '北京', role: '前端工程师' },
    { id: 2, name: '李四', age: 32, city: '上海', role: '后端工程师' },
    { id: 3, name: '王五', age: 25, city: '深圳', role: '产品经理' },
    { id: 4, name: '赵六', age: 30, city: '杭州', role: 'UI设计师' },
  ];

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>ID</th>
            <th style={thStyle}>姓名</th>
            <th style={thStyle}>年龄</th>
            <th style={thStyle}>城市</th>
            <th style={thStyle}>职位</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} style={trStyle}>
              <td style={tdStyle}>{row.id}</td>
              <td style={tdStyle}>{row.name}</td>
              <td style={tdStyle}>{row.age}</td>
              <td style={tdStyle}>{row.city}</td>
              <td style={tdStyle}>{row.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  backgroundColor: 'white',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  borderRadius: '8px',
  overflow: 'hidden',
};

const thStyle = {
  padding: '12px 16px',
  textAlign: 'left',
  backgroundColor: '#fafafa',
  fontWeight: '600',
  fontSize: '14px',
  color: '#333',
  borderBottom: '2px solid #e8e8e8',
};

const tdStyle = {
  padding: '12px 16px',
  fontSize: '14px',
  color: '#666',
  borderBottom: '1px solid #f0f0f0',
};

const trStyle = {
  transition: 'background-color 0.3s',
};
