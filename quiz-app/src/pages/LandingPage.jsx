import { Link } from "react-router-dom";

export default function LandingPage(){

    return(
        <section className='w-full h-screen flex flex-col justify-center items-center gap-20' >
            <h1 className='neonPulse text-9xl text-white font-bold'>QuizGame.io</h1>
            <Link to="/quiz" className='w-100 h-30 flex justify-center items-center rounded-2xl bg-white/10 backdrop-blur-md text-5xl text-white font-semibold cursor-pointer transition-all duration-300 ease-in
                  hover:shadow-[0px_0px_5px_5px_rgba(107,115,255,0.7)] hover:-translate-y-2'
            >Enter</Link>
        </section>
    );
}