import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

export default function MonsterMaker() {
    const navigate = useNavigate();
	const dispatch = useDispatch();
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [typeOf, setTypeOf] = useState(""); 
	const [errors, setErrors] = useState({});

    //Type options for form data
    const options = [ "Normal", "Fire", "Water", "Grass", "Electric", "Ice", "Fighting", "Poison", "Ground", "Flying", "Psychic", "Bug", "Rock", "Ghost", "Dragon", "Dark", "Steel", "Fairy"];

	const handleCreateMonster = async (e) => {
		e.preventDefault();

		const serverResponse = await dispatch(
			thunkSignup({ //! THIS NEEDS TO BE CHANGED
				name,
				description,
				typeOf
			})
		);

		if (serverResponse) {
			setErrors(serverResponse);
		} else {
			navigate("/profile");
		}
	};


	return (
		<>
			<h1>Make An AI Monster!</h1>
			{errors.server && <p>{errors.server}</p>}
			<form onSubmit={handleCreateMonster}>
				<label>
					Name
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</label>				
				<select value={typeOf} onChange={(e) => setTypeOf(e.target.value)} required>
                    <option value="">Select type</option>
                    {options.map((opt, idx) => (
                        <option value={opt} key={idx}>{opt}</option>
                    ))}
                </select>				
				<label>
					Description
					<input
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
				</label>				
                <button 
                    className="GenerateButton" 
                    type="button" 
                    onClick={(e) => generateButton(e)}
                >
                    Generate Monster
                </button>
				<button type="submit">Save Monster</button>
			</form>
		</>
	);
}
