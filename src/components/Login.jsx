//Loging component
import React, { useState } from 'react';

function Login({ onLogin, onSwitchToRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onLogin) onLogin({ email });
  };

  return (
    <div style={{ maxWidth: '360px', margin: '40px auto', padding: '24px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
      <h2 style={{ marginTop: 0, textAlign: 'center' }}>Sign In</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div>
          <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db', marginTop: '4px', boxSizing: 'border-box' }}
          />
        </div>
        <div>
          <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db', marginTop: '4px', boxSizing: 'border-box' }}
          />
        </div>
        <button type="submit" style={{ backgroundColor: '#2563eb', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', marginTop: '8px' }}>
          Login
        </button>
      </form>
      <p style={{ textAlign: 'center', fontSize: '13px', color: '#6b7280', marginTop: '16px' }}>
        Don't have an account?{' '}
        <span onClick={onSwitchToRegister} style={{ color: '#2563eb', cursor: 'pointer', fontWeight: '600' }}>
          Register
        </span>
      </p>
    </div>
  );
}

export default Login;