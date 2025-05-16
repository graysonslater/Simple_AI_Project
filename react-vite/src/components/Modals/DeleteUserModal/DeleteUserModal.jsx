import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomModal from "../../../context/CustomModal";
import { thunkDeleteUser } from "../../../redux/session"; 

export default function DeleteUserModal({user}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showUserDelete, setShowUserDelete] = useState(false);


    // send delete to thunk
    const handleUserDeletion = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        await dispatch(thunkDeleteUser(user.id));
        navigate("/");
    };


    // toggle for modal
    const deleteUserToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setShowUserDelete(!showUserDelete);
    };


    return (
        <div className="EditModalMainBox">
        <button
            className="ProfileEditUserButton"
            type="button"
            onClick={deleteUserToggle}
        >
            Delete Profile
        </button>
        {showUserDelete && (
            <CustomModal onClose={deleteUserToggle}>
            <div className="deleteMessage">
                Delete your profile?
            </div>
            <div className="deleteButtons">
                <button
                type="button"
                onClick={handleUserDeletion}
                >
                Confirm
                </button>
                <button type="button" onClick={deleteUserToggle}>
                Cancel
                </button>
            </div>
            </CustomModal>
        )}
        </div>
    );
}
