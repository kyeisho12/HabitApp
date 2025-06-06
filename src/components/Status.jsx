import '../CSS/Status.css';

export default function Status() {
  return (
    <div className="status-container">
      <div className="status-card total-habits">
        <span className="icon">⭕</span>
        <h2>Total Habits</h2>
        <p className="count">0</p>
      </div>

      <div className="status-card completed-habits">
        <span className="icon">✅</span>
        <h2>Completed Today</h2>
        <p className="count">0</p>
      </div>

      <div className="status-card completion-rate">
        <span className="icon">📊</span>
        <h2>Completion Rate</h2>
        <p className="count">0%</p>
      </div>
    </div>
  );
}