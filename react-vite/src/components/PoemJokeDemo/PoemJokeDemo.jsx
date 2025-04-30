import JokeComponent from "../AiAssistant/jokes";
import PoemComponent from "../AiAssistant/Poems";
import "./PoemJokeDemo.css";

function PoemJokeDemo(){
    return(
        <div className="PJDMainBox">
            <h1>Poem and Joke Demo</h1>
            <div className="PoemBox">
                <h2>Poems</h2>
                <h3>This AI is directed to only write poems</h3>
                <PoemComponent />
            </div>
            <div className="JokeBox">
                <h2>Jokes</h2>
                <h3>This AI is directed to only tell jokes</h3>
                <JokeComponent />
            </div>
        </div>
    )
}

export default PoemJokeDemo;