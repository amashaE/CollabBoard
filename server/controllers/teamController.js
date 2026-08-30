let { tasks, teamMembers } = require('../data/mockStore');

// GET /api/team - Return list of members with task counts
exports.getTeamMembers = (req, res) => {
  try {
    const membersWithStats = teamMembers.map((member) => {
      const assignedCount = tasks.filter((t) => t.assignee === member.name).length;
      return {
        ...member,
        tasks: assignedCount,
      };
    });
    res.status(200).json(membersWithStats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching team members', error: error.message });
  }
};

// GET /api/team/:id - Fetch single member details
exports.getMemberById = (req, res) => {
  try {
    const { id } = req.params;
    const member = teamMembers.find((m) => m.id === parseInt(id));

    if (!member) {
      return res.status(404).json({ message: 'Member not found' });
    }

    const memberTasks = tasks.filter((t) => t.assignee === member.name);
    res.status(200).json({
      ...member,
      tasks: memberTasks.length,
      assignedTasks: memberTasks,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching member details', error: error.message });
  }
};