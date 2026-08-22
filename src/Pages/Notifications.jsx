import NotificationPanel from "../components/NotificationPanel";
import ActivityFeed from "../components/ActivityFeed";
import { mockNotifications, mockActivities } from "../mockData";
import "./Notifications.css";

function Notifications() {
  return (
    <div className="notifications-page">
      <div className="page-title">
        <h1>Notifications & Activity</h1>
        <p>
          Keep track of your notifications and team activity.
        </p>
      </div>

      <div className="notifications-grid">
        <NotificationPanel notifications={mockNotifications} />

        <ActivityFeed activities={mockActivities} />
      </div>
    </div>
  );
}

export default Notifications;