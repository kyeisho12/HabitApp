import { useState } from "react";
import './CSS/index.css';
import Header from './components/header';  
import DateTime from './components/DateTime';
import Status from './components/Status';
import HabitForm from "./components/HabitForm";

function App() {
    const [totalHabits, setTotalHabits] = useState(0);
    const [completedHabits, setCompletedHabits] = useState(0);
    const [completionRate, setCompletionRate] = useState(0);

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
            
        </div>
    );
}

export default App;
