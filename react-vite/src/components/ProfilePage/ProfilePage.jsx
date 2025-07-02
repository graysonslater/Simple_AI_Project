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
                <p>Username: {user ? (user.username) : "Loading..."}</p>
                <>Email: {user ? (user.email) : "Loading..." }</>
                <EditUserModal user={user}/>
                <DeleteUserModal user={user}/>
                <h2>Favorited Pokemon</h2>
                <ul className={`UsersPokeList`}>
                    {user ? (user.user_pokemon.sort((a, b) => a.pokemon.id - b.pokemon.id).map((poke) => (
                        <li key={poke.id} className={`UserPoke${poke.id}`}>
                            <h3 className={`UserPoke${poke.pokemon.name}`}>{poke.pokemon.name}</h3>
                            <AddFavoritePokeModal pokeId={poke.pokemon.id}/>
                            <img src={poke.pokemon.image} alt={poke.pokemon.name} className="ProfilePokePhoto"></img>
                        </li>
                    ))
                ) : "Loading..."}
                </ul>
                <h2>Your AI Monsters</h2>
                <ul className={`UsersAIList`}>
                    {user ? (user.ai_monsters.map((poke) => (
                        <li key={poke.id} className={`UserPoke${poke.id}`}>
                            <h3 className={`UserPoke${poke.name}`}>{poke.name}</h3>
                            <p className={`UserPokeHealth${poke.name}`}>Health: {poke.health}</p>
                            <p className={`UserPokeAtt${poke.name}`}>Attack: {poke.attack}</p>
                            <p className={`UserPokeDff${poke.name}`}>Defense: {poke.defense}</p>
                            <DeleteAIMonster monsterId={poke.id} userId={user.id}/>
                            <MonsterImage monsterId={poke.id} />
                        </li>
                    ))) : "Loading..."}
                </ul>
            </div>
        </div>
    )
}