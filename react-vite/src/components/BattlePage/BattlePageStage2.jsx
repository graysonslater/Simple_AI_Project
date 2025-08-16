import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserMonster, getOpponentMonster } from "../../redux/AImonsters";

export default function BattlePageStage2({
        chosenMonster,
        user,
        monster1,
        monster2,
        monster3,
        setChosenMonster
    }) {
    const dispatch = useDispatch();
    const { opponentMonster } = useSelector((state) => ({
        opponentMonster: state.aiMonsters.opponentMonster
    }));

    // State for tracking health during battle - track health for each monster separately
    const [monsterHealths, setMonsterHealths] = useState({});
    const [opponentMonsterHealth, setOpponentMonsterHealth] = useState(null);
    const [battleStarted, setBattleStarted] = useState(false);

    // Find the chosen monster from the individual monster props
    const getChosenMonster = () => {
        if (monster1 && monster1.id === chosenMonster) return monster1;
        if (monster2 && monster2.id === chosenMonster) return monster2;
        if (monster3 && monster3.id === chosenMonster) return monster3;
        return null;
    };

    // Get other monsters (not the selected one)
    const getOtherMonsters = () => {
        const monsters = [];
        if (monster1 && monster1.id !== chosenMonster) monsters.push(monster1);
        if (monster2 && monster2.id !== chosenMonster) monsters.push(monster2);
        if (monster3 && monster3.id !== chosenMonster) monsters.push(monster3);
        return monsters;
    };

    // Get all monsters
    const getAllMonsters = () => {
        const monsters = [];
        if (monster1) monsters.push(monster1);
        if (monster2) monsters.push(monster2);
        if (monster3) monsters.push(monster3);
        return monsters;
    };

    const selectedMonster = getChosenMonster();
    const otherMonsters = getOtherMonsters();
    const allMonsters = getAllMonsters();

    // Get current monster's health
    const getCurrentMonsterHealth = () => {
        if (!selectedMonster) return null;
        return monsterHealths[selectedMonster.id] !== undefined 
            ? monsterHealths[selectedMonster.id] 
            : selectedMonster.health;
    };

    // Check if all monsters are fainted
    const areAllMonstersFainted = () => {
        return allMonsters.every(monster => {
            const health = monsterHealths[monster.id] !== undefined 
                ? monsterHealths[monster.id] 
                : monster.health;
            return health <= 0;
        });
    };

    // Get next available monster
    const getNextAvailableMonster = () => {
        return allMonsters.find(monster => {
            const health = monsterHealths[monster.id] !== undefined 
                ? monsterHealths[monster.id] 
                : monster.health;
            return health > 0;
        });
    };

    // Initialize health when monster is selected or opponent is generated
    useEffect(() => {
        if (selectedMonster && monsterHealths[selectedMonster.id] === undefined) {
            setMonsterHealths(prev => ({
                ...prev,
                [selectedMonster.id]: selectedMonster.health
            }));
        }
        if (opponentMonster && opponentMonsterHealth === null) {
            setOpponentMonsterHealth(opponentMonster.health);
        }
    }, [selectedMonster, opponentMonster, monsterHealths, opponentMonsterHealth]);

    // Auto-select next monster when current one faints
    useEffect(() => {
        if (battleStarted && selectedMonster) {
            const currentHealth = getCurrentMonsterHealth();
            if (currentHealth <= 0) {
                const nextMonster = getNextAvailableMonster();
                if (nextMonster) {
                    setChosenMonster(nextMonster.id);
                }
            }
        }
    }, [monsterHealths, battleStarted, selectedMonster]);

    const handleGenerateBattle = async () => {
        try {
            await dispatch(getOpponentMonster());
            setBattleStarted(true);
            // Reset health for all monsters when starting a new battle
            const newHealths = {};
            if (monster1) newHealths[monster1.id] = monster1.health;
            if (monster2) newHealths[monster2.id] = monster2.health;
            if (monster3) newHealths[monster3.id] = monster3.health;
            setMonsterHealths(newHealths);
            setOpponentMonsterHealth(null); // Will be set when opponent is loaded
        } catch (error) {
            console.error("Error generating battle:", error);
        }
    };

    const handleAttack = () => {
        if (!selectedMonster || !opponentMonster || !battleStarted) return;

        const currentHealth = getCurrentMonsterHealth();
        if (currentHealth <= 0) return; // Can't attack if fainted

        // Calculate damage (user attacks opponent)
        const userDamage = selectedMonster.attack;
        const newOpponentHealth = Math.max(0, opponentMonsterHealth - userDamage);
        setOpponentMonsterHealth(newOpponentHealth);

        // Opponent counter-attacks (if still alive)
        if (newOpponentHealth > 0) {
            const opponentDamage = opponentMonster.attack;
            const newUserHealth = Math.max(0, currentHealth - opponentDamage);
            setMonsterHealths(prev => ({
                ...prev,
                [selectedMonster.id]: newUserHealth
            }));
        }
    };

    const handleMonsterSwitch = (monsterId) => {
        const monster = allMonsters.find(m => m.id === monsterId);
        if (monster) {
            const health = monsterHealths[monsterId] !== undefined 
                ? monsterHealths[monsterId] 
                : monster.health;
            if (health > 0) {
                setChosenMonster(monsterId);
            }
        }
    };

    const isBattleOver = () => {
        const currentHealth = getCurrentMonsterHealth();
        return (currentHealth <= 0 || opponentMonsterHealth <= 0);
    };

    const isFainted = (health) => {
        return health <= 0;
    };

    const currentMonsterHealth = getCurrentMonsterHealth();
    const opponentFainted = isFainted(opponentMonsterHealth);
    const allFainted = areAllMonstersFainted();

    return (
        <div className="FightingMonsterDisplay"> 
            <div className="BattleLayout">
                {/* Left Side - User Monster */}
                <div className="LeftSide">
                    {selectedMonster && (
                        <div className="SelectedMonsterContainer" data-monster-name={selectedMonster.name}>
                            {(isFainted(currentMonsterHealth) || allFainted) && (
                                <div style={{ 
                                    textAlign: 'center', 
                                    padding: '10px', 
                                    backgroundColor: '#f8f8f8',
                                    borderBottom: '1px solid #e0e0e0'
                                }}>
                                    {isFainted(currentMonsterHealth) && <span className="FaintedStatus">FAINTED</span>}
                                    {allFainted && <span className="LoseStatus">YOU LOSE</span>}
                                </div>
                            )}
                            <div className="SelectedMonsterStats">
                                <img 
                                    src={`data:image/png;base64,${selectedMonster.image}`}
                                    alt={selectedMonster.name}
                                    className={`SelectedMonsterImage ${isFainted(currentMonsterHealth) ? 'Fainted' : ''}`}
                                />
                                <div className="MonsterStats">
                                    <h3>Stats:</h3>
                                    <p><strong>Health:</strong> {currentMonsterHealth}</p>
                                    <p><strong>Attack:</strong> {selectedMonster.attack}</p>
                                    <p><strong>Defense:</strong> {selectedMonster.defense}</p>
                                    <p><strong>Type:</strong> {selectedMonster.type_of}</p>
                                    <p><strong>Description:</strong> {selectedMonster.description}</p>
                                </div>
                            </div>
                            {battleStarted && !isBattleOver() && !isFainted(currentMonsterHealth) && (
                                <div className="AttackButtonContainer">
                                    <button 
                                        className="AttackButton"
                                        onClick={handleAttack}
                                    >
                                        Attack!
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Other Monsters underneath the selected monster */}
                    {otherMonsters.length > 0 && (
                        <div className="OtherMonstersContainer">
                            <h3>Other Monsters:</h3>
                            <div className="OtherMonstersList">
                                {otherMonsters.map((monster) => {
                                    const monsterHealth = monsterHealths[monster.id] !== undefined 
                                        ? monsterHealths[monster.id] 
                                        : monster.health;
                                    return (
                                        <div 
                                            key={monster.id} 
                                            className={`OtherMonsterItem ${isFainted(monsterHealth) ? 'Fainted' : ''}`}
                                            onClick={() => handleMonsterSwitch(monster.id)}
                                            style={{ cursor: isFainted(monsterHealth) ? 'not-allowed' : 'pointer' }}
                                        >
                                            <img 
                                                src={`data:image/png;base64,${monster.image}`}
                                                alt={monster.name}
                                                className={`OtherMonsterImage ${isFainted(monsterHealth) ? 'Fainted' : ''}`}
                                            />
                                            <p className="OtherMonsterName">
                                                {monster.name}
                                                {isFainted(monsterHealth) && <span className="FaintedStatus"> - FAINTED</span>}
                                            </p>
                                            <p className="OtherMonsterHealth">Health: {monsterHealth}</p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* Center - Generate Battle Button */}
                <div className="CenterSection">
                    {(!battleStarted || opponentFainted) && (
                        <div className="BattleButtonContainer">
                            <button 
                                className={`GenerateBattleButton ${!opponentFainted && battleStarted ? 'Disabled' : ''}`}
                                onClick={handleGenerateBattle}
                                disabled={!opponentFainted && battleStarted}
                            >
                                Generate Battle
                            </button>
                        </div>
                    )}
                </div>

                {/* Right Side - Opponent Monster */}
                <div className="RightSide">
                    {opponentMonster && battleStarted && (
                        <div className="OpponentMonsterContainer">
                            <h2>
                                Opponent: {opponentMonster.name}
                                {isFainted(opponentMonsterHealth) && <span className="FaintedStatus"> - FAINTED</span>}
                            </h2>
                            <div className="OpponentMonsterStats">
                                <img 
                                    src={`data:image/png;base64,${opponentMonster.image}`}
                                    alt={opponentMonster.name}
                                    className={`OpponentMonsterImage ${isFainted(opponentMonsterHealth) ? 'Fainted' : ''}`}
                                />
                                <div className="MonsterStats">
                                    <h3>Stats:</h3>
                                    <p><strong>Health:</strong> {opponentMonsterHealth !== null ? opponentMonsterHealth : opponentMonster.health}</p>
                                    <p><strong>Attack:</strong> {opponentMonster.attack}</p>
                                    <p><strong>Defense:</strong> {opponentMonster.defense}</p>
                                    <p><strong>Type:</strong> {opponentMonster.type_of}</p>
                                    <p><strong>Description:</strong> {opponentMonster.description}</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}