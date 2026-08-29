import { useEffect, useState } from "react";
import NotificationPanel from "../components/NotificationPanel";
import ActivityFeed from "../components/ActivityFeed";
import "./Notifications.css";

function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Fetch notifications from backend
    fetch("http://localhost:5000/api/notifications")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch notifications");
        }
        return response.json();
      })
      .then((data) => {
        setNotifications(data);
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });

    // Fetch activity from backend
    fetch("http://localhost:5000/api/activity")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch activity");
        }
        return response.json();
      })
      .then((data) => {
        setActivities(data);
      })
      .catch((error) => {
        console.error("Error fetching activity:", error);
      });
  }, []);

  return (
    <div className="notifications-page">
      <div className="page-title">
        <h1>Notifications & Activity</h1>
        <p>
          Keep track of your notifications and team activity.
        </p>
      </div>

      <div className="notifications-grid">
        <NotificationPanel notifications={notifications} />

        <ActivityFeed activities={activities} />
      </div>
    </div>
  );
}

export default Notifications;