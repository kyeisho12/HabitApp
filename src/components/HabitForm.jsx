import '../CSS/HabitForm.css';
import React from 'react';

export default function HabitForm() {
    const [habit, setHabit] = React.useState([]);
    const [inputValue, setInputValue] = React.useState('');

    function handleSubmit(e) {
        e.preventDefault(); 
        if (!inputValue.trim()) return;
        
        setHabit(prevHabit => {
            const newHabits = [...prevHabit, inputValue];
            console.log("Updated habits:", newHabits);
            return newHabits;
        });
        setInputValue('');
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
                    <div>
                        <span className="icon">📝</span>
                        <h2>No habits yet</h2>
                        <p>Add your first habit to get started on your journey!</p>
                    </div>
                ) : (
                    <ul>
                        {habit.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

