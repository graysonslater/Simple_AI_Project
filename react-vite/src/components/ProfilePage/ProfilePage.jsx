import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AddFavoritePokeModal from "../Modals/AddFavoritePokeModal/AddFavoritePokeModal";
import EditUserModal from "../Modals/EditUserModal/EditUserModal";
import DeleteUserModal from "../Modals/DeleteUserModal/DeleteUserModal";
import MonsterImage from "../AiAssistant/MonsterImage";
import DeleteAIMonster from "../Modals/DeleteAiMonsterModal/DeleteAiMonsterModal";
import "./Profilepage.css"

export default function ProfilePage(){
    const navigate = useNavigate();

    //"user" contains all events and reservations for the current user
    const user  = useSelector((state) => 
        {return state.session.user} 
    );

    const handlePokemonClick = (pokemonId) => {
        navigate(`/pokemon/${pokemonId}`);
    };

    return(
        <div className="ProfilePageBox">
            <h2>Profile Information</h2>
            <div className="ProfileUserInfo">
                <div className="user-details">
                    <h3>User Details</h3>
                    <div className="user-details-content">
                        <p>Username: {user ? (user.username) : "Loading..."}</p>
                        <p>Email: {user ? (user.email) : "Loading..." }</p>
                        <div className="user-actions">
                            <EditUserModal user={user}/>
                            <DeleteUserModal user={user}/>
                        </div>
                    </div>
                </div>
                
                <div className="pokemon-section">
                    <div className="pokemon-container">
                        <h3>Your Favorites</h3>
                        <div className="pokemon-grid">
                            {user ? (user.user_pokemon.sort((a, b) => a.pokemon.id - b.pokemon.id).map((poke) => (
                                <div key={poke.id} className="pokemon-item">
                                    <div 
                                        className="pokemon-image-container"
                                        onClick={() => handlePokemonClick(poke.pokemon.id)}
                                    >
                                        <img 
                                            src={poke.pokemon.image} 
                                            alt={poke.pokemon.name} 
                                            className="ProfilePokePhoto"
                                        />
                                        <div className="pokemon-name-overlay">
                                            {poke.pokemon.name}
                                        </div>
                                    </div>
                                    <div className="pokemon-actions">
                                        <AddFavoritePokeModal pokeId={poke.pokemon.id}/>
                                    </div>
                                </div>
                            ))
                        ) : <div className="loading-state">Loading...</div>}
                        </div>
                    </div>
                </div>
                
                <div className="ai-monsters-section">
                    <h2>Your AI Monsters</h2>
                    <ul className="UsersAIList">
                        {user ? (user.ai_monsters.map((poke) => (
                            <li key={poke.id} className="ai-monster-item">
                                <h3>{poke.name}</h3>
                                <div className="ai-monster-content">
                                    <div className="monster-stats">
                                        <p>Health: {poke.health}</p>
                                        <p>Attack: {poke.attack}</p>
                                        <p>Defense: {poke.defense}</p>
                                    </div>
                                    <div className="monster-image-container">
                                        <MonsterImage monsterId={poke.id} />
                                    </div>
                                    <div className="monster-actions">
                                        <DeleteAIMonster monsterId={poke.id} userId={user.id}/>
                                    </div>
                                </div>
                            </li>
                        ))) : <div className="loading-state">Loading...</div>}
                    </ul>
                </div>
            </div>
        </div>
    )
}