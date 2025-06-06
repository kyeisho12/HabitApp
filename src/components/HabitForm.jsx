import "../CSS/HabitForm.css";
import React from "react";

export default function HabitForm(props) {
  const [habit, setHabit] = React.useState(() => {
    const savedHabits = localStorage.getItem("habits");
    return savedHabits ? JSON.parse(savedHabits) : [];
});
  const [inputValue, setInputValue] = React.useState("");

React.useEffect(() => {
    localStorage.setItem("habits", JSON.stringify(habit));
}, [habit]);

  function updateStats(habits) {
    const totalHabits = habits.length;
    const completedHabits = habits.filter(habit => habit.completed).length;
    const completionRate = totalHabits === 0 ? 0 : Math.round((completedHabits / totalHabits) * 100);

    const stats = { totalHabits, completedHabits, completionRate };
    localStorage.setItem('habitStats', JSON.stringify(stats));

    props.onHabitCountChange(totalHabits);
    props.onCompletedCountChange(completedHabits);
    props.onCompletionRateChange(completionRate);
}

  function handleSubmit(e) {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setHabit((prev) => {
      const newHabits = [
        ...prev,
        {
          id: Date.now().toString(),
          text: inputValue,
          completed: false,
          createdAt: new Date(),
          lastCompletedDate: null,
        },
      ];
      updateStats(newHabits);
      return newHabits;
    });
    setInputValue("");
  }

  function handleToggle(id) {
    setHabit((prev) => {
      const updated = prev.map((habit) =>
        habit.id === id
          ? {
              ...habit,
              completed: !habit.completed,
              lastCompletedDate: !habit.completed ? new Date() : null,
            }
          : habit
      );
      updateStats(updated);
      return updated;
    });
  }

  function handleDelete(id) {
    setHabit((prev) => {
      const updated = prev.filter((habit) => habit.id !== id);
      updateStats(updated);
      return updated;
    });
  }

  const formatDate = (date, includeTime = false) => {
    const options = {
      month: "short",
      day: "numeric",
      ...(includeTime && { hour: "2-digit", minute: "2-digit" }),
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const HabitItem = ({ item }) => (
    <li className={`habit-item ${item.completed ? "completed" : ""}`}>
      <div className="habit-content">
        <input
          type="checkbox"
          className="habit-checkbox"
          id={`habit-${item.id}`}
          checked={item.completed}
          onChange={() => handleToggle(item.id)}
        />
        <label htmlFor={`habit-${item.id}`}>{item.text}</label>
      </div>
      <div className="habit-meta">
        <span className="habit-date">Added {formatDate(item.createdAt)}</span>
        {item.lastCompletedDate && (
          <span className="completed-date">
            Last completed: {formatDate(item.lastCompletedDate, true)}
          </span>
        )}
        <button className="delete-btn" onClick={() => handleDelete(item.id)}>
          <span className="icon">🗑️</span>
        </button>
      </div>
    </li>
  );

  return (
    <div className="habit-container">
      <form className="habit-form" onSubmit={handleSubmit}>
        <h2>
          <span className="icon">✨</span>
          Add New Habit
        </h2>
        <div className="input-container">
          <input
            type="text"
            placeholder="e.g., Drink 8 glasses of water"
            required
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit">Add Habit</button>
        </div>
      </form>

      <div className="habit-window">
        {habit.length === 0 ? (
          <div className="empty-state">
            <span className="icon">📝</span>
            <h2>No habits yet</h2>
            <p>Add your first habit to get started on your journey!</p>
          </div>
        ) : (
          <>
            <div className="habits-list">
              <div className="habits-header">
                <h2>
                  <span className="icon">📋</span>
                  Today's Habits ({habit.filter((h) => !h.completed).length})
                </h2>
              </div>
              <ul>
                {habit
                  .filter((item) => !item.completed)
                  .map((item) => (
                    <HabitItem key={item.id} item={item} />
                  ))}
              </ul>
            </div>

            {habit.some((h) => h.completed) && (
              <div className="completed-list">
                <div className="habits-header">
                  <h2>
                    <span className="icon">✅</span>
                    Completed ({habit.filter((h) => h.completed).length})
                  </h2>
                </div>
                <ul>
                  {habit
                    .filter((item) => item.completed)
                    .map((item) => (
                      <HabitItem key={item.id} item={item} />
                    ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
