function NotificationItem({ notification }) {
  return (
    <div className="notification-item">
      <div className="notification-icon">
        🔔
      </div>

      <div className="notification-content">
        <p>{notification.text}</p>
        <span>{notification.time}</span>
      </div>
    </div>
  );
}

export default NotificationItem;