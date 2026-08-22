import React from 'react';

const TeamMembersPanel = () => {
  // Sample mock data for 10 team members
  const members = [
    {
      id: 1,
      name: 'Amasha E.',
      role: 'Project Lead',
      tasks: 8,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amasha'
    },
    {
      id: 2,
      name: 'Tharunethu T.',
      role: 'Frontend Developer',
      tasks: 5,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tharunethu'
    },
    {
      id: 3,
      name: 'Manu C.',
      role: 'UI/UX Designer',
      tasks: 6,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Manu'
    },
    {
      id: 4,
      name: 'Basuru M.',
      role: 'Backend Developer',
      tasks: 7,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kavindu'
    },
    {
      id: 5,
      name: 'Naduni R.',
      role: 'QA Engineer',
      tasks: 4,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dilini'
    },
    {
      id: 6,
      name: 'Maleesha W.',
      role: 'DevOps Engineer',
      tasks: 3,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nipuna'
    },
    {
      id: 7,
      name: 'Samadhi.',
      role: 'Full Stack Developer',
      tasks: 9,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shehan'
    },
    {
      id: 8,
      name: 'Devindi.',
      role: 'Product Owner',
      tasks: 2,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rashmi'
    },
    {
      id: 9,
      name: 'chamod.',
      role: 'Database Administrator',
      tasks: 5,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Oshadha'
    },
    {
      id: 10,
      name: 'Manulji W.',
      role: 'Scrum Master',
      tasks: 4,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chathuri'
    }
  ];

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      border: '1px solid #e0e0e0',
      maxWidth: '400px',
      margin: '10px'
    }}>
      <h3 style={{ marginTop: 0, marginBottom: '15px', color: '#333' }}>
        👥 Team Members ({members.length})
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {members.map((member) => (
          <div key={member.id} style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px',
            backgroundColor: '#ffffff',
            borderRadius: '6px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img 
                src={member.avatar} 
                alt={member.name} 
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
              />
              <div>
                <h4 style={{ margin: 0, fontSize: '14px', color: '#222' }}>{member.name}</h4>
                <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>{member.role}</p>
              </div>
            </div>
            <span style={{
              backgroundColor: '#e3f2fd',
              color: '#1976d2',
              fontSize: '12px',
              padding: '4px 8px',
              borderRadius: '12px',
              fontWeight: 'bold'
            }}>
              {member.tasks} tasks
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamMembersPanel;