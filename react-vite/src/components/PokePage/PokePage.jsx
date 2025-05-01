import { useParams } from "react-router-dom/dist/umd/react-router-dom.development";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

export default function PokePage(){
    const [loading, setLoading] = useState(false);
    const [currentPoke, setCurrentPoke] = useState();
    const {pokeId} = useParams();
    console.log("FRONT URL ID= ", pokeId)

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
                console.log("FRONT RESPONSE DATA= ", data);

                
                await setCurrentPoke(data);
                
            } catch (err) {
                setError(err.message || "Request failed, please try again later.");
            } finally {
                setLoading(false);
            }
        };

        //call the handler function after assigning it
        fetchPokemon();
        console.log("FRONT currentPoke= ", currentPoke)
        // sets off useEffect with each new page
    }, [pokeId]);
    
    return(
        <div className="PokeMainBox">
            {loading ? (
                <p>Loading...</p>
            ) : currentPoke ? (
                <>
                    <h1 className="PokeName">{currentPoke.name}</h1>
                    <h3 className="Poketype">{currentPoke.type_of}</h3>
                    <img src={currentPoke.image} alt={currentPoke.name} className="PokePhoto"></img>
                    <p className="PokeDescription">{currentPoke.description}</p>
                </>
            ) : (
                <p>No Pokémon found.</p>
            )}
        </div>
    )
}