// user registration
import React, { useState } from 'react';

function Register({ onRegister, onSwitchToLogin }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Developer' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onRegister) onRegister(formData);
  };

  return (
    <div style={{ maxWidth: '360px', margin: '40px auto', padding: '24px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <h2 style={{ marginTop: 0, textAlign: 'center' }}>Create Account</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div>
          <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db', marginTop: '4px', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db', marginTop: '4px', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Password</label>
          <input
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db', marginTop: '4px', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Role</label>
          <select
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db', marginTop: '4px', boxSizing: 'border-box' }}
          >
            <option>Developer</option>
            <option>Project Lead</option>
            <option>UI/UX Designer</option>
            <option>QA Engineer</option>
          </select>
        </div>
        <button type="submit" style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', marginTop: '8px' }}>
          Register
        </button>
      </form>
      <p style={{ textAlign: 'center', fontSize: '13px', color: '#6b7280', marginTop: '16px' }}>
        Already have an account?{' '}
        <span onClick={onSwitchToLogin} style={{ color: '#2563eb', cursor: 'pointer', fontWeight: '600' }}>
          Login
        </span>
      </p>
    </div>
  );
}

export default Register;