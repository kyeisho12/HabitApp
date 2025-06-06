import '../CSS/Status.css';

export default function Status({ totalHabits, completedHabits, completionRate }) {
  return (
    <div className="status-container">
      <div className="status-card total-habits">
        <span className="icon">⭕</span>
        <h2>Total Habits</h2>
        <p className="count">{totalHabits}</p>
      </div>

      <div className="status-card completed-habits">
        <span className="icon">✅</span>
        <h2>Completed Today</h2>
        <p className="count">{completedHabits}</p>
      </div>

      <div className="status-card completion-rate">
        <span className="icon">📊</span>
        <h2>Completion Rate</h2>
        <p className="count">{completionRate}%</p>
      </div>
    </div>
  );
}