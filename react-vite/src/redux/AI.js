//recommendations
export const recommendations = (query) => async () => {
    console.log("STORE AI TEST TEST TEST")
    const request = await fetch(`/api/recommendations/`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
    });
    console.log("STORE RESPONSE= ", request)
    if (!request.ok){
        return {error:`Server error: ${request.status} ${request.statusText}`};
    }
    const response = await request.json();
    console.log("STORE AI= ",response);
    return response;
}
