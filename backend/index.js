import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
// mongoose.connect("mongodb://127.0.0.1:27017/ai-learning", { useNewUrlParser: true, useUnifiedTopology: true });

const formatQuizResponse = (responseText) => {
    const questions = responseText.split("\n\n").map((q) => {
        const parts = q.split("\n");
        return {
            question: parts[0],  // Question text
            options: parts.slice(1)  // Multiple-choice options
        };
    });
    return questions;
};

// API Route to Generate Personalized Quiz
app.post("/generate-quiz", async (req, res) => {
    const { topic, difficulty } = req.body;
    const prompt = `Generate a ${difficulty} level quiz on ${topic}. Provide 5 multiple-choice questions with correct answers.`;

    try {
        const response = await axios.post("http://localhost:11434/api/generate", {
            model: "deepseek-coder",
            prompt: prompt
        });
        console.log(response);
        const formattedQuiz = formatQuizResponse(response.data.response);

        res.json({ questions: formattedQuiz });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start Server
app.listen(5000, () => console.log("Server running on port 5000"));
