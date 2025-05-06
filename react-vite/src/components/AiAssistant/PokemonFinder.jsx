import { useState } from "react";
import "./AI.css";

export default function PokemonFinder(){
    const greeting = "Hello! Are you looking for a new favorite pokemon? I can help you choose one! Just tell me what you're looking for and I'll give you a few suggestions! Oh, I only know the first 151 pokemon though."
    const [query, setQuery] = useState("");
    const [chatHistory, setChatHistory] = useState([{ role: "bot", content: greeting }]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    //HANDLE SUBMIT
    const handleSubmit = async () => {
        if (!query.trim()) return;
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/ai/pokemon`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query }),
            });

            if (!response.ok) {
                throw new Error(
                    `Server error: ${response.status} ${response.statusText}`
                );
            }

            const data = await response.json();

            setChatHistory((prev) => [
                ...prev,
                { role: "user", content: query },
                { role: "bot", content: data || "No valid response received." },
            ]);
            console.log("CHAT HISTORY= ",chatHistory )
        } catch (err) {
            setError("Request failed, please try again later.");
        } finally {
            setLoading(false);
            setQuery("");
        }
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
                    placeholder="Looking for a pokemon? Let me help!"
                    disabled={loading}
                />
                <button onClick={handleSubmit} disabled={loading || !query.trim()}>{loading ? "Thinking..." : "Submit"}</button>
            </div>
        </div>
    )
}

