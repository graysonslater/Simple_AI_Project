import { useDispatch } from "react-redux";
import { useState } from "react";
import { thunkLogin, demoLogin } from "../../../redux/session";
import { LoginModalHTML } from "./LoginModalHTML";


export default function LoginModal(){

    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [showLogin, setShowLogin] = useState(false); // used to help toggle the modal


    //send Login attempt to backend
    const handleLogin = async (e) => {
        e.preventDefault();
        
        const serverResponse = await dispatch(
          thunkLogin({
            email,
            password,
          })
        );
    
        if (serverResponse) {
          setErrors(serverResponse);
        } else {
            setShowLogin(!showLogin)
        }
    };

    //Login as a Demo User
    const demoLoginHandler = async (e) => {
        e.preventDefault();
        await dispatch(demoLogin());
        setShowLogin(false);
      };


    //toggle for modal
    const loginToggle = (e) => { 
        e.preventDefault();
        e.stopPropagation();
        setShowLogin(!showLogin);
    };
 

    return(
        <>  
            <div className="LoginButton">
                    <button 
                        className="LoginToggleButton" 
                        type="button" 
                        onClick={(e) => loginToggle(e)}
                    >
                        Login
                    </button>
            </div>
            <LoginModalHTML
                showLogin={showLogin}
                loginToggle={loginToggle}
                handleLogin={handleLogin}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
                errors={errors}
                demoLoginHandler={demoLoginHandler}
            />
        </>
    )
}