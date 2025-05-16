import { useState } from "react";
import { useDispatch } from "react-redux";
import { thunkSignup } from "../../../redux/session";
import { SignUpModalHTML } from "./SignUpModalHTML";
import "./SignUpModal.css";


export default function SignUpModal() {

	const dispatch = useDispatch();
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [errors, setErrors] = useState({});
	const [showSignup, setShowSignup] = useState(false);


	const handleSubmit = async (e) => {
		e.preventDefault();
        e.stopPropagation();

        // check password matches
		if (password !== confirmPassword) {
			return setErrors({
				confirmPassword:
					"Confirm Password field must be the same as the Password field",
			});
		}

        // send signup data to backend -create new user
		const serverResponse = await dispatch(
            thunkSignup({
                email,
                username,
                password,
            })
        );
        //handle errors
        if (serverResponse) {
            setErrors(serverResponse);
        } else {
            //close modal
            setShowSignup(!showSignup)
        }
	};

    const signupToggle = (e) => { 
        e.preventDefault();
        e.stopPropagation();
        setShowSignup(!showSignup);
    };


	return (
		<>
			<div className="SignUpButton">
                <button 
                    className="SignUpToggleButton" 
                    type="button" 
                    onClick={(e) => signupToggle(e)}
                >
                    Signup
                </button>
            </div>
            <SignUpModalHTML
                showSignup={showSignup}
                signupToggle={signupToggle}
                handleSubmit={handleSubmit}
                email={email}
                setEmail={setEmail}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                confirmPassword={confirmPassword}
                setConfirmPassword={setConfirmPassword}
                errors={errors}
            />
		</>
	);
}