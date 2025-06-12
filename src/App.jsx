import { useState } from "react";
import './styles/DateTime.css';
import Header from './components/header';  
import DateTime from './components/DateTime/DateTime';
import Status from './components/Status';
import HabitForm from "./components/HabitForm";
import AiGenerator from "./components/aiGenerator";

function App() {
    const [totalHabits, setTotalHabits] = useState(() => {
        const saved = localStorage.getItem('habitStats');
        return saved ? JSON.parse(saved).totalHabits : 0;
    });
    const [completedHabits, setCompletedHabits] = useState(() => {
        const saved = localStorage.getItem('habitStats');
        return saved ? JSON.parse(saved).totalHabits : 0;
    });
    const [completionRate, setCompletionRate] = useState(() => {
        const saved = localStorage.getItem('habitStats');
        return saved ? JSON.parse(saved).totalHabits : 0;
    });

    return (
        <div className="container">
            <Header />  
            <DateTime/>
            <Status 
                totalHabits={totalHabits}
                completedHabits={completedHabits}
                completionRate={completionRate}
            />
            <HabitForm 
                onHabitCountChange={setTotalHabits}
                onCompletedCountChange={setCompletedHabits}
                onCompletionRateChange={setCompletionRate}
            />
            <AiGenerator/>
        </div>
    );
}

export default App;
