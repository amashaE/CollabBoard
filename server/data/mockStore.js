let tasks = [
  { id: '1', title: 'Create Task Modal', status: 'In Progress', priority: 'High', assignee: 'Amasha E.', date: '2026-08-25' },
  { id: '2', title: 'Notifications UI', status: 'In Progress', priority: 'Medium', assignee: 'Tharunethu T.', date: '2026-08-26' },
  { id: '3', title: 'Team Members Panel', status: 'To Do', priority: 'Medium', assignee: 'Manu C.', date: '2026-08-27' },
  { id: '4', title: 'Database Schema Design', status: 'In Progress', priority: 'High', assignee: 'Basuru M.', date: '2026-08-28' },
  { id: '5', title: 'Write Test Cases', status: 'To Do', priority: 'Low', assignee: 'Naduni R.', date: '2026-08-29' },
  { id: '6', title: 'Docker Setup', status: 'Done', priority: 'High', assignee: 'Maleesha W.', date: '2026-08-30' },
  { id: '7', title: 'Full-stack Integration', status: 'In Progress', priority: 'High', assignee: 'Samadhi.', date: '2026-08-31' },
  { id: '8', title: 'Product Roadmap Review', status: 'Done', priority: 'Medium', assignee: 'Devindi.', date: '2026-09-01' },
  { id: '9', title: 'Optimize SQL Queries', status: 'In Progress', priority: 'High', assignee: 'chamod.', date: '2026-09-02' },
  { id: '10', title: 'Sprint Retrospective', status: 'To Do', priority: 'Low', assignee: 'Manulji W.', date: '2026-09-03' }
];

let teamMembers = [
  { id: 1, name: 'Amasha E.', role: 'Project Lead', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Amasha' },
  { id: 2, name: 'Tharunethu T.', role: 'Frontend Developer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Tharunethu' },
  { id: 3, name: 'Manu C.', role: 'UI/UX Designer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Manu' },
  { id: 4, name: 'Basuru M.', role: 'Backend Developer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Kavindu' },
  { id: 5, name: 'Naduni R.', role: 'QA Engineer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dilini' },
  { id: 6, name: 'Maleesha W.', role: 'DevOps Engineer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nipuna' },
  { id: 7, name: 'Samadhi.', role: 'Full Stack Developer', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Shehan' },
  { id: 8, name: 'Devindi.', role: 'Product Owner', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rashmi' },
  { id: 9, name: 'chamod.', role: 'Database Administrator', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Oshadha' },
  { id: 10, name: 'Manulji W.', role: 'Scrum Master', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Chathuri' },
];

module.exports = { tasks, teamMembers };