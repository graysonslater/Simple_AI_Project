import { useSelector } from "react-redux";
import AddFavoritePokeModal from "../Modals/AddFavoritePokeModal/AddFavoritePokeModal";
import EditUserModal from "../Modals/EditUserModal/EditUserModal";
import DeleteUserModal from "../Modals/DeleteUserModal/DeleteUserModal";
import MonsterImage from "../AiAssistant/MonsterImage";
import DeleteAIMonster from "../Modals/DeleteAiMonsterModal/DeleteAiMonsterModal";
import "./ProfilePage.css"

export default function ProfilePage(){

    //"user" contains all events and reservations for the current user
    const user  = useSelector((state) => 
        {return state.session.user} 
    );

    return(
        <div className="ProfilePageBox">
            <h2>Profile Information</h2>
            <div className="ProfileUserInfo">
                <div className="user-details">
                    <p>Username: {user ? (user.username) : "Loading..."}</p>
                    <p>Email: {user ? (user.email) : "Loading..." }</p>
                    <div className="user-actions">
                        <EditUserModal user={user}/>
                        <DeleteUserModal user={user}/>
                    </div>
                </div>
                
                <div className="pokemon-section">
                    <h2>Favorited Pokemon</h2>
                    <ul className="UsersPokeList">
                        {user ? (user.user_pokemon.sort((a, b) => a.pokemon.id - b.pokemon.id).map((poke) => (
                            <li key={poke.id} className="pokemon-item">
                                <h3>{poke.pokemon.name}</h3>
                                <AddFavoritePokeModal pokeId={poke.pokemon.id}/>
                                <img src={poke.pokemon.image} alt={poke.pokemon.name} className="ProfilePokePhoto"></img>
                            </li>
                        ))
                    ) : <div className="loading-state">Loading...</div>}
                    </ul>
                </div>
                
                <div className="ai-monsters-section">
                    <h2>Your AI Monsters</h2>
                    <ul className="UsersAIList">
                        {user ? (user.ai_monsters.map((poke) => (
                            <li key={poke.id} className="ai-monster-item">
                                <h3>{poke.name}</h3>
                                <div className="monster-stats">
                                    <p>Health: {poke.health}</p>
                                    <p>Attack: {poke.attack}</p>
                                    <p>Defense: {poke.defense}</p>
                                </div>
                                <div className="monster-actions">
                                    <DeleteAIMonster monsterId={poke.id} userId={user.id}/>
                                    <MonsterImage monsterId={poke.id} />
                                </div>
                            </li>
                        ))) : <div className="loading-state">Loading...</div>}
                    </ul>
                </div>
            </div>
        </div>
    )
}