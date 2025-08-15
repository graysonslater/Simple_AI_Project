import PokemonFinder from "../AiAssistant/PokemonFinder"
import "./DatabaseIntegrationDemo.css"

export default function DatabaseIntegrationDemo(){

    return (
        <div className="DBMainPage">
            <h1 className="Title">DB Integration Demo</h1>
            <h2 className="dbintagrationText">Objective is to create an AI interface which will search a DB for the most desirable result based on a users query and then display a link to the results webpage</h2>
            <PokemonFinder />
        </div>
    )
}
