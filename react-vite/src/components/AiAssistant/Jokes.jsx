import { useState } from "react";
import "./AI.css";

function JokeComponent(){
	const [query, setQuery] = useState("");
	const [chatHistory, setChatHistory] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	//HANDLE SUBMIT
	const handleSubmit = async () => {
		if (!query.trim()) return;
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(`/api/ai/jokes`, {
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
				{console.log("Poem ARRAY= ", chatHistory)}
				{chatHistory.map((msg, idx) => (
					<div key={idx} className={msg.role === "user" ? "user-msg" : "bot-msg"}>
						{msg.content}
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
					placeholder="Give me a joke idea..."
					disabled={loading}
				/>
				<button onClick={handleSubmit} disabled={loading || !query.trim()}>{loading ? "Thinking..." : "Submit"}</button>
			</div>
		</div>
	)
}

export default JokeComponent;