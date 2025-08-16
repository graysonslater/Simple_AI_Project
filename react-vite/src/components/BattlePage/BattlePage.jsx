import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getOpponentMonster, resetOpponentMonster, getUsersMonster } from "../../redux/AImonsters";
import BattlePageStage2 from "./BattlePageStage2";
import MonsterImageBattlePage from "../AiAssistant/MonsterImageBattlePage";
import "./BattlePage.css"


export default function BattlePage(){
    const dispatch = useDispatch()
    const [chosenMonster, setChosenMonster ] = useState()
    const [userMonsterHealth, setuserMonsterHealth ] = useState(111)
    const [oppMonsterHealth, setoppMonsterHealth ] = useState()
    const [healthCheck, setHealthCheck] = useState(false);
    
    // Individual state variables for each monster
    const [monster1, setMonster1] = useState(null);
    const [monster2, setMonster2] = useState(null);
    const [monster3, setMonster3] = useState(null);
    
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

    // Create individual copy objects for each user's AI monsters
    useEffect(() => {
        if (user && user.ai_monsters) {
            user.ai_monsters.forEach((monster, index) => {
                const monsterCopy = {
                    ...monster,
                    id: monster.id,
                    name: monster.name,
                    type_of: monster.type_of,
                    description: monster.description,
                    evolved: monster.evolved,
                    health: monster.health,
                    image: monster.image,
                    attack: monster.attack,
                    defense: monster.defense,
                    permanent: monster.permanent,
                    created_at: monster.created_at,
                    updated_at: monster.updated_at
                };
                
                // Assign to individual state variables based on index
                switch(index) {
                    case 0:
                        setMonster1(monsterCopy);
                        break;
                    case 1:
                        setMonster2(monsterCopy);
                        break;
                    case 2:
                        setMonster3(monsterCopy);
                        break;
                    default:
                        break;
                }
            });
        }
    }, [user]);

    

    const handleOpponentMonster = async () => {
        const oppMon = await dispatch(getOpponentMonster());
        // const userMon = await dispatch(getUsersMonster(chosenMonster))
        setoppMonsterHealth(oppMon.health);
        setuserMonsterHealth(111);
        
        setHealthCheck(false);
        
    };
// TEST comment

    return (
        <div className="BattlePageMainBox">
            {/*Choose a monster to battle with - Show loading if user data isn't ready */}
            {!user ? (
            <div>Loading...</div>

            ) : !chosenMonster ? (
            
            // character selection screen - three clickable boxes of users poke
            <>
                <h2>Choose your character!</h2>
                <ul className="UsersChoiceList">
                    {monster1 && monster1.id && (
                        <li key={monster1.id} className={`UserPoke${monster1.id}`} data-monster-name={monster1.name}>
                            <MonsterImageBattlePage
                                className={`monsterSelection${monster1.id}`}
                                monsterId={monster1.id}
                                userList={true}
                                showStats={false}
                                oppHTML={false}
                                onClick={() => setChosenMonster(monster1.id)}
                            />
                            <p className={`UserPokehealth${monster1.name}`}>Health: {monster1.health}</p>
                            <p className={`UserPokeAtt${monster1.name}`}>Attack: {monster1.attack}</p>
                            <p className={`UserPokeDff${monster1.name}`}>Defense: {monster1.defense}</p>
                        </li>
                    )}
                    {monster2 && monster2.id && (
                        <li key={monster2.id} className={`UserPoke${monster2.id}`} data-monster-name={monster2.name}>
                            <MonsterImageBattlePage
                                className={`monsterSelection${monster2.id}`}
                                monsterId={monster2.id}
                                userList={true}
                                showStats={false}
                                oppHTML={false}
                                onClick={() => setChosenMonster(monster2.id)}
                            />
                            <p className={`UserPokehealth${monster2.name}`}>Health: {monster2.health}</p>
                            <p className={`UserPokeAtt${monster2.name}`}>Attack: {monster2.attack}</p>
                            <p className={`UserPokeDff${monster2.name}`}>Defense: {monster2.defense}</p>
                        </li>
                    )}
                    {monster3 && monster3.id && (
                        <li key={monster3.id} className={`UserPoke${monster3.id}`} data-monster-name={monster3.name}>
                            <MonsterImageBattlePage
                                className={`monsterSelection${monster3.id}`}
                                monsterId={monster3.id}
                                userList={true}
                                showStats={false}
                                oppHTML={false}
                                onClick={() => setChosenMonster(monster3.id)}
                            />
                            <p className={`UserPokehealth${monster3.name}`}>Health: {monster3.health}</p>
                            <p className={`UserPokeAtt${monster3.name}`}>Attack: {monster3.attack}</p>
                            <p className={`UserPokeDff${monster3.name}`}>Defense: {monster3.defense}</p>
                        </li>
                    )}
                </ul>
            </>
            ) : ( //or condition - once you click on a monster this activates

            <>
                <BattlePageStage2 
                    chosenMonster={chosenMonster}
                    user={user}
                    monster1={monster1}
                    monster2={monster2}
                    monster3={monster3}
                    setChosenMonster={setChosenMonster}
                />
            </>           
            )}
        </div>
    )
}


