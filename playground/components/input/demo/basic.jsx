import React, { useState } from 'react';

export default function BasicInput() {
  const [value, setValue] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
      <div>
        <label style={labelStyle}>基础输入框</label>
        <input
          style={inputStyle}
          placeholder="请输入内容"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
          输入值: {value || '(空)'}
        </div>
      </div>

      <div>
        <label style={labelStyle}>禁用状态</label>
        <input
          style={{ ...inputStyle, backgroundColor: '#f5f5f5', cursor: 'not-allowed' }}
          placeholder="禁用输入框"
          disabled
        />
      </div>

      <div>
        <label style={labelStyle}>只读状态</label>
        <input
          style={inputStyle}
          value="只读内容"
          readOnly
        />
      </div>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  fontSize: '14px',
  fontWeight: '500',
};

const inputStyle = {
  width: '100%',
  padding: '8px 12px',
  border: '1px solid #d9d9d9',
  borderRadius: '4px',
  fontSize: '14px',
  outline: 'none',
  transition: 'all 0.3s',
};
