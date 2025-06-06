import '../styles/Status.css';
import React from 'react';

export default function Status(props) {
  const [stats, setStats] = React.useState(() => {
    const habits = JSON.parse(localStorage.getItem('habits') || '[]');
    const totalHabits = habits.length;
    const completedHabits = habits.filter(habit => habit.completed).length;
    const completionRate = totalHabits === 0 ? 0 : Math.round((completedHabits / totalHabits) * 100);
    
    return {
      totalHabits,
      completedHabits,
      completionRate
    };
  });

  React.useEffect(() => {
    if (props.totalHabits !== undefined) {
      setStats({
        totalHabits: props.totalHabits,
        completedHabits: props.completedHabits,
        completionRate: props.completionRate
      });
    }
  }, [props.totalHabits, props.completedHabits, props.completionRate]);

  return (
    <div className="status-container">
      <div className="status-card total-habits">
        <span className="icon">⭕</span>
        <h2>Total Habits</h2>
        <p>{stats.totalHabits}</p>
      </div>

      <div className="status-card completed-habits">
        <span className="icon">✅</span>
        <h2>Completed Today</h2>
        <p>{stats.completedHabits}</p>
      </div>

      <div className="status-card completion-rate">
        <span className="icon">📊</span>
        <h2>Completion Rate</h2>
        <p>{stats.completionRate}%</p>
      </div>
    </div>
  );
}