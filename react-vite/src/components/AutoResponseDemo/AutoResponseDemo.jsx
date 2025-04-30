import AutoResponse from "../AiAssistant/AutoResponse";
import "./AutoResponseDemo.css"; 

export default function AutoResponseDemo(){
    return (
        <div className="MainBox">
            <h1 className="text1">Automaticaly responding AI Demo</h1>
            <h2 className="text2">The user gives AI-1 a prompt and AI-2 uses AI-1's response as a prompt to automatically generate text</h2>
            <AutoResponse />
        </div>
    )
}