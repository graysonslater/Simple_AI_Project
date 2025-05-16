import SimpleImageAI from "../AiAssistant/SimpleImageAI";
import { useState } from "react";
import "./SimpleImageGeneration.css";

export default function SimpleImageGeneration(){
    const [image, setImage] = useState()
    console.log("FRONTEND IMAGE= ", image)
    return(
        <div className="SIGMainBox">
            <h1>Simple Image Generation</h1>
            <h3>This AI can generate images when given a prompt</h3>
            {image && <img src={`data:image/png;base64,${image}`} alt="Generated Image" />}
            <div className="SIGBox">                
                <SimpleImageAI setImage={setImage}/>
            </div>
        </div>
    )
}