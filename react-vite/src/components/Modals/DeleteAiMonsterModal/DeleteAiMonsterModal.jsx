import { useDispatch } from "react-redux";
import { useState } from "react";
import { getUserById } from "../../../redux/session";
import { deleteAiMonster } from "../../../redux/AImonsters";
import CustomModal from "../../../context/CustomModal";
import "./DeleteAiMonsterModal.css"


export default function DeleteAIMonster({monsterId, userId}){
    const dispatch = useDispatch();
    const [showDelete, setShowDelete] = useState(false); 

    //send delete attempt to backend
    const handleDelete = async (e) => {
        e.preventDefault();
        e.stopPropagation();

        await dispatch(deleteAiMonster(monsterId));
        await dispatch(getUserById(userId))

        setShowDelete(!showDelete);
    };

    
    //toggle for modal
    const deleteToggle = (e) => { 
        e.preventDefault();
        e.stopPropagation();
        setShowDelete(!showDelete);
    };


    //The html that will appear inside the modal once it pops up
    const DeleteModalHTML = () => { 
        return (
            <div className="deleteButton">
                {showDelete && (
                    <CustomModal onClose={(e) => deleteToggle(e)}>
                        <p>Are you sure you want to delete this monster?</p>
                        <button onClick={handleDelete}>delete</button>
                        <button onClick={deleteToggle}>Cancel</button>
                    </CustomModal>
                )}
            </div>
        );
    };
 

    //html injected into navbar
    return(
        <>  
            <div className="deleteButton">
                    <button 
                        className="deleteToggleButton" 
                        type="button" 
                        onClick={(e) => deleteToggle(e)}
                    >
                        delete
                    </button>
            </div>
            <DeleteModalHTML />
        </>
    )
}