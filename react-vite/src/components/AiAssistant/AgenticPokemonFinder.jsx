import { useState, useEffect } from "react";
import "./AI.css";

export default function AgenticPokemonFinder(){
    const greeting = "Hello! Looking for a new favorite Pokemon? I can suggest one for you - just type what kind of pokemon you're looking for below! I have knowledge of the first 151 pokemon so ask away!"
    const [query, setQuery] = useState("");
    const [chatHistory, setChatHistory] = useState([{ role: "bot", content: greeting }]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [oldSearch, setOldSearch] = useState([]);

    useEffect(() => {
        console.log("CHAT HISTORY= ", chatHistory);
    }, [chatHistory]);

    //HANDLE SUBMIT
    const handleSubmit = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setError(null);

        try {
            console.log("FRONTEND PRE QUERy SEARCH RES= ", oldSearch, "chat history", chatHistory)
            const response = await fetch(`/api/ai/agenticPokemon`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query, oldSearch, chatHistory }),
            });

            if (!response.ok) {
                throw new Error(
                    `Server error: ${response.status} ${response.statusText}`
                );
            }

            const data = await response.json();
            setOldSearch(data.oldSearch || []);
            console.log("FRONTEND RETURN DATA Response= ",data.response, "Search res= ", oldSearch)

            setChatHistory((prev) => [
                ...prev,
                { role: "user", content: query },
                { role: "bot", content: data.response || "No valid response received." },
            ]);

        } catch (err) {
            setError("Request failed, please try again later.");
        } finally {
            setLoading(false);
            setQuery("");
        }
    };


    const handleNewSearch = () => {
        setChatHistory([{ role: "bot", content: greeting }])
        setQuery("")
        setError(null)
        setOldSearch([])
    };

    return(
        <div className="AIbox">

            {/* CHAT WINDOW */}
            <div className="ChatWindow">
                {chatHistory.map((msg, idx) => (
                <div key={idx} className={msg.role === "user" ? "user-msg" : "bot-msg"}>
                    {msg.role === "bot" ? (
                        // Render AI content as HTML
                        <span dangerouslySetInnerHTML={{ __html: msg.content }} />
                    ) : (
                        // Render user content as plain text
                        <span>{msg.content}</span>
                    )}
                </div>	
        ))}

                {loading && <p>Loading...</p>}
                {error && <p className="errorMsg">{error}</p>}
            </div>


            {/* INPUT SECTION */}
            <div className="InputSection">
                <input 
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.currentTarget.value)}
                    placeholder="Looking for a pokemon?"
                    disabled={loading}
                />
                <button onClick={handleSubmit} disabled={loading || !query.trim()}>{loading ? "Thinking..." : "Submit"}</button>
                <button onClick={handleNewSearch} disabled={loading || chatHistory.length === 1}>new search</button>
            </div>
        </div>
    )
}

