//recommendations
export const recommendations = (query) => async () => {

    const request = await fetch(`/api/recommendations/`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
    });

    if (!request.ok){
        return {error:`Server error: ${request.status} ${request.statusText}`};
    }
    const response = await request.json();

    return response;
}
