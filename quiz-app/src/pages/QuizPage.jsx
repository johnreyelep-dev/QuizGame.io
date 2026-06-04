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

    function QuestionCard() {
        return(
            <ul className='w-full grid grid-cols1 justify-center items-center gap-5'>
                {quiz.map((q, index) => (
                    <li key={index} className='w-150 h-50 border border-white rounded-2xl shadow-[0px_0px_5px_rgba(107,115,255,1)'>
                        <div className='p-2 space-y-2'>
                            <div className='flex justify-between'>
                                <span>{q.category}</span>
                                <span>{q.difficulty}</span>
                            </div>
                            <span>{q.question}</span>
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