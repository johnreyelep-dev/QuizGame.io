import { useState} from "react";
import { useEffect } from "react";
import { quizApi } from "../services/quizApi.jsx";

function PopUp({index, result}){
    return <div>
        {
            result[index] === true ? <span>Correct</span> : <span>Wrong</span>
        }
    </div>
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
                                    revealed[index] && <span className=''>{q.correct_answer}</span>
                                }
                                <button className='text-white bg-green-700/70 border border-white rounded-md py-2 px-3 cursor-pointer
                                        hover:bg-green-700'
                                        onClick={() => handleSubmit(index, q.correct_answer)}>Submit answer</button>
                            </div>
                        </div>
                        {
                            result[index] !== undefined &&  <PopUp result={result} index={index}/>
                        }
                        {/*{*/}
                        {/*    result[index] === false && <span>Wrong answer</span>*/}
                        {/*}*/}
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
        </div>
    );
}