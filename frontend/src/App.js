import { useState } from "react";
import axios from "axios";

function App() {
  const [topic, setTopic] = useState("");
  const [quiz, setQuiz] = useState([]);
  
  const fetchQuiz = async () => {
    const res = await axios.post("http://localhost:5000/generate-quiz", { topic, difficulty: "medium" });
    setQuiz(res.data.questions);  // Update state with formatted questions
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>AI-Powered Personalized Learning Assistant</h1>
      <input 
        value={topic} 
        onChange={(e) => setTopic(e.target.value)} 
        placeholder="Enter topic..." 
        style={styles.input}
      />
      <button onClick={fetchQuiz} style={styles.button}>Generate Quiz</button>
      
      <ul style={styles.list}>
        {quiz.map((q, i) => (
          <li key={i} style={styles.listItem}>
            <strong>{q.question}</strong>
            <ul>
              {q.options.map((option, j) => (
                <li key={j}>{option}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Internal CSS Styles
const styles = {
  container: { textAlign: "center", padding: "20px", backgroundColor: "#f4f4f4", minHeight: "100vh" },
  heading: { color: "#333", fontSize: "24px" },
  input: { padding: "10px", fontSize: "16px", width: "300px", margin: "10px", borderRadius: "5px", border: "1px solid #ccc" },
  button: { padding: "10px 20px", fontSize: "16px", backgroundColor: "#007BFF", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
  list: { listStyle: "none", padding: "0", marginTop: "20px" },
  listItem: { backgroundColor: "#fff", padding: "10px", margin: "5px auto", width: "50%", borderRadius: "5px", boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.1)" }
};

export default App;
