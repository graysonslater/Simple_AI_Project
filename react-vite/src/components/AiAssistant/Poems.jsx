// import state managment
import { useState } from "react";
//import styling 
import "./AI.css";

//define the components function
function PoemComponent(){

    //? set up state
    //sets the users query
    const [query, setQuery] = useState("");
    //updates the chat history dis[layed on users screen, note that it is contained in an array
    const [chatHistory, setChatHistory] = useState([]);
    //set a loading message
    const [loading, setLoading] = useState(false);
    //handle error messages
    const [error, setError] = useState(null);

    //handle the submission of a query to the backend 
    //!could this be made a seperate component and imported???
    const handleSubmit = async () => {
        
        // if no query return nothing
        if (!query.trim()) return;

        //set loading state 
        setLoading(true);
        // reset error messages
        setError(null);

        //send the query to the backend
        //! is this not better handled by a store???
        try {
            console.log("TESTING POEM BEFORE RESPONSE")
            const response = await fetch(`/api/ai/poems`,{
                method: "POST",
                headers: {
					"Content-Type": "application/json",
				},
                body: JSON.stringify({ query }),
			});
            console.log("TESTING POEM RESPONSE= ", response)
            ///handle a error from the backend, will come in the response
            if (!response.ok){
                console.log("TESTING POEM RESPONSE NOT OKAY")
                throw new Error(`Server error: ${response.status} ${response.statusText}`);
            }

            //await the response form backend and get its data
            const data = await response.json();
            console.log("TESTING POEM DATA= ",data)
            //set the chat history, prev represents all the data currently containeed within chatHistory
            setChatHistory((prev) => [
                //fill the previous data
                ...prev,
                //add the users most recent query
                {role: "user", content: query},
                //add the AI's most recent response
                {role: "bot", content: data || "No valid Response received"}
            ]);

        //handle errors
        } catch(err) {
            setError("Request failed, please try again later.");
        //reset query and loading state
        } finally {
            setLoading(false);
			setQuery("");
        } 
    };

    //JSX for the actual webpage
    return(
        <div className="AIbox">

			{/* CHAT WINDOW */}
			<div className="ChatWindow">
				{console.log("Poems ARRAY= ", chatHistory)}
				{chatHistory.map((msg, idx) => (
                    
					<div key={idx} className={msg.role === "user" ? "user-msg" : "bot-msg"}>
						{console.log("POEMS TESTING MSG= ", msg)}
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
					placeholder="Give me a poem idea..."
					disabled={loading}
				/>
                {console.log("TESTING POEM INPUT= ", query)}
				<button onClick={handleSubmit} disabled={loading || !query.trim()}>{loading ? "Thinking..." : "Submit"}</button>
			</div>
		</div>
    )
}

export default PoemComponent;