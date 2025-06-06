import { useState, useEffect } from 'react';
import '../CSS/DateTime.css';

export default function DateTime() {
    const [date, setDate] = useState(new Date());
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Create calendar grid
    const createCalendar = () => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const totalDays = new Date(year, month + 1, 0).getDate();
        const startDay = new Date(year, month, 1).getDay();
        
        const calendarDays = [];

        // Add empty spaces for days before the 1st
        for (let i = 0; i < startDay; i++) {
            calendarDays.push(
                <div key={`empty-${i}`} className="calendar-day" />
            );
        }

        // Add calendar dates
        for (let day = 1; day <= totalDays; day++) {
            calendarDays.push(
                <div 
                    key={day} 
                    className={`calendar-day ${day === date.getDate() ? 'today' : ''}`}
                >
                    {day}
                </div>
            );
        }

        return calendarDays;
    };

    return (
        <div className="datetime-container">
            <div className="time">
                <h2>Current Time</h2>
                <p>{date.toLocaleTimeString()}</p>
                <small>{date.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}</small>
            </div>


            <div className="date">
                <h2>{date.toLocaleDateString('en-US', { 
                    month: 'long',
                    year: 'numeric'
                })}</h2>
                <div className="calendar-grid">
                    {weekDays.map(day => (
                        <div key={day} className="calendar-day day-header">
                            {day}
                        </div>
                    ))}
                    {createCalendar()}
                </div>
            </div>
        </div>
    );
}