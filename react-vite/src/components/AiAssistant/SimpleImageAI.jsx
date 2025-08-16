import { useState } from "react";
import "./AI.css";

export default function SimpleImageAI({setImage}){
	const greeting = "I can generate an image for you! Just give me a prompt and i'll get to work!"
	const [prompt, setPrompt] = useState("");
	const [chatHistory, setChatHistory] = useState([{ role: "bot", content: greeting }]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	//HANDLE SUBMIT
	const handleSubmit = async () => {
		if (!prompt.trim()) return;
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(`/api/images/simpleImage`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ prompt }),
			});

			if (!response.ok) {
				throw new Error(
					`Server error: ${response.status} ${response.statusText}`
				);
			}

			const data = await response.json();

			// assign image to be displayed in browser
			setImage(data.image);

			setChatHistory((prev) => [
				...prev,
				{ role: "user", content: prompt },
				{ role: "bot", content: data.message ? data.message : data.error || "No valid response received." },
			]);
		} catch (err) {
			setError("Request failed, please try again later.");
		} finally {
			setLoading(false);
			setPrompt("");
		}
	};

	return(
		<div className="AIbox">

			{/* CHAT WINDOW */}
			<div className="ChatWindow">
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
					value={prompt}
					onChange={(e) => setPrompt(e.currentTarget.value)}
					placeholder="Request an Image..."
					disabled={loading}
				/>
				<button onClick={handleSubmit} disabled={loading || !prompt.trim()}>{loading ? "Thinking..." : "Submit"}</button>
			</div>
		</div>
	)
}