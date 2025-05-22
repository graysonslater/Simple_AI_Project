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