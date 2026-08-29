import { useState, useEffect } from "react";

import StatCard from "../components/dashboard/StatCard";
import ProgressBar from "../components/dashboard/ProgressBar";
import RecentTasks from "../components/dashboard/RecentTasks";

import "../components/dashboard/dashboard.css";


function Dashboard() {

  // Dashboard statistics from API
  const [stats, setStats] = useState({
    totalTasks: 0,
    todo: 0,
    inProgress: 0,
    done: 0,
    progress: 0
  });

  // Recent tasks from API
  const [recentTasks, setRecentTasks] = useState([]);

  // Loading state
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    const fetchDashboardData = async () => {

      try {

        // Get dashboard statistics
        const statsResponse = await fetch(
          "http://localhost:5000/api/dashboard"
        );

        const statsData = await statsResponse.json();

        setStats(statsData);


        // Get recent tasks
        const tasksResponse = await fetch(
          "http://localhost:5000/api/dashboard/recent-tasks"
        );

        const tasksData = await tasksResponse.json();

        setRecentTasks(tasksData);

      } catch (error) {

        console.error("Error fetching dashboard data:", error);

      } finally {

        setLoading(false);

      }

    };


    fetchDashboardData();

  }, []);


  if (loading) {
    return <p>Loading dashboard...</p>;
  }


  return (
    <div className="dashboard">

      <div className="dashboard-header">

        <h1>Dashboard</h1>

        <p>
          Overview of your team's tasks and progress
        </p>

      </div>


      <div className="statistics">

        <StatCard
          title="Total Tasks"
          value={stats.totalTasks}
        />

        <StatCard
          title="To Do"
          value={stats.todo}
        />

        <StatCard
          title="In Progress"
          value={stats.inProgress}
        />

        <StatCard
          title="Done"
          value={stats.done}
        />

      </div>


      <ProgressBar percentage={stats.progress} />


      <RecentTasks tasks={recentTasks} />

    </div>
  );
}


export default Dashboard;