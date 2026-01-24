import React, { useState } from 'react';

export default function ValidationInput() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      setError('邮箱不能为空');
    } else if (!emailRegex.test(value)) {
      setError('请输入有效的邮箱地址');
    } else {
      setError('');
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  return (
    <div style={{ maxWidth: '400px' }}>
      <label style={labelStyle}>邮箱验证</label>
      <input
        style={{
          ...inputStyle,
          borderColor: error ? '#ff4d4f' : email && !error ? '#52c41a' : '#d9d9d9',
        }}
        placeholder="请输入邮箱"
        value={email}
        onChange={handleChange}
        onBlur={() => email && validateEmail(email)}
      />
      {error && (
        <div style={{ marginTop: '4px', fontSize: '12px', color: '#ff4d4f' }}>
          {error}
        </div>
      )}
      {email && !error && (
        <div style={{ marginTop: '4px', fontSize: '12px', color: '#52c41a' }}>
          ✓ 邮箱格式正确
        </div>
      )}
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
  border: '1px solid',
  borderRadius: '4px',
  fontSize: '14px',
  outline: 'none',
  transition: 'all 0.3s',
};
