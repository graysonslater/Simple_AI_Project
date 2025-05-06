import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { thunkLogin, demoLogin } from "../../../../redux/session";
import CustomModal from "../../../../context/CustomModal";


export default function LoginModal(){
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [showLogin, setShowLogin] = useState(false); // used to help toggle the modal


    //grab current user data (to ensure there is NO user currently logged in - if user is logged na nd sees login modal there is a PROBLEM)
    const {user} = useSelector((state) => {
        return{ 
        user: state.session.user,
        }
    });
    // console.log("LOGIN MODAL useSelector= ", "USER= ", user)


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
    const loginToggle = (e) => { //!NEEDS TO BE UPDATED
        e.preventDefault();
        e.stopPropagation();
        setShowLogin(!showLogin);
    };


    //The html that will appear inside the modal once it pops up
    const LoginModalHTML = () => { 
        return (
            <div className="LoginButton">
                {showLogin && (
                    <CustomModal onClose={(e) => loginToggle(e)}>
                        <form onSubmit={handleLogin}>
                            <label>
                            Email
                            <input
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            </label>
                            {errors.email && <p>{errors.email}</p>}
                            <label>
                            Password
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            </label>
                            {errors.password && <p>{errors.password}</p>}
                            <button type="submit">Log In</button>
                        </form>
                        <button className="loginDemo" onClick={demoLoginHandler}>Login in as Demo User</button>     
                    </CustomModal>
                )}
            </div>
        );
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
            <LoginModalHTML />
        </>
    )
}