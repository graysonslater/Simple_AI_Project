import { useParams, useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import AddFavoritePokeModal from "../Modals/AddFavoritePokeModal/AddFavoritePokeModal";
import "./PokePage.css"


export default function PokePage(){
    const [loading, setLoading] = useState(false);
    const [currentPoke, setCurrentPoke] = useState();
    const [error, setError] = useState(null);
    const {pokeId} = useParams();
    const user = useSelector((state) => state.session.user);
    const navigate = useNavigate();

    useEffect(() => {
        // make  handler event inside the useEffect
        const fetchPokemon = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/api/pokemon/${pokeId}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                
                if (!response.ok) {
                    throw new Error(
                        `Server error: ${response.status} ${response.statusText}`
                    );
                }

                const data = await response.json();

                await setCurrentPoke(data);
                
            } catch (err) {
                setError(err.message || "Request failed, please try again later.");
            } finally {
                setLoading(false);
            }
        };

        //call the handler function after assigning it
        fetchPokemon();

        // sets off useEffect with each new page
    }, [pokeId]);
    
    return(
        <div className="poke-profile-container">
            <div className="poke-header">
                <h1 className="poke-title">{currentPoke ? currentPoke.name.toUpperCase() : 'POKEMON'}</h1>
            </div>
            <div className="poke-separator"></div>
            
            {loading ? (
                <div className="poke-content">
                    <p>Loading...</p>
                </div>
            ) : error ? (
                <div className="poke-content">
                    <p>Error: {error}</p>
                </div>
            ) : currentPoke ? (
                <div className="poke-content">
                    <button 
                        className="back-button" 
                        onClick={() => navigate('/pokemon')}
                    >
                        Pokemon Grid
                    </button>
                    
                    <div className="poke-stats">
                        <div className="stat-item">
                            <div className="stat-marker"></div>
                            <span className="stat-label">Type:</span>
                            <span className="stat-value">{currentPoke.type_of}</span>
                        </div>
                        <div className="stat-item">
                            <div className="stat-marker"></div>
                            <span className="stat-label">Evolved:</span>
                            <span className="stat-value">{currentPoke.evolved ? 'Yes' : 'No'}</span>
                        </div>
                        <div className="stat-item">
                            <div className="stat-marker"></div>
                            <span className="stat-label">Description:</span>
                            <span className="stat-value">{currentPoke.description}</span>
                        </div>
                    </div>
                    
                    <div className="poke-image-container">
                        <img src={currentPoke.image} alt={currentPoke.name} className="poke-image"></img>
                    </div>
                    
                    <div className="poke-actions">
                        {user && <AddFavoritePokeModal pokeId={currentPoke.id}/>}
                    </div>
                </div>
            ) : (
                <div className="poke-content">
                    <p>No Pokémon found.</p>
                </div>
            )}
        </div>
    )
}