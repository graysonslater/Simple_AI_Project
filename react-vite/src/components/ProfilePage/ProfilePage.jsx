import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../../redux/session";
import AddFavoritePokeModal from "../Modals/AddFavoritePokeModal/AddFavoritePokeModal";
import EditUserModal from "../Modals/EditUserModal/EditUserModal";
import DeleteUserModal from "../Modals/DeleteUserModal/DeleteUserModal";
import "./ProfilePage.css"


export default function ProfilePage(){
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //"user" contains all events and reservations for the current user
    const user = useSelector((state) => {return state.session.user});

    useEffect(() => {
        if (user){
            dispatch(getUserById(user.id));
        }
    },[dispatch]);

    return(
        <div className="ProfilePageBox">
            <h2>Profile Information</h2>
            <div className="ProfileUserInfo">
                <p>Username: {user ? (user.username) : "Loading..."}</p>
                <>Email: {user ? (user.email) : "Loading..." }</>
                <EditUserModal user={user}/>
                <DeleteUserModal user={user}/>
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

                {/* USER MODALS FUNCTIONALITY TO BE ADDED!!!!!!!*/}
                {/* <button className="ProfileEditUserButton" type="button" onClick={(e) => editUserToggle(e, user)}>Edit</button>
                <button className="EventDeleteUserBut" type="button" onClick={(e) => deleteUserToggle(e, user)}>Delete</button> */}

                {/* USER MODALS FUNCTIONALITY TO BE ADDED!!!!!!!*/}
                {/* <>{EditUserModal()}</>
                <DeleteUserModal /> */}

            </div>
        </div>
    )
}


//!hack unfinished code which i will prolly make into individual components and then import into this file
    //! edit user modal -to be added later
    // const [showEditUser, setShowEditUser] = useState(false);
    // const [username, setUsername] = useState();
    // const [firstname, setFirstname] = useState();
    // const [lastname, setLastname] = useState();
    // const [email, setEmail] = useState();

    //event handler for edit
    // const handleUserEdit =  async (e) => {
    //     e.preventDefault();
    //     e.stopPropagation();

    //     setEditErrors({});
    //     let validationErrors = {};
    //     if (username.length < 1) {
    //         validationErrors.username = "UserName must be at least 1 character";
    //     }
    //     if (firstname.length < 1) {
    //         validationErrors.firstname = "first name must be at least 1 character";
    //     }
    //     if (lastname.length < 1) {
    //         validationErrors.lastname = "last name must be at least 1 character";
    //     }

    //     //check username
    //     const userNameTaken = await dispatch(userNameCheck(username));
    //     if (userNameTaken.exists && userNameTaken.exists.username != user.username) {
    //         validationErrors.username = `${username} is already taken!`;
    //     }

    //     //check email
    //     const emailTaken = await dispatch(emailCheck(email));
    //     if (emailTaken.exists && emailTaken.exists.email != user.email) {
    //         validationErrors.email = `${email} is already taken!`;
    //     }
    //     if (Object.keys(validationErrors).length > 0) {
    //         setEditErrors(validationErrors);
    //         return;
    //     }

    //     dispatch(editUser({
    //         userId: user.id,
    //         username: username,
    //         firstname: firstname,
    //         lastname: lastname,
    //         email: email
    //     }))
    //     setShowEditUser(false);
    // }

    // //toggle for modal
    // const editUserToggle = (e, userToUpdate) => {
    //     e.preventDefault();
	// 	e.stopPropagation();
	// 	if (userToUpdate) {
	// 		setEventToEdit(userToUpdate);
	// 		setUsername(userToUpdate.username)
    //         setFirstname(userToUpdate.firstname)
    //         setLastname(userToUpdate.lastname)
    //         setEmail(userToUpdate.email)
	// 	} else {
	// 		setEventToEdit(null);
			
	// 	}
	// 	setShowEditUser(!showEditUser);
    // };

    // const EditUserModal = () => {
    //     return(
    //         <div className="editUserMain">
    //             {showEditUser && (
    //                 <CustomModal onClose={(e) => editUserToggle(e)}>
    //                     <div className="ProfileUserEditTitle">Edit Profile Information</div>
    //                     <div className="ProfileUserEditButtons">
    //                         <label className="editCurrentUser">
    //                             Username:
    //                             <input
    //                                 type="text"
    //                                 value={username}
    //                                 onChange={(e) => setUsername(e.target.value)}
    //                             />
    //                             {errors.username && (<span className="profileErrors">{errors.username}</span>)}
    //                         </label>
    //                         <label className="editCurrentUser">
    //                             Firstname:
    //                             <input
    //                                 type="text"
    //                                 value={firstname}
    //                                 onChange={(e) => setFirstname(e.target.value)}
    //                             />
    //                             {errors.firstname && (<span className="profileErrors">{errors.firstname}</span>)}
    //                         </label>
    //                         <label className="editCurrentUser">
    //                             Lastname:
    //                             <input
    //                                 type="text"
    //                                 value={lastname}
    //                                 onChange={(e) => setLastname(e.target.value)}
    //                             />
    //                             {errors.lastname && (<span className="profileErrors">{errors.lastname}</span>)}
    //                         </label>
    //                         <label className="editCurrentUser">
    //                             Email:
    //                             <input
    //                                 type="email"
    //                                 value={email}
    //                                 onChange={(e) => setEmail(e.target.value)}
    //                             />
    //                             {errors.email && (<span className="profileErrors">{errors.email}</span>)}
    //                         </label>
    //                         <button
    //                             type="button"
    //                             onClick={(e) => handleUserEdit(e)}
    //                         >
    //                             Confirm
    //                         </button>
    //                         <button type="button" onClick={editUserToggle}>
    //                             cancel
    //                         </button>
    //                     </div>
    //                 </CustomModal>
    //             )}
    //         </div>
    //     )
    // };


    //! set modal state for deleting a USER! - to be added later
	// const [showUserDelete, setShowUserDelete] = useState(false);
	// const [userToDelete, setUserToDelete] = useState(null);
    
	// //send delete to thunk
	// const handleUserDeletion = (e) => {
	// 	e.preventDefault();
	// 	e.stopPropagation();
	// 	dispatch(thunkDeleteUser(user.id));
	// 	navigate("/home");
	// };

	// //toggle for modal
	// const deleteUserToggle = (e, user) => {
	// 	e.preventDefault();
	// 	e.stopPropagation();
        
    //     if (user) {
	// 		setUserToDelete(user);
	// 	} else {
	// 		setUserToDelete(null);
	// 	}
	// 	setShowUserDelete(!showUserDelete);
	// };

    // const DeleteUserModal = () => {
    //     return(
    //         <div className="DeleteUserMain">
	// 			{showUserDelete && (
	// 				<CustomModal onClose={deleteUserToggle}>
	// 					<div className="deleteMessage">
	// 						Delete your profile?
	// 					</div>
	// 					<div className="deleteButtons">
	// 						<button
	// 							type="button"
	// 							onClick={(e) => handleUserDeletion(e, userToDelete.id)}
	// 						>
	// 							Confirm
	// 						</button>
	// 						<button type="button" onClick={(e) => deleteUserToggle(e)}>
	// 							Cancel
	// 						</button>
	// 					</div>
	// 				</CustomModal>
	// 			)}
	// 		</div>
    //     )
    // };
