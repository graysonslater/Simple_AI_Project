
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./PokemonGrid.css";

export default function PokemonGrid() {
    const [pokemon, setPokemon] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAllPokemon = async () => {
            try {
                const response = await fetch('/api/pokemon/allPokemon', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Server error: ${response.status} ${response.statusText}`);
                }

                const data = await response.json();
                setPokemon(data);
            } catch (err) {
                setError(err.message || "Failed to fetch Pokemon");
            } finally {
                setLoading(false);
            }
        };

        fetchAllPokemon();
    }, []);

    const handlePokemonClick = (pokeId) => {
        navigate(`/pokemon/${pokeId}`);
    };

    if (loading) {
        return (
            <div className="grid-pokemon-container">
                <div className="grid-loading">Loading Pokemon...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="grid-pokemon-container">
                <div className="grid-error">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="grid-pokemon-container">
            <div className="grid-pokemon-grid">
                {pokemon.map((poke) => (
                    <div 
                        key={poke.id} 
                        className="grid-pokemon-card"
                        onClick={() => handlePokemonClick(poke.id)}
                        title={`${poke.name} - ${poke.type_of}`}
                    >
                        <img 
                            src={poke.image} 
                            alt={poke.name} 
                            className="grid-pokemon-image"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