// ! old code to be salvaged or scrapped later!!!
// // Monster is chosen, battling can begin - appears after clicking image of monster you want initially
//             <div className="FightingMonsters">
//                 <div className="UsersMon">
//                     <BattlePageStage2 />
//                     {/* <MonsterImageBattlePage 
//                         opponentMonster={opponentMonster}
//                         monsterId={chosenMonster} 
//                         healthCheck={healthCheck}
//                         setHealthCheck={setHealthCheck}
//                         userMonsterHealth={userMonsterHealth} 
//                         setuserMonsterHealth={setuserMonsterHealth}
//                         oppMonsterHealth={oppMonsterHealth}                       
//                         setoppMonsterHealth={setoppMonsterHealth}
//                         className={`UsermonsterBattling${chosenMonster}`}
//                         showStats={true}                      
//                         userList={false}
//                         oppHTML={false}
//                     /> */}
//                 </div>
//                 <ul className="ChangeMonsterList">
//                     {user.ai_monsters.filter((poke) => poke.id !== chosenMonster).map((poke) => (
//                         <li key={poke.id} className={`StandbyPoke${poke.id}`}>
//                             <MonsterImageBattlePage
//                                 className={`StandbyPokeImage${poke.id}`}
//                                 monsterId={poke.id}
//                                 userList={true}
//                                 showStats={false}
//                                 oppHTML={false}
//                                 onClick={() => {if (!healthCheck) setChosenMonster(poke.id), setuserMonsterHealth(poke.health), setoppMonsterHealth(opponentMonster.health)}}
//                             />
//                         </li>
//                     ))}
//                 </ul>
//                 <div className="BattleButton">
//                     <button
//                         className="BattleButton"
//                         disabled={!healthCheck && opponentMonster}
//                         style={{
//                             backgroundColor: (!healthCheck && opponentMonster) ? '#ccc' : '#4CAF50',
//                             color: (!healthCheck && opponentMonster) ? '#888' : '#fff',
//                             cursor: (!healthCheck && opponentMonster) ? 'not-allowed' : 'pointer'
//                         }}
//                         onClick={() => handleOpponentMonster()}
//                         >
//                         {!healthCheck ? "Generate Battle!" : "Click for a new battle!"}
//                     </button>
//                 </div>
//                 {opponentMonster && (<div className="opponentsMon">
//                     {/* <MonsterImageBattlePage 
//                         opponentMonster={opponentMonster}
//                         // oppMonsterHealth={oppMonsterHealth} 
//                         // userMonsterHealth={userMonsterHealth}
//                         // setuserMonsterHealth={setuserMonsterHealth}
//                         monsterId={chosenMonster} 
//                         className={`OpponentmonsterBattling${opponentMonster.name}`}
//                         showStats={true}
//                         oppHTML={true}
//                         userList={false}
//                     /> */}
//                 </div>)}
//             </div>