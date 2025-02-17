import { useState } from "react";
import "./AiAssistant.css";

function AIcomponent(){
	const [query, setQuery] = useState("");
	const [chatHistory, setChatHistory] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	//HANDLE SUBMIT
	const handleSubmit = async () => {
		//verify input
		if (!query.trim()) return;
		
		//activate loading message
		setLoading(true);
		//clear previous error messages
		setError(null);

	}

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
					value={query}
					onChange={(e) => setQuery(e.currentTarget.value)}
					placeholder="Type something here..."
					disabled={loading}
				/>
				<button onClick={handleSubmit} disabled={loading || !query.trim()}>{loading ? "Full Send..." : "Submit"}</button>
			</div>
		</div>
	)
}

export default AIcomponent;