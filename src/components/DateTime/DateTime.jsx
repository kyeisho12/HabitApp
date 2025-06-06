import { useState, useEffect } from 'react';
import '../../styles/DateTime.css';  
import TimeDisplay from './TimeDisplay';
import Calendar from './Calendar';

export default function DateTime() {
    const [date, setDate] = useState(new Date());
    
    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="datetime-container">
            <TimeDisplay date={date} />
            <Calendar date={date} />
        </div>
    );
}