import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserById } from "../../redux/session";
import LoginModal from "../Modals/LoginModal/LoginModal";
import LogoutModal from "../Modals/LogoutModal/LogoutModal";
import SignUpModal from "../Modals/SignUpModal/SignUpModal";
import "./Navigation.css";

export default function Navigation(){
    const dispatch = useDispatch();

    //grab current user data 
    const user = useSelector((state) => {return state.session.user});
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
            <div className="dropdown">
                <button className="dropbtn">Simple Demos</button>
                <div className="dropdown-content">
                    <NavLink className="navBarPJD" to="/poemJokeDemo">
                        Poem and Joke Demo
                    </NavLink>
                    <NavLink className="navBarARAI" to="/autoResponseDemo">
                        Auto Responding AI
                    </NavLink>
                </div>
            </div>

            <div className="dropdown">
                <button className="dropbtn">ADV Demos</button>
                <div className="dropdown-content">
                    <NavLink className="navBarDI" to="/dataBaseIntegrationDemo" >
                        Pokemon Finder
                    </NavLink>
                    <NavLink className="navBarPoke" to="/agenticPokemonSearch" >
                        Intelligent Query 
                    </NavLink>
                    <NavLink className="navBarSIG" to="/simpleImageGeneration" >
                        Simple Image Gen 
                    </NavLink>
                    {user && 
                        <div className="UserLoggedInNavBar">
                            <NavLink className="navBarMM" to="/monsterMaker" >
                                Monster Maker
                            </NavLink> 
                            <NavLink className="navBarBA" to="/battleArena" >
                                Battle Arena
                            </NavLink> 
                        </div>
                    }
                </div>
            </div>
            
            <NavLink className="navBarPoke" to="/pokemon/1" >
                Pokemon Page 
            </NavLink>
        
            {/* If user logged in Display profile button else, login button */}
            {user ? (
                <>  
                    <NavLink className="navBarProfile" to="/profile" >Profile</NavLink> 
                    <LogoutModal />
                </>
            ) : (
                <>
                    <LoginModal />
                    <SignUpModal />
                </>
            )}   
        </div>
    )

}