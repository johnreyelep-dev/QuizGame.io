export async function quizApi() {
    const cached = sessionStorage.getItem("quiz");
    if (cached) return JSON.parse(cached);  // ✅ survives page refresh

    try {
        const res = await fetch("https://opentdb.com/api.php?amount=10&type=multiple");

        if (!res.ok) {
            console.log("API error:", res.status);
            return null;
        }

        const data = await res.json();

        if (data.response_code !== 0) {
            console.log("OpenTDB error:", data.response_code);
            return null;
        }

        sessionStorage.setItem("quiz", JSON.stringify(data.results));
        return data.results;

    } catch(err) {
        console.log(err);
        return null;
    }
}