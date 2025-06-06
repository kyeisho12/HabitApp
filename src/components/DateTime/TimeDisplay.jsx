import React from 'react';


export default function TimeDisplay({ date }) {
    return (
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
    );
}