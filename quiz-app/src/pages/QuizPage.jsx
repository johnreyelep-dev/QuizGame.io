import { useState} from "react";
import { useEffect } from "react";
import { quizApi } from "../services/quizApi.jsx";

export default function QuizPage() {

    const [quiz, setQuiz] = useState([]);
    const [ready, setReady] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        async function loadQuiz() {
            const data = await quizApi();

            if (!data) {
                setError(true);
                setReady(true);
                return;
            }
            console.log(data);

            setQuiz(data);
            setReady(true);
        }
        loadQuiz();
    }, []);

    if (!ready) return <h1>Loading...</h1>;
    if (error) return <h1>Failed to load quiz. Please try again later.</h1>;

    function QuestionCard({ difficult, category, question, correct_answer, }) {
        return(
            <ul>
                {quiz.map((q, index) => (
                    <li key={index}>
                        <div>
                            <h1>{q.difficulty}</h1>
                            <h3>{}</h3>
                        </div>
                    </li>
                ))}
            </ul>
        );
    }
    return (
        <>
            <QuestionCard/>
        </>
    );
}