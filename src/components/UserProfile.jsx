import React from 'react';

function UserProfile({ user, onLogout }) {
  return (
    <div style={{ maxWidth: '360px', margin: '40px auto', padding: '24px', backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', textAlign: 'center' }}>
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user?.name || 'N/A'}</p>
      <p><strong>Email:</strong> {user?.email || 'N/A'}</p>
      <p><strong>Role:</strong> {user?.role || 'Developer'}</p>
      <button onClick={onLogout} style={{ backgroundColor: '#ef4444', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', marginTop: '12px' }}>
        Logout
      </button>
    </div>
  );
}

export default UserProfile;