import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import MonsterImageBattlePage from "../AiAssistant/MonsterImageBattlePage";
import "./BattlePage.css"


export default function BattlePage(){
    const [chosenMonster, setChosenMonster ] = useState()
    
    const user  = useSelector((state) => 
        {return state.session.user} 
    );
    
    //prints changes to state variables
    useEffect(() => {
        console.log("BATTLE PAGE USER= ", user, "CHOSEN MON= ", chosenMonster)
    }, [ user, chosenMonster ]);

    return (
        <div className="BattlePageBox">
            {/* Show loading if user data isn't ready */}
            {!user ? (
            <div>Loading...</div>
            ) : !chosenMonster ? (
            <ul className="UsersChoiceList">
                <h2>Choose your character!</h2>
                {user.ai_monsters.map((poke) => (
                <li key={poke.id} className={`UserPoke${poke.id}`}>
                    <h3 className={`UserPoke${poke.name}`}>{poke.name}</h3>
                    <MonsterImageBattlePage
                    className={`monsterSelection${poke.id}`}
                    monsterId={poke.id}
                    showStats={false}
                    onClick={() => setChosenMonster(poke.id)}
                    />
                    <p className={`UserPokeAtt${poke.name}`}>Attack: {poke.attack}</p>
                    <p className={`UserPokeDff${poke.name}`}>Defense: {poke.defense}</p>
                </li>
                ))}
            </ul>
            ) : (

            // Monster is chosen, battling can begin
            <div className="UsersFightingMonster">
                <MonsterImageBattlePage 
                    monsterId={chosenMonster} 
                    className={`monsterBattling${chosenMonster}`}
                    showStats={true}
                />
            </div>
            )}
        </div>
    )
}