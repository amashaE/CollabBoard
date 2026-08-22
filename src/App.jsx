import React from 'react';

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', fontFamily: 'sans-serif' }}>
      <header style={{ height: '60px', backgroundColor: '#1f2937', color: '#fff', display: 'flex', alignItems: 'center', padding: '0 20px', justifyContent: 'space-between' }}>
        <h2 style={{ margin: 0, fontSize: '20px' }}>CollabBoard</h2>
        <div>👤 User Profile</div>
      </header>

      <div style={{ display: 'flex', flex: 1 }}>
        <aside style={{ width: '200px', backgroundColor: '#f3f4f6', padding: '20px', borderRight: '1px solid #e5e7eb' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            <li style={{ padding: '10px 0', fontWeight: 'bold' }}>📊 Dashboard</li>
            <li style={{ padding: '10px 0' }}>📋 Kanban Board</li>
            <li style={{ padding: '10px 0' }}>👥 Members</li>
            <li style={{ padding: '10px 0' }}>📅 Calendar</li>
          </ul>
        </aside>

        <main style={{ flex: 1, padding: '20px', backgroundColor: '#fafafa' }}>
          <h3>Welcome to CollabBoard</h3>
          <p>Team components will render here.</p>
        </main>
      </div>
    </div>
  );
}

export default App;
