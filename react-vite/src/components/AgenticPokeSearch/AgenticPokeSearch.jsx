import AgenticPokemonFinder from "../AiAssistant/AgenticPokemonFinder"
import "./AgenticPokeSearch.css"

export default function AgenticPokeSearch(){

    return (
        <div className="AgenticPokeMainPage">
            <h1 className="AgenticPokeTitle">Agentic DB search</h1>
            <h2 className="AgenticPokeAi">
                Uses AI to first parse a users response for potential search tags, uses those AI generated tags as query 
                parameters to find any pokemon who may have those tags and uses that quired data to recomend a pokemon 
                to the user.
            </h2>
            <h2>Agentic Pokemon Finder AI</h2>
            <AgenticPokemonFinder />
        </div>
    )
}
