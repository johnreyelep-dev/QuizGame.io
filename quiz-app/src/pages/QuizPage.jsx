import { useState} from "react";
import { useEffect } from "react";
import { quizApi } from "../services/quizApi.jsx";
import { Link } from "react-router-dom";

function PopUp({index, result, setResult}){
    return (
        <div className={`relative flex w-full h-full justify-center items-center rounded-2xl pointer-events-auto transition-all duration-300 ease-in-out 
            ${result[index] === true ? "bg-green-600" : "bg-red-600"}`}>
        {
            result[index] === true ? <span className='text-3xl text-white font-semibold'>Correct</span> : <span className='text-3xl text-white font-semibold'>Wrong</span>
        }
        <div className='absolute group bg-white/40 w-6 h-6 flex justify-center items-center top-2 right-3 rounded-full pb-2 transition-all duration-300 ease-in hover:bg-white'>
            <button className={`text-2xl text-white font-bold cursor-pointer ${result[index] === true ? "group-hover:text-green-500" : "group-hover:text-red-600"}`}
            onClick={() => setResult(prev => {
                const next = {...prev};
                delete next[index];
                return next;
            })}>x</button>
        </div>
    </div>
    );
}

function QuestionCard({quiz}) {

    const [revealed, setRevealed] = useState({});
    const [answer, setAnswer] = useState({});
    const [result, setResult] = useState({});

    function handleSubmit(index, correct_answer) {
        const ans = answer[index];

        if (!ans){
            return;
        }
        const isCorrect = correct_answer.toLowerCase().trim() === ans.toLowerCase().trim();
        setResult((prev) => ({...prev, [index]: isCorrect}));
    }

    return(
        <ul className='w-full h-[60vh] flex flex-col items-center gap-5 overflow-y-scroll mb-5'>
            {quiz.map((q, index) => (
                <li key={index} className='w-150 h-50 bg-white/10 backdrop-blur-2xl border border-white rounded-2xl shadow-[0px_0px_5px_rgba(107,115,255,1)'>
                    <div className='relative w-full flex flex-col p-2 space-y-3'>
                        <div className='h-1/2 flex justify-between'>
                            <span className='text-xl text-white font-semibold'>{q.category}</span>
                            {
                                q.difficulty === "easy" && <span className='text-md text-green-500 font-semibold'>{q.difficulty}</span>
                            }
                            {
                                q.difficulty === "medium" && <span className='text-md text-blue-800 font-semibold'>{q.difficulty}</span>
                            }
                        </div>
                        <span className='h-10 text-md text-white '>{q.question}</span>
                        <div className=''>
                            <input type='text'
                                   placeholder='Enter your answer'
                                   value={answer[index] || ""}
                                   onChange={(e) => setAnswer((prev) => ({...prev, [index]: e.target.value}))}
                                   className='w-full text-white border-b border-white focus:outline-none'/>
                            <div className='w-full flex justify-between pt-5'>
                                <button className='text-white bg-blue-600/30 border border-white rounded-md py-2 px-3 cursor-pointer
                                        hover:bg-blue-600'
                                        onClick={() => setRevealed((prev) => ({...prev, [index]: !prev[index]}))}>Show answer</button>
                                {
                                    revealed[index] && <span className='text-xl text-white font-bold'>Answer: {q.correct_answer}</span>
                                }
                                <button className='text-white bg-green-700/70 border border-white rounded-md py-2 px-3 cursor-pointer
                                        hover:bg-green-700'
                                        onClick={() => handleSubmit(index, q.correct_answer)}>Submit answer</button>
                            </div>
                        </div>

                        { result[index] !== undefined && (
                            <div className='absolute w-full h-[70%] flex justify-center items-center pointer-events-none'>
                                <div className='flex w-[70%] h-[80%] justify-center items-center'>
                                      <PopUp result={result} index={index} setResult={setResult}/>
                                </div>
                            </div>)
                        }
                    </div>
                </li>
            ))}
        </ul>
    );
}

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

            {
                ready && !error && <QuestionCard quiz={quiz}/>
            }
            <Link to='/' className='bg-white/10 w-150 h-15 flex justify-center items-center text-3xl text-white font-semibold rounded-2xl border border-white
            transition-all duration-300 ease-in hover:shadow-[0px_0px_5px_5px_rgba(107,115,255,0.7)] hover:-translate-y-2'>Back</Link>
        </div>
    );
}