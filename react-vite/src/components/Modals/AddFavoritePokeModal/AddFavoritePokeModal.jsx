import { useDispatch, useSelector } from "react-redux";
import { addFavoriteThunk, removeFavoriteThunk} from "../../../redux/session";
import "./AddFavoritePokeModal.css";


// props must be passed in as an object!!!
export default function AddFavoritePokeModal({pokeId}) {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user);
    

    // Check if the Pokémon is already favorited
    const isFavorited = user?.user_pokemon?.some(poke => poke.poke_id === pokeId);

    const handleFavorite = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(addFavoriteThunk(pokeId))
    };

    const handleRemove = (e) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(removeFavoriteThunk(pokeId))
    };

    return (
        <div className="AddFavoritePokeMain">
            {!isFavorited && user ? (
                <button 
                    className="PokeFavoriteButton" 
                    type="button" 
                    onClick={handleFavorite}
                >
                    Favorite
                </button>
            ) :  (
                <button 
                    className="PokeRemoveFavButton" 
                    type="button" 
                    onClick={handleRemove}
                >
                    Remove
                </button>
            )}
        </div>
    );
}