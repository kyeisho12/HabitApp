import '../CSS/HabitForm.css';
import React from 'react';

export default function HabitForm({ onHabitCountChange, onCompletedCountChange, onCompletionRateChange }) {
    const [habit, setHabit] = React.useState([]);
    const [inputValue, setInputValue] = React.useState('');



    function updateStats(habits) {
        const totalHabits = habits.length;
        const completedHabits = habits.filter(habit => habit.completed).length;
        const completionRate = totalHabits === 0 ? 0 : Math.round((completedHabits / totalHabits) * 100);
        
        onHabitCountChange(totalHabits);
        onCompletedCountChange(completedHabits);
        onCompletionRateChange(completionRate);
    }

    function handleSubmit(e) {
        e.preventDefault(); 
        if (!inputValue.trim()) return;
        
        setHabit(prevHabit => {
            const newHabits = [...prevHabit, {
                id: Date.now().toString(),
                text: inputValue,
                completed: false,
                createdAt: new Date(),
                lastCompletedDate: null
            }];
            updateStats(newHabits);
            return newHabits;
        });
        setInputValue('');
    }

    function handleToggle(id) {
        setHabit(prevHabits => {
            const updatedHabits = prevHabits.map(habit => 
                habit.id === id ? {
                    ...habit,
                    completed: !habit.completed,
                    lastCompletedDate: !habit.completed ? new Date() : null
                } : habit
            );
            updateStats(updatedHabits);
            return updatedHabits;
        });
    }

    function handleDelete(id) {
        setHabit(prevHabits => {
            const updatedHabits = prevHabits.filter(habit => habit.id !== id);
            updateStats(updatedHabits);
            return updatedHabits;
        });
    }




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
                ) : 
                        (<>
                        <div className="habits-list">
                            <div className="habits-header">
                                <h2>
                                    <span className="icon">📋</span>
                                    Today's Habits ({habit.filter(h => !h.completed).length})
                                </h2>
                            </div>
                            <ul>
                                {habit
                                    .filter(item => !item.completed)
                                    .map((item) => (
                                        <li key={item.id} className={`habit-item ${item.completed ? 'completed' : ''}`}>
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
                                                <span className="habit-date">
                                                    Added {new Date(item.createdAt).toLocaleDateString('en-US', { 
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </span>

                                                {item.lastCompletedDate && (
                                                    <span className="completed-date">
                                                        Last completed: {new Date(item.lastCompletedDate).toLocaleDateString('en-US', {
                                                            month: 'short',
                                                            day: 'numeric',
                                                            hour: '2-digit',
                                                            minute: '2-digit'
                                                        })}
                                                    </span>
                                                )}
                                                
                                                <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                                                    <span className="icon">🗑️</span>
                                                </button>
                                            </div>
                                        </li>
                                    ))}
                            </ul>
                        </div>

                        {habit.some(h => h.completed) && (
                            <div className="completed-list">
                                <div className="habits-header">
                                    <h2>
                                        <span className="icon">✅</span>
                                        Completed ({habit.filter(h => h.completed).length})
                                    </h2>
                                </div>
                                <ul>
                                    {habit
                                        .filter(item => item.completed)
                                        .map((item) => (
                                            <li key={item.id} className="habit-item completed">
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
                                                    <span className="habit-date">
                                                        Added {new Date(item.createdAt).toLocaleDateString('en-US', { 
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </span>
                                                    {item.lastCompletedDate && (
                                                        <span className="completed-date">
                                                            Last completed: {new Date(item.lastCompletedDate).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })}
                                                        </span>
                                                    )}
                                                    <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                                                        <span className="icon">🗑️</span>
                                                    </button>
                                                </div>
                                            </li>
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

