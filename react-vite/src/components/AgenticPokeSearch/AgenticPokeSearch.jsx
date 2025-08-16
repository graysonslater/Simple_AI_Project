import AgenticPokemonFinder from "../AiAssistant/AgenticPokemonFinder"
import "./AgenticPokeSearch.css"

export default function AgenticPokeSearch(){

    return (
        <div className="AgenticPokeMainPage">
            <h1 className="AgenticPokeTitle">Intelligent Query Assistant</h1>
            <h2 className="agenticPokeText">
                Uses AI to first parse a users response for potential search tags, uses those AI generated tags as query 
                parameters to find any pokemon who may have those tags and uses that data to recomend a pokemon 
                to the user.
            </h2>
            <AgenticPokemonFinder />
        </div>
    )
}
