function ActivityFeed({ activities }) {
  return (
    <div className="activity-feed">
      <div className="section-header">
        <div>
          <h2>Recent Activity</h2>
          <p>See what your team has been working on</p>
        </div>
      </div>

      <div className="activity-list">
        {activities.map((activity) => (
          <div className="activity-item" key={activity.id}>
            <div className="activity-avatar">
              {activity.user.charAt(0)}
            </div>

            <div className="activity-content">
              <p>
                <strong>{activity.user}</strong>{" "}
                {activity.action}
              </p>

              <span className="activity-time">
                {activity.createdAt}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ActivityFeed;
