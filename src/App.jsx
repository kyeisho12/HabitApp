import { useState } from "react";
import './CSS/index.css';
import Header from './components/header';  
import DateTime from './components/DateTime';

function App() {
  return (
    <div className="container">
      <Header />  
      <DateTime/>
    </div>
  );
}

export default App;
