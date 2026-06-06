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

    function ShowAnswer(correct_answer){
        return (
            <div>
                <span>{correct_answer}</span>
            </div>
        );
    }

    function QuestionCard() {
        return(
            <ul className='w-full grid grid-cols1 justify-center items-center gap-5'>
                {quiz.map((q, index) => (
                    <li key={index} className='w-150 h-50 bg-white/10 backdrop-blur-2xl border border-white rounded-2xl shadow-[0px_0px_5px_rgba(107,115,255,1)'>
                        <div className='relative flex flex-col p-2 space-y-3'>
                            <div className='h-1/2 flex justify-between'>
                                <span className='text-xl text-white font-semibold'>{q.category}</span>
                                {
                                    q.difficulty === "easy" && <span className='text-md text-green-500 font-semibold'>{q.difficulty}</span> ||
                                    q.difficulty === "medium" && <span className='text-md text-blue-800 font-semibold'>{q.difficulty}</span>
                                }
                            </div>
                            <span className='h-10 text-md text-white '>{q.question}</span>
                            <div className=' '>
                                <input type='text' placeholder='Enter your answer' className='w-full text-white border-b border-white focus:outline-none'/>
                                <div className='w-full flex justify-between pt-5'>
                                    <button className='text-white bg-blue-600/30 border border-white rounded-md py-2 px-3 cursor-pointer
                                        hover:bg-blue-600'
                                        onClick={ShowAnswer}>Show answer</button>
                                    <button className='text-white bg-green-700/70 border border-white rounded-md py-2 px-3 cursor-pointer
                                        hover:bg-green-700'>Submit answer</button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        );
    }
    return (
        <div className='relative w-full flex flex-col justify-center items-center pt-20'>
            <h1 className='text-6xl text-white font-semibold pb-10'>QuizGame.io</h1>
            {
                !ready && <div className='absolute'>
                    <span className='loading'>Loading...</span>
                </div>
            }
            {
                error && <div></div>
            }

            <QuestionCard/>
        </div>
    );
}