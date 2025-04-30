import { NavLink } from "react-router-dom";
import "./Navigation.css";

function Navigation(){
    
    return(
        <div className="NavBarMain">
            <NavLink className="navBarHome" to="/" >
                Home
            </NavLink>
            <NavLink className="navBarPJD" to="/poemJokeDemo" >
                Poem and Joke Demo
            </NavLink>
            <NavLink className="navBarPJD" to="/autoResponseDemo" >
                Auto Responding AI
            </NavLink>
        </div>
    )

}

export default Navigation;