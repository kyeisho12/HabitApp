import React from 'react';
export default function Calendar({ date }) {
    const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const createCalendar = () => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const totalDays = new Date(year, month + 1, 0).getDate();
        const startDay = new Date(year, month, 1).getDay();
        
        const calendarDays = [];

        for (let i = 0; i < startDay; i++) {
            calendarDays.push(
                <div key={`empty-${i}`} className="calendar-day" />
            );
        }

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
    );
}