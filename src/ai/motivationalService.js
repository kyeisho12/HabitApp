import { HfInference } from '@huggingface/inference'

const SYSTEM_PROMPT = `You are a motivational coach. Your task is to inspire and uplift individuals who have just completed a positive habit. Use encouraging language and focus on the benefits of their achievement. Keep your messages concise and impactful.`;

const MOTIVATIONAL_MESSAGES = [
    "Every step you take brings you closer to your goals. Keep going!",
    "Your dedication is inspiring. Well done!",
    "Small habits lead to big changes. Keep it up!",
    "You are stronger than you think. Stay motivated!",
    "Consistency is the key to success. Great job!",
    "Your hard work is paying off. Keep pushing!",
    "Believe in yourself and all that you are.",
    "You’ve accomplished something great today!",
    "Progress, not perfection. Keep moving forward!",
    "You are building a better you every day.",
    "Success is the sum of small efforts repeated daily.",
    "You’re doing amazing—don’t stop now!",
    "Your commitment is admirable. Stay strong!",
    "Every positive action counts. Keep it up!",
    "You’re making a difference in your life.",
    "Celebrate your wins, no matter how small.",
    "You have the power to create change.",
    "Keep your eyes on the prize. You’re getting there!",
    "Your journey is unique and important.",
    "You’re turning your dreams into reality.",
    "Stay focused and keep believing in yourself.",
    "You’re proving to yourself what you’re capable of.",
    "Every habit you build is a step toward greatness.",
    "You’re unstoppable when you set your mind to it.",
    "Keep going—your future self will thank you.",
    "You’re inspiring others by your actions.",
    "You’re making progress every single day.",
    "Your persistence is your superpower.",
    "You’re one step closer to your goals.",
    "You’re doing something amazing for yourself.",
    "Keep shining and striving for your best.",
    "You’re creating healthy routines for life.",
    "You’re stronger with every habit you build.",
    "You’re showing up for yourself—keep it up!",
    "You’re making healthy choices and it shows.",
    "You’re building momentum—don’t stop now!",
    "You’re capable of achieving anything you set your mind to.",
    "You’re investing in your own happiness.",
    "You’re making your goals a reality.",
    "You’re growing stronger every day.",
    "You’re mastering the art of self-discipline.",
    "You’re proving that you can do hard things.",
    "You’re making yourself proud.",
    "You’re taking control of your future.",
    "You’re building habits that last a lifetime.",
    "You’re a champion of your own life.",
    "You’re making today count.",
    "You’re unstoppable—keep going!",
    "You’re turning effort into achievement.",
    "You’re on the path to greatness."
];


export function getRandomMotivationalMessage() {
    const randomMessage = Math.floor(Math.random() * MOTIVATIONAL_MESSAGES.length);
    return MOTIVATIONAL_MESSAGES[randomMessage];
}

export async function getMotivationalMessage(motivationalText) {
    try {
        const prompt = `${SYSTEM_PROMPT}\nGenerate a motivational message for the following habit completion: ${motivationalText}`;
        const response = await fetch(
            "https://api-inference.huggingface.co/models/gpt2",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${import.meta.env.VITE_HUGGING_FACE_API_KEY}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ inputs: prompt })
            }
        );
        const data = await response.json();
        return data[0]?.generated_text || getRandomMotivationalMessage();
    } catch (err) {
        console.error("MotivationalService error:", err);
        return getRandomMotivationalMessage();
    }
}
