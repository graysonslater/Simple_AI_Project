import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOpponentMonster, getUsersMonster } from "../../redux/AImonsters";

export default function MonsterImageBattlePage({ usersMonster, opponentMonster  }) {
    console.log("FRONT END MIBP STATE UM= ", usersMonster, "OM= ", opponentMonster)

    return (
        <> 
            {usersMonster && (
                <div className="BattleUsersMonInfo">
                    <img src={usersMonster.image} alt={`${usersMonster.name}`} style={{ cursor: 'pointer' }}/>
                    <h3 className={`UserPoke${usersMonster.name}`}>{usersMonster.name}</h3>
                    <p className={`UserPokeAtt${usersMonster.name}`}>Attack: {usersMonster.attack}</p>
                    <p className={`UserPokeDff${usersMonster.name}`}>Defense: {usersMonster.defense}</p>
                </div>
            )}
        </>
    );
}