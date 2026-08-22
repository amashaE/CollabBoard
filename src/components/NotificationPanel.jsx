import NotificationItem from "./NotificationItem";

function NotificationPanel({ notifications }) {
  return (
    <div className="notification-panel">
      <div className="section-header">
        <div>
          <h2>Notifications</h2>
          <p>Stay updated with your project</p>
        </div>

        <button className="mark-read-btn">
          Mark all as read
        </button>
      </div>

      <div className="notification-list">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
          />
        ))}
      </div>
    </div>
  );
}

export default NotificationPanel;