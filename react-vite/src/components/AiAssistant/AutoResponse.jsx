import { useState } from "react";
import "./AI.css"; 

export default function AutoResponse(){

    const [query, setQuery] = useState("");
	const [chatHistoryAI1, setChatHistoryAI1] = useState([]);
	const [chatHistoryAI2, setChatHistoryAI2] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	//HANDLE SUBMIT
	const handleSubmit = async () => {
		if (!query.trim()) return;
		setLoading(true);
		setError(null);

		try {
			// Handle AI-1 Query
			const responseAI1 = await fetch(`/api/ai/nervous`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ query }),
			});

			if (!responseAI1.ok) {
				throw new Error(
					`Server error: ${responseAI1.status} ${responseAI1.statusText}`
				);
			}
			const dataAI1 = await responseAI1.json();

			// Handle AI-2 Query
			const responseAI2 = await fetch(`/api/ai/grumpy`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ dataAI1 }),
			});
			if (!responseAI2.ok) {
				throw new Error(
					`Server error: ${responseAI2.status} ${responseAI2.statusText}`
				);
			}
			const dataAI2 = await responseAI2.json();

			setChatHistoryAI1((prev) => [
				...prev,
				{ role: "user", content: query },
				{ role: "bot", content: dataAI1  || "No valid response received." },
			]);

			setChatHistoryAI2(() => [
				{ role: "bot", content: dataAI2 || "No valid response received." },
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

			{/* USER INTERACTS WITH AI */}
			<div className="AI1">
				<h2>AI-1</h2>
				{/* CHAT WINDOW */}
				<div className="ChatWindow">
					{console.log("Poem ARRAY= ", chatHistoryAI1)}
					{chatHistoryAI1.map((msg, idx) => (
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
						placeholder="Give me a prompt..."
						disabled={loading}
					/>
					<button onClick={handleSubmit} disabled={loading || !query.trim()}>{loading ? "Thinking..." : "Submit"}</button>
				</div>
			</div>

			{/*THIS AI RESPONDS AUTOMATICALLY TO THE RESPONSE OF THE FIRST AI */}
			<div className="AI2">
				<h2>AI-2</h2>
				{/* CHAT WINDOW */}
				<div className="ChatWindow">
					{chatHistoryAI2.map((msg, idx) => (
						<div key={idx} className={msg.role === "bot-msg"}>
							{msg.content}
						</div>	
					))}
					{error && <p className="errorMsg">{error}</p>}
				</div>
			</div>
		</div>
	)
    
}