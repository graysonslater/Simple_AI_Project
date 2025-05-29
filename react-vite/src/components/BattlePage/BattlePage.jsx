import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getOpponentMonster } from "../../redux/AImonsters";
import MonsterImageBattlePage from "../AiAssistant/MonsterImageBattlePage";
import "./BattlePage.css"


export default function BattlePage(){
    const dispatch = useDispatch()
    const [chosenMonster, setChosenMonster ] = useState()
    
    const {user,opponentMonster } = useSelector((state) => {
        return {
            'user':state.session.user,
            'opponentMonster': state.aiMonsters.opponentMonster
        }} 
    );
    
    //prints changes to state variables
    useEffect(() => {
        console.log("BATTLE PAGE USER= ", user, "CHOSEN MON= ", chosenMonster, " OP MON= ", opponentMonster && opponentMonster.name ? opponentMonster.name : "no name" )
    }, [ dispatch, user, chosenMonster, opponentMonster ]);

    const handleOpponentMonster = async () => {
        dispatch(getOpponentMonster())
    }

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
            <div className="FightingMonsters">
                <div className="UsersMonster">
                    <MonsterImageBattlePage 
                        monsterId={chosenMonster} 
                        className={`monsterBattling${chosenMonster}`}
                        showStats={true}
                    />
                </div>
                <button className="BattleButton" onClick={() => handleOpponentMonster()}>Generate Battle!</button>
                {opponentMonster && (
                    <div className="OpponentMonster">
                        <h3 className="OppMonster">{opponentMonster.name}</h3>
                        <img src={`data:image/png;base64,${opponentMonster.image}`} alt={`${opponentMonster.name}`} style={{ cursor: 'pointer' }} />
                        <p className="OppMonsterAtt">Attack: {opponentMonster.attack}</p>
                        <p className="OppMonsterDff">Defense: {opponentMonster.defense}</p>
                    </div>
                )}
            </div>           
            )}
        </div>
    )
}