import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkAuthenticate } from "../../redux/session";
import "./MonsterMaker.css";

export default function MonsterMaker() {
    const navigate = useNavigate();
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [typeOf, setTypeOf] = useState(""); 
	const [monster, setMonster] = useState()
	const [prompt, setPrompt] = useState(""); 
	const [errors, setErrors] = useState({});

    //Type options for new monster
    const options = [ "Normal", "Fire", "Water", "Grass", "Electric", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"];

	//gnerate the monster image
	const generateButton = async () => {
		setErrors(null);

		try {
			const response = await fetch(`/api/images/monster_maker`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ prompt, typeOf, description }),
			});

			if (!response.ok) {
				throw new Error(
					`Server error: ${response.status} ${response.statusText}`
				);
			}

			const data = await response.json();

			// assign image to be displayed in browser
			setMonster(data.image);
		} catch (err) {
			setErrors("Request failed, please try again later.");
		}
	}


	//sends the newly creted monster to the DB
	const handleCreateMonster = async (e) => {
		e.preventDefault();
		e.stopPropagation();
		console.log("HANDLE CREATRE MONSTER TEST")
		try {
			console.log("TRY TEST")
			//convert image into base64
			// const base64Image = await getBase64StringFromDataURL(monster); 
			console.log("IMAGE= ")
			const response = await fetch('/api/images/save_monster', {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: 
				JSON.stringify({
					image: monster, 
					typeOf, 
					description, 
					name 
				}),
			});

			if (!response.ok) {
				throw new Error(
					`Server error: ${response.status} ${response.statusText}`
				);
			}

			const data = await response.json();
			console.log("FRONT END DATA= ", data)
			dispatch(thunkAuthenticate())
			navigate("/profile")
		} catch (err) {
			setErrors("Request failed, please try again later.");
		}
	};


	return (
		<>
			<h1>Make An AI Monster!</h1>
			{monster && <img src={`data:image/png;base64,${monster}`} alt="Generated Image" />}
			<h2>Give your mosnter a name!</h2>
			<label>
				Name
				<input
					type="text"
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
			</label>
			<h2>Give your mosnter description about how it behaves, what it likes, etc</h2>
			<label>
				Description
				<input
					type="text"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					required
				/>
			</label>
			<h2>Describe what you want your monster to look like to help generate an image!</h2>
			<label>
				Prompt
				<input
					type="text"
					value={prompt}
					onChange={(e) => setPrompt(e.target.value)}
					required
				/>
			</label>	
			<h2>Select a type for your monster</h2>			
			<select value={typeOf} onChange={(e) => setTypeOf(e.target.value)} required>
				<option value="">Select type</option>
				{options.map((opt, idx) => (
					<option value={opt} key={idx}>{opt}</option>
				))}
			</select>								
			<button 
				className="GenerateButton" 
				type="button" 
				disabled={!typeOf || !prompt || !description}
				onClick={(e) => generateButton(e)}
			>
				Generate Monster
			</button>
			<button 
				type="button"
				disabled={!typeOf || !monster || !description || !name}
				onClick={(e) => handleCreateMonster(e)}
			>
				Save Monster
			</button>
		</>
	);
}
