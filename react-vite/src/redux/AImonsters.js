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


const SET_USER_MONSTER = 'session/setUsersMonster';
export const setUserMonster = (monster) => ({
  type: SET_USER_MONSTER,
  payload: monster
});
export const getUsersMonster = (monster_id) => async () => {
  const response = await fetch(`/battle/battle_page/users_monster/${monster_id}`, {
      method: "GET",
      headers: { "Context-Type": "application/json" },
  });
  dispatch(setUserMonster(response));

  
  return response;
}


const SET_OPPONENT_MONSTER = 'session/setOpponentMonster';
export const setOpponentMonster = (monster) => ({
  type: SET_USER_MONSTER,
  payload: monster
});
export const getOpponentMonster = () => async () => {
  const response = await fetch(`/battle/battle_page/opponent_monster`, {
      method: "GET",
      headers: { "Context-Type": "application/json" },
  });
  dispatch(setOpponentMonster(response));

  return response;
}


const initialState = { usersMonster: null, opponentMonster: null};
export default function AImonsterReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_MONSTER:
      return { ...state, usersMonster: action.payload };
    case SET_OPPONENT_MONSTER:
      return { ...state, opponentMonster: action.payload };
    default:
      return state;
  }
}