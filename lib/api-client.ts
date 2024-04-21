export const callAPI = async (endpoint: string) => {
    try {
        const res = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await res.json();
        console.log(data);
    } catch (err) {
        console.log(err);
    }
};

