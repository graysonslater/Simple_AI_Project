// deletes AI gnerated monster
export const deleteAiMonster = (monster_id) => async () => {
    const response = await fetch(`/api/images/delete_ai_monster/${monster_id}`, {
        method: "DELETE",
        headers: { "Context-Type": "application/json" },
    });

  if (response.ok) {
    return { message: "Deletion succesful" }
  } else {
    return { server: "Something went wrong. Please try again" }
  }
}


//set the users pokemon for the battle
const SET_USER_MONSTER = 'aiMonster/setUsersMonster';
export const setUserMonster = (monster) => ({
  type: SET_USER_MONSTER,
  payload: monster
});
export const getUsersMonster = (monster_id) => async (dispatch) => {
  
  const request = await fetch(`/api/battle/battle_page/users_monster/${monster_id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  const response = await request.json();
  dispatch(setUserMonster(response));
  console.log("AImonsters RESPONSE= ", response)
  return response;
}


// Set the monster a user will battle against
const SET_OPPONENT_MONSTER = 'aiMonster/setOpponentMonster';
export const setOpponentMonster = (monster) => ({
  type: SET_OPPONENT_MONSTER,
  payload: monster
});
export const getOpponentMonster = () => async (dispatch) => {
  const request = await fetch(`/api/battle/battle_page/opponent_monster`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
  });
  const response = await request.json();
  dispatch(setOpponentMonster(response));

  return response;
}


//Reset opponent monster
const RESET_OPPONENT_MONSTER = 'aiMonster/resetUsersMonster';
export const resetOppMonster = () => ({
  type: RESET_OPPONENT_MONSTER,
  payload: null
});
export const resetOpponentMonster = () => async (dispatch) => {
  dispatch(resetOppMonster());
  return "Opponents monster reset"
}


const initialState = { usersMonster: null, opponentMonster: null};
export default function AImonsterReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_MONSTER:
      return { ...state, usersMonster: action.payload };
    case SET_OPPONENT_MONSTER:
      return { ...state, opponentMonster: action.payload };
    case RESET_OPPONENT_MONSTER:
      return { ...state, opponentMonster: action.payload };
    default:
      return state;
  }
}