function RecentTasks({ tasks }) {
  return (
    <div className="recent-tasks">

      <h2>Recent Tasks</h2>

      {tasks.map((task) => (
        <div className="task-row" key={task.id}>

          <div className="task-info">
            <h4>{task.title}</h4>
            <p>{task.assignee}</p>
          </div>

          <span className="priority">
            {task.priority}
          </span>

          <span className="status">
            {task.status}
          </span>

        </div>
      ))}

    </div>
  );
}

export default RecentTasks;