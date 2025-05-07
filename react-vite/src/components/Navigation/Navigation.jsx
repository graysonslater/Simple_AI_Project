import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserById } from "../../redux/session";
import LoginModal from "../Modals/LoginModal/LoginModal";
import LogoutModal from "../Modals/LogoutModal/LogoutModal";
import "./Navigation.css";

function Navigation(){
    const dispatch = useDispatch();

    //grab current user data 
    const {user} = useSelector((state) => {return state.session.user});
    console.log("NAVBAR user state= ", user)

    useEffect(() => {
        if(user){
            dispatch(getUserById(user.id))
        }
        },[dispatch]);

    return(
        <div className="NavBarMain">
            <NavLink className="navBarHome" to="/" >
                Home
            </NavLink>
            <NavLink className="navBarPJD" to="/poemJokeDemo" >
                Poem and Joke Demo
            </NavLink>
            <NavLink className="navBarARAI" to="/autoResponseDemo" >
                Auto Responding AI
            </NavLink>
            <NavLink className="navBarDI" to="/dataBaseIntegrationDemo" >
                DataBase Integration
            </NavLink>
            <NavLink className="navBarPoke" to="/pokemon/1" >
                Pokemon Page Test
            </NavLink>

            {/* If user logged in Display profile button else, login button */}
            {user ? (
                <>
                    <NavLink className="navBarProfile" to="/profile" >Profile</NavLink> 
                    <LogoutModal />
                </>
            ) : (
                <LoginModal />)}   
        </div>
    )

}

export default Navigation;