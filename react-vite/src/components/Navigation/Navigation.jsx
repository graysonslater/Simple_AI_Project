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
            <NavLink className="navBarARAI" to="/autoResponseDemo" >
                Auto Responding AI
            </NavLink>
            <NavLink className="navBarDI" to="/dataBaseIntegrationDemo" >
                DataBase Integration
            </NavLink>
            <NavLink className="navBarPoke" to="/pokemon/1" >
                Pokemon Page Test
            </NavLink>
        </div>
    )

}

export default Navigation;