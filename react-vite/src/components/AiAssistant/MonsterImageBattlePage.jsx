import { useEffect, useState } from "react";

export default function MonsterImageBattlePage({ monsterId, onClick, showStats  }) {
        // used to assign image to var
        const [imgSrc, setImgSrc] = useState(null);
        const [attack, setAttack] = useState("")
        const [defense, setDefense] = useState("")
        const [name, setName] = useState("")

        //used to make an async fetch request
        useEffect(() => {
            //async func to get image
            async function fetchImage() {
            try {
                const res = await fetch(`/api/images/ai_monster_image/${monsterId}`,{
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                // convert the data
                const data = await res.json();
                console.log("FRONT MIBP DATA= ", data)
                if (data.error) {
                    setImgSrc(null);
                } else {
                    setImgSrc(`data:image/png;base64,${data.image}`);
                    setAttack(data.attack);
                    setDefense(data.defense);
                    setName(data.name);
                }
            } catch (err) {
                setImgSrc(null);
            }
        }
        fetchImage();
    }, [monsterId]);

    if (!imgSrc) return <div>Loading...</div>;
    return (
        <> 
            <img src={imgSrc} alt={`Monster ${monsterId}`} onClick={onClick} style={{ cursor: 'pointer' }}/>
            {showStats && (<>
                <h3 className={`UserPoke${name}`}>{name}</h3>
                <p className={`UserPokeAtt${name}`}>Attack: {attack}</p>
                <p className={`UserPokeDff${name}`}>Defense: {defense}</p>
            </>)}
        </>
    );
}