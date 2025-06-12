import React, { useState } from "react";
import '../styles/aiGenerator.css';
import { getMotivationalMessage } from "../ai/motivationalService";

export default function AiGenerator() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [habitText] = useState("Drink 8 glasses of water daily");
    const [isCompleted] = useState(true);

    async function generateMessage() {
        setLoading(true);
        setMessage("");
        
        try {
            const motivationalText = `${habitText} - ${isCompleted ? "Completed" : "Not completed yet"}`;
            const generatedMessage = await getMotivationalMessage(motivationalText);
            setMessage(generatedMessage);
        } catch (error) {
            console.error("Error generating message:", error);
            setMessage("Failed to generate message. Please try again later.");
        } finally {
            setLoading(false);
        }
    }
    
    return (
        <div className="ai-container">
            <div className="ai-box">
                <h2 className="ai-title">AI Habit Assistant</h2>
                <p className="ai-description"> Get motivational messages</p>
                <button 
                    className="ai-button" 
                    onClick={generateMessage} 
                    disabled={loading}
                >
                    {loading ? "Generating..." : "Generate Message"}
                </button>
                {message && (
                    <div className="ai-message">
                        <p>{message}</p>
                    </div>
                )}
            </div>
        </div>
    );
}