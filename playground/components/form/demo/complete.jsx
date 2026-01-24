import React, { useState } from 'react';

export default function CompleteForm() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    gender: '',
    interests: [],
    agree: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    // 清除该字段的错误
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleCheckbox = (value) => {
    const interests = formData.interests.includes(value)
      ? formData.interests.filter(i => i !== value)
      : [...formData.interests, value];
    handleChange('interests', interests);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username) newErrors.username = '用户名不能为空';
    if (!formData.email) newErrors.email = '邮箱不能为空';
    if (!formData.password) newErrors.password = '密码不能为空';
    if (formData.password && formData.password.length < 6) {
      newErrors.password = '密码至少6位';
    }
    if (!formData.agree) newErrors.agree = '请同意用户协议';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert('提交成功！\n' + JSON.stringify(formData, null, 2));
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={fieldStyle}>
        <label style={labelStyle}>用户名 *</label>
        <input
          style={{ ...inputStyle, borderColor: errors.username ? '#ff4d4f' : '#d9d9d9' }}
          placeholder="请输入用户名"
          value={formData.username}
          onChange={(e) => handleChange('username', e.target.value)}
        />
        {errors.username && <span style={errorStyle}>{errors.username}</span>}
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>邮箱 *</label>
        <input
          type="email"
          style={{ ...inputStyle, borderColor: errors.email ? '#ff4d4f' : '#d9d9d9' }}
          placeholder="请输入邮箱"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
        />
        {errors.email && <span style={errorStyle}>{errors.email}</span>}
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>密码 *</label>
        <input
          type="password"
          style={{ ...inputStyle, borderColor: errors.password ? '#ff4d4f' : '#d9d9d9' }}
          placeholder="请输入密码"
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
        />
        {errors.password && <span style={errorStyle}>{errors.password}</span>}
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>性别</label>
        <div style={{ display: 'flex', gap: '16px' }}>
          {['男', '女', '其他'].map(gender => (
            <label key={gender} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="radio"
                name="gender"
                value={gender}
                checked={formData.gender === gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                style={{ marginRight: '6px' }}
              />
              {gender}
            </label>
          ))}
        </div>
      </div>

      <div style={fieldStyle}>
        <label style={labelStyle}>兴趣爱好</label>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {['编程', '阅读', '运动', '音乐', '旅行'].map(interest => (
            <label key={interest} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={formData.interests.includes(interest)}
                onChange={() => handleCheckbox(interest)}
                style={{ marginRight: '6px' }}
              />
              {interest}
            </label>
          ))}
        </div>
      </div>

      <div style={fieldStyle}>
        <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={formData.agree}
            onChange={(e) => handleChange('agree', e.target.checked)}
            style={{ marginRight: '6px' }}
          />
          <span style={{ fontSize: '14px' }}>我已阅读并同意用户协议 *</span>
        </label>
        {errors.agree && <span style={errorStyle}>{errors.agree}</span>}
      </div>

      <button type="submit" style={buttonStyle}>
        提交
      </button>
    </form>
  );
}

const formStyle = {
  maxWidth: '500px',
  padding: '24px',
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
};

const fieldStyle = {
  marginBottom: '20px',
};

const labelStyle = {
  display: 'block',
  marginBottom: '8px',
  fontSize: '14px',
  fontWeight: '500',
  color: '#333',
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

const errorStyle = {
  display: 'block',
  marginTop: '4px',
  fontSize: '12px',
  color: '#ff4d4f',
};

const buttonStyle = {
  width: '100%',
  padding: '10px',
  border: 'none',
  borderRadius: '4px',
  backgroundColor: '#1890ff',
  color: 'white',
  fontSize: '16px',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.3s',
};
