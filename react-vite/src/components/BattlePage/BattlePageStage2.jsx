import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserMonster } from "../../redux/AImonsters";

export default function BattlePageStage2({chosenMonster}) {


    return (
        <div className="FightingMonsterDisplay"> 
            MonsterId: {chosenMonster}
        </div>
    );
}