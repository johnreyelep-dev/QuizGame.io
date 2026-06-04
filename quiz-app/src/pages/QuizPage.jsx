import { useEffect } from "react";
import { quizApi } from "../services/quizApi.jsx";

export default function QuizPage() {
    useEffect(() => {
        quizApi().then(data => {
            console.log(data);
        });
    }, []);

    return <div>Quiz Page</div>;
}