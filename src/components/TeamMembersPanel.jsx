import React, { useState, useEffect } from 'react';

const TeamMembersPanel = () => {
  // 1. State for dynamic API data, loading state, and error handling
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 2. Fetch live team data from Node/Express API on component mount
  useEffect(() => {
    fetch('http://localhost:5000/api/team')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch team members');
        }
        return res.json();
      })
      .then((data) => {
        setMembers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // 3. Render loading and error states gracefully
  if (loading) {
    return (
      <div style={{ padding: '20px', maxWidth: '400px', margin: '10px' }}>
        Loading team members...
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', color: 'red', maxWidth: '400px', margin: '10px' }}>
        Error: {error}
      </div>
    );
  }

  // 4. Render identical UI structure using API data
  return (
    <div
      style={{
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e0e0e0',
        maxWidth: '400px',
        margin: '10px',
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#333' }}>
        👥 Team Members ({members.length})
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {members.map((member) => (
          <div
            key={member.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px',
              backgroundColor: '#ffffff',
              borderRadius: '6px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img
                src={member.avatar}
                alt={member.name}
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
              />
              <div>
                <h4 style={{ margin: 0, fontSize: '14px', color: '#222' }}>
                  {member.name}
                </h4>
                <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>
                  {member.role}
                </p>
              </div>
            </div>
            <span
              style={{
                backgroundColor: '#e3f2fd',
                color: '#1976d2',
                fontSize: '12px',
                padding: '4px 8px',
                borderRadius: '12px',
                fontWeight: 'bold',
              }}
            >
              {member.tasks} tasks
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembersPanel;