import { useState } from "react";
import './CSS/index.css';
import Header from './components/header';  
import DateTime from './components/DateTime';
import Status from './components/Status';
import HabitForm from "./components/HabitForm";

function App() {
  return (
    <div className="container">
      <Header />  
      <DateTime/>
      <Status/>
      <HabitForm/>
    </div>
  );
}

export default App;
