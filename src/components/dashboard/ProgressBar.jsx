function ProgressBar({ percentage }) {
  return (
    <div className="progress-container">

      <div className="progress-header">
        <span>Project Progress</span>
        <span>{percentage}%</span>
      </div>

      <div className="progress-background">
        <div
          className="progress-fill"
          style={{ width: `${percentage}%` }}
        >
        </div>
      </div>

    </div>
  );
}

export default ProgressBar;