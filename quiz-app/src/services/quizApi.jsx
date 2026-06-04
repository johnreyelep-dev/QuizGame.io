export async function quizApi() {

    const res = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");

    return await res.json();
}