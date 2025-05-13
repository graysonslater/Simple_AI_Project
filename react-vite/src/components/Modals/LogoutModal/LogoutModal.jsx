import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { thunkLogout } from "../../../redux/session";
import CustomModal from "../../../context/CustomModal";


export default function LogoutModal(){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showLogout, setshowLogout] = useState(false); 


    //grab current user data 
    const user = useSelector((state) => {return state.session.user});
    // console.log("LOGOUT MODAL useSelector= ", "USER= ", user)


    //send Login attempt to backend
    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(thunkLogout());
        navigate("/");
    };

    
    //toggle for modal
    const logoutToggle = (e) => { 
        e.preventDefault();
        e.stopPropagation();
        setshowLogout(!showLogout);
    };


    //The html that will appear inside the modal once it pops up
    const LogOutModalHTML = () => { 
        return (
            <div className="LoginButton">
                {showLogout && (
                    <CustomModal onClose={(e) => logoutToggle(e)}>
                        <p>Are you sure you want to logout?</p>
                        <button onClick={handleLogout}>Logout</button>
                        <button onClick={logoutToggle}>Cancel</button>
                    </CustomModal>
                )}
            </div>
        );
    };
 

    //html injected into navbar
    return(
        <>  
            <div className="LogOutButton">
                    <button 
                        className="logoutToggleButton" 
                        type="button" 
                        onClick={(e) => logoutToggle(e)}
                    >
                        Logout
                    </button>
            </div>
            <LogOutModalHTML />
        </>
    )
}