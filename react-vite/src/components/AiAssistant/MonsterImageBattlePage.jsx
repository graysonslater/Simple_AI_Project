import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function MonsterImageBattlePage({ 
    // Variables passed in from parent component
    monsterId,
    userList, 
    oppHTML,  
    onClick, 
    showStats, 
    //Disable attack button
    healthCheck, 
    setHealthCheck, 
    //Opponent monster info
    opponentMonster, 
    //Opponent monster Health
    oppMonsterHealth, 
    setoppMonsterHealth, 
    //users Monster health
    userMonsterHealth ,
    setuserMonsterHealth    
    }) {


    // used to assign image to var
    const [imgSrc, setImgSrc] = useState(null);
    const [attack, setAttack] = useState();
    const [defense, setDefense] = useState();
    const [name, setName] = useState("");
    const [health, setHealth] = useState();
    
    
    //used to make an async fetch request
    useEffect(() => {
        
        //async func to get image
        async function fetchImage() {
            try {
                const res = await fetch(`/api/images/ai_monster_image/${monsterId}`,{
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                // convert the data
                const data = await res.json();
                if (data.error) {
                    setImgSrc(null);
                } else {
                    setImgSrc(`data:image/png;base64,${data.image}`);
                    setAttack(data.attack);
                    setDefense(data.defense);
                    setName(data.name);
                    setHealth(data.health);
                    console.log("HEALTH TEST= ", Number(health))
                    
                }
            } catch (err) {
                setImgSrc(null);
            }
        }
        fetchImage();
    }, [monsterId]);


    function opponentAttack(){
        console.log("MBP OPP--ATK TEST")
        const defMod = 0.01 * Number(defense);
        const damage = Number(opponentMonster.attack) * defMod;
        const health = Number(userMonsterHealth) - damage;
        console.log("defmod= ", defMod, "damage= ", damage, "Health= ", health)
        if (health <= 0){
            setHealthCheck(true);
            setuserMonsterHealth(`${name} fainted!`);
        }else{
            console.log("USERMON HP BFORE= ", userMonsterHealth)
            setuserMonsterHealth(999);
            console.log("USERMON HP after= ", userMonsterHealth)
        };
    };


    function userAttack(){
        console.log("MBP USERATT TEST")
        const defMod = 0.01 * Number(opponentMonster.defense);
        const damage = Number(attack) * defMod;
        const health = Number(oppMonsterHealth) - damage;
        if (health <= 0){
            setHealthCheck(true);
            setoppMonsterHealth(`${opponentMonster.name} fainted!`);
        }else{
            setoppMonsterHealth(Math.floor(health));
            opponentAttack()
            setuserMonsterHealth(999);
            console.log("MBP USERATT TEST 2")
        };
    };


    if (!imgSrc) return <div>Loading...</div>;
    return (
        <div className="FightingMonsterDisplay"> 
            {!oppHTML ? (<div className={userList ? "usersMonster" : "userchosenMonBox"}>
                <img src={imgSrc} alt={`Monster ${monsterId}`} onClick={onClick} style={{ cursor: 'pointer' }}/>
                {showStats && (<>
                    <h3 className={`UserPoke${name}`}>{name}</h3>
                    <p className={`UserPokeAtt${name}`}>Att: {attack}</p>
                    <p className={`UserPokeDff${name}`}>Def: {defense}</p>
                    <p className="UserPokehealth">Health: {health}</p>
                    {opponentMonster && (<button className="UserAttackButton" disabled={healthCheck} onClick={() => userAttack()}>Attack!</button>)}
                </>)}
            </div>
            
            ) : (

            <div className="oppHTML">        
                <div className="OpponentMonster">
                    <h3 className="OppMonster">{opponentMonster.name}</h3>
                    <img src={`data:image/png;base64,${opponentMonster.image}`} alt={`${opponentMonster.name}`} style={{ cursor: 'pointer' }} />
                    <p className="OppMonsterAtt">Att: {opponentMonster.attack}</p>
                    <p className="OppMonsterDff">Def: {opponentMonster.defense}</p>
                    <p className="oppPokehealth">Health: {oppMonsterHealth}</p>
                </div>             
            </div>)}
        </div>
    );
}