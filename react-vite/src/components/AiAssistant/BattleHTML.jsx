import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import MonsterImageBattlePage from "../AiAssistant/MonsterImageBattlePage";
import "./AI.css"


export default function BattlePage(){
    const [chosenMonster, setChosenMonster ] = useState()
    
    const user  = useSelector((state) => 
        {return state.session.user} 
    );
    
    //prints changes to state variables
    useEffect(() => {
        console.log("BATTLE HTML USER= ", user, "CHOSEN MON= ", chosenMonster)
    }, [ user, chosenMonster ]);

    return (
        <div className="BattleHTMLBox">
            <div className="UsersFightingMonster">
                <MonsterImageBattlePage 
                    monsterId={chosenMonster} 
                    className={`monsterBattling${chosenMonster}`}
                    showStats={true}
                />
            </div>
        </div>
    )
}