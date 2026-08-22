import StatCard from "../components/dashboard/StatCard";
import ProgressBar from "../components/dashboard/ProgressBar";
import RecentTasks from "../components/dashboard/RecentTasks";
import "../components/dashboard/dashboard.css";

function Dashboard({ tasks }) {

  const totalTasks = tasks.length;

  const todoTasks = tasks.filter(
    (task) => task.status === "To Do"
  ).length;

  const inProgressTasks = tasks.filter(
    (task) => task.status === "In Progress"
  ).length;

  const doneTasks = tasks.filter(
    (task) => task.status === "Done"
  ).length;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((doneTasks / totalTasks) * 100);

  return (
    <div className="dashboard">

      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Overview of your team's tasks and progress</p>
      </div>

      <div className="statistics">

        <StatCard
          title="Total Tasks"
          value={totalTasks}
        />

        <StatCard
          title="To Do"
          value={todoTasks}
        />

        <StatCard
          title="In Progress"
          value={inProgressTasks}
        />

        <StatCard
          title="Done"
          value={doneTasks}
        />

      </div>

      <ProgressBar percentage={progress} />

      <RecentTasks tasks={tasks} />

    </div>
  );
}

export default Dashboard;