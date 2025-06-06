import { useState, useEffect } from 'react';
import '../CSS/DateTime.css';

export default function DateTime() {
    const [currentTime, setCurrentTime] = useState(new Date());
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const generateCalendarDays = () => {
        const year = currentTime.getFullYear();
        const month = currentTime.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const days = [];

        //not my codehajbfiajbf hirap nung logic kasi, pero it's basically to align the dates sa respective araw nila 
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="calendar-day"></div>);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const isToday = day === currentTime.getDate();
            days.push(
                <div 
                    key={day} 
                    className={`calendar-day ${isToday ? 'today' : ''}`}
                >
                    {day}
                </div>
            );
        }

        return days;
    };

    return (
        <div className="datetime-container">
            <div className="time">
                <h2>Current Time</h2>
                <p>{currentTime.toLocaleTimeString()}</p>
                <small>{currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}</small>
            </div>
           <div className="date">
                <h2>{currentTime.toLocaleDateString('en-US', { 
                    month: 'long',
                    year: 'numeric'
                })}</h2>
                <div className="calendar-grid">
                    {daysOfWeek.map(day => (
                        <div key={day} className="calendar-day day-header">
                            {day}
                        </div>
                    ))}
                    {generateCalendarDays()}
                </div>
            </div>
        </div>
        
    );
} 