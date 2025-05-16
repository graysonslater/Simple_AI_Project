import { useEffect, useState } from "react";

export default function MonsterImage({ monsterId }) {
        // used to assign image to var
        const [imgSrc, setImgSrc] = useState(null);

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

                if (data.error) {
                    setImgSrc(null);
                } else {
                    setImgSrc(`data:image/png;base64,${data.image}`);
                }
            } catch (err) {
                setImgSrc(null);
            }
        }
        fetchImage();
    }, [monsterId]);

    if (!imgSrc) return <div>Loading...</div>;
    return <img src={imgSrc} alt={`Monster ${monsterId}`} />;
}