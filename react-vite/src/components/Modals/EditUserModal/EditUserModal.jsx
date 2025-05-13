import { useState } from "react";
import { useDispatch } from "react-redux";
import CustomModal from "../../../context/CustomModal";
import { userNameCheck, emailCheck, editUser } from "../../../redux/session";
import "./EditUserModal.css"

export default function EditUserModal({ user }) {
  const dispatch = useDispatch();
  const [showEditUser, setShowEditUser] = useState(false);
  const [username, setUsername] = useState(""); 
  const [email, setEmail] = useState(""); 
  const [errors, setErrors] = useState({}); 

  const handleUserEdit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    setErrors({});
    let validationErrors = {};

    // Add null/undefined checks
    if (!username || username.length < 1) {
      validationErrors.username = "Username must be at least 1 character";
    }

    // Check username
    const userNameTaken = await dispatch(userNameCheck(username));
    if (
      userNameTaken.exists &&
      userNameTaken.exists.username !== user.username // Use !==, not !=
    ) {
      validationErrors.username = `${username} is already taken!`;
    }

    // Check email
    const emailTaken = await dispatch(emailCheck(email));
    if (emailTaken.exists && emailTaken.exists.email !== user.email) {
      validationErrors.email = `${email} is already taken!`;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    dispatch(
      editUser({
        userId: user.id,
        username: username,
        email: email,
      })
    );
    setShowEditUser(false);
  };

  const editUserToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowEditUser(!showEditUser);
    // Always reset to current user data when opening
    setUsername(user.username);
    setEmail(user.email);
  };

  return (
    <div className="EditModalMainBox">
      <button
        className="ProfileEditUserButton"
        type="button"
        onClick={editUserToggle}
      >
        Edit Profile
      </button>
      {showEditUser && (
        <CustomModal onClose={editUserToggle}>
          <div className="ProfileUserEditTitle">Edit Profile Information</div>
          <div className="ProfileUserEditButtons">
            <label className="editCurrentUser">
              Username:
              <input
                type="text"
                value={username || ""}
                onChange={(e) => setUsername(e.target.value)}
              />
              {errors.username && (
                <span className="profileErrors">{errors.username}</span>
              )}
            </label>
            <label className="editCurrentUser">
              Email:
              <input
                type="email"
                value={email || ""}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <span className="profileErrors">{errors.email}</span>
              )}
            </label>
            <button type="button" onClick={handleUserEdit}>
              Confirm
            </button>
            <button type="button" onClick={editUserToggle}>
              Cancel
            </button>
          </div>
        </CustomModal>
      )}
    </div>
  );
}
