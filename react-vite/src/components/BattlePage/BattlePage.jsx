import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getOpponentMonster, resetOpponentMonster, getUsersMonster } from "../../redux/AImonsters";
import MonsterImageBattlePage from "../AiAssistant/MonsterImageBattlePage";
import "./BattlePage.css"


export default function BattlePage(){
    const dispatch = useDispatch()
    const [chosenMonster, setChosenMonster ] = useState()
    const [userMonsterHealth, setuserMonsterHealth ] = useState()
    const [oppMonsterHealth, setoppMonsterHealth ] = useState()
    const [healthCheck, setHealthCheck] = useState(false);
    
    const {user, opponentMonster } = useSelector((state) => {
        return {
            'user':state.session.user,
            'opponentMonster': state.aiMonsters.opponentMonster
        }} 
    );    
    //prints changes to state variables
    useEffect(() => {
        console.log("BATTLE PAGE USER= ", user, "CHOSEN MON= ", chosenMonster, " OP MON= ", opponentMonster && opponentMonster.name ? opponentMonster.name : "no name" )
    }, [ dispatch, user, chosenMonster, opponentMonster ]);

    // reset the users monster on page load
    useEffect(() => {
        dispatch(resetOpponentMonster())
    }, [ dispatch ]);

    

    const handleOpponentMonster = async () => {
        const oppMon = await dispatch(getOpponentMonster());
        const userMon = await dispatch(getUsersMonster(chosenMonster))
        setoppMonsterHealth(oppMon.health);
        setuserMonsterHealth(userMon.health);
        
        setHealthCheck(false);
        
    };


    return (
        <div className="BattlePageBox">
            {/*Choose a monster to battle with - Show loading if user data isn't ready */}
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
                            userList={true}
                            showStats={false}
                            oppHTML={false}
                            onClick={() => setChosenMonster(poke.id)}
                        />
                        <p className={`UserPokehealth${poke.name}`}>Health: {poke.health}</p>
                        <p className={`UserPokeAtt${poke.name}`}>Attack: {poke.attack}</p>
                        <p className={`UserPokeDff${poke.name}`}>Defense: {poke.defense}</p>
                        {opponentMonster && (<button className="UserAttackButton" onClick={() => userAttack()}>Generate Battle!</button>)}
                    </li>
                ))}
            </ul>
            ) : (

            // Monster is chosen, battling can begin
            <div className="FightingMonsters">
                <div className="UsersMon">
                    <MonsterImageBattlePage 
                        opponentMonster={opponentMonster}
                        monsterId={chosenMonster} 
                        healthCheck={healthCheck}
                        setHealthCheck={setHealthCheck}
                        userMonsterHealth={userMonsterHealth} 
                        setuserMonsterHealth={setuserMonsterHealth}
                        oppMonsterHealth={oppMonsterHealth}                       
                        setoppMonsterHealth={setoppMonsterHealth}
                        className={`UsermonsterBattling${chosenMonster}`}
                        showStats={true}                      
                        userList={false}
                        oppHTML={false}
                    />
                </div>
                <ul className="ChangeMonsterList">
                    {user.ai_monsters.filter((poke) => poke.id !== chosenMonster).map((poke) => (
                        <li key={poke.id} className={`StandbyPoke${poke.id}`}>
                            <MonsterImageBattlePage
                                className={`StandbyPokeImage${poke.id}`}
                                monsterId={poke.id}
                                userList={true}
                                showStats={false}
                                oppHTML={false}
                                onClick={() => {if (!healthCheck) setChosenMonster(poke.id), setuserMonsterHealth(poke.health), setoppMonsterHealth(opponentMonster.health)}}
                            />
                        </li>
                    ))}
                </ul>
                <div className="BattleButton">
                    <button
                        className="BattleButton"
                        disabled={!healthCheck && opponentMonster}
                        style={{
                            backgroundColor: (!healthCheck && opponentMonster) ? '#ccc' : '#4CAF50',
                            color: (!healthCheck && opponentMonster) ? '#888' : '#fff',
                            cursor: (!healthCheck && opponentMonster) ? 'not-allowed' : 'pointer'
                        }}
                        onClick={() => handleOpponentMonster()}
                        >
                        {!healthCheck ? "Generate Battle!" : "Click for a new battle!"}
                    </button>
                </div>
                {opponentMonster && (<div className="opponentsMon">
                    <MonsterImageBattlePage 
                        opponentMonster={opponentMonster}
                        monsterId={chosenMonster}
                        oppMonsterHealth={oppMonsterHealth} 
                        className={`OpponentmonsterBattling${opponentMonster.name}`}
                        showStats={true}
                        oppHTML={true}
                        userList={false}
                    />
                </div>)}
            </div>           
            )}
        </div>
    )
}