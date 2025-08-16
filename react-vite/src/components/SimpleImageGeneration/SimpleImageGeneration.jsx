import SimpleImageAI from "../AiAssistant/SimpleImageAI";
import { useState } from "react";
import "./SimpleImageGeneration.css";

export default function SimpleImageGeneration(){
    const [image, setImage] = useState()
    console.log("FRONTEND IMAGE= ", image)
    return(
        <div className="SIGMainPage">
            <h1 className="SIGTitle">Simple Image Generation</h1>
            <h2 className="sigText">This AI can generate images when given a prompt. Scroll down to interact with the AI by typing in an idea! Unfortunately, the generation time can sometimes take up to 1 or 2 minutes; thank you for your patience!!</h2>
            
            {/* Image display box */}
            <div className="imageDisplayBox">
                {image ? (
                    <img src={`data:image/png;base64,${image}`} alt="Generated Image" />
                ) : (
                    <div className="placeholderText">Generated image will appear here</div>
                )}
            </div>
            
            <div className="SIGBox">                
                <SimpleImageAI setImage={setImage}/>
            </div>
        </div>
    )
}