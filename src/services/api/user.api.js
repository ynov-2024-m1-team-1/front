const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmM1NTJlNzE5ZTYwZTQ0Mjc3ZTI0MyIsImFkbWluIjp0cnVlLCJpYXQiOjE3MTI5MTYwNTYsImV4cCI6MTc0NDQ1MjA1Nn0.dfDN0S_-htGFENo2FhJD3Cj9CKuubl2GYsm_Me5sYDc`

export async function getUsers(setUsers) {

    //localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1ZmM1NTJlNzE5ZTYwZTQ0Mjc3ZTI0MyIsImFkbWluIjp0cnVlLCJpYXQiOjE3MTEwMzU3MzgsImV4cCI6MTc0MjU3MTczOH0.tkyV116rstBp91zgR9iFzDRP0eDnQNc5TETAoFSXwok")
    try {
       // const token = localStorage.getItem("token")


        if(!token) throw Error("Not connected")

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users`, {
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
        });
        const data = await res.json();
        setUsers(data)
        return data;
    } catch (err) {
        return err;
    }
}

export async function getUser(id) {
    try {
        if(!token) throw Error("Not connected")
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/${id}`, {
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,

            },
        });
        const data = await res.json();

        return data;
    } catch (err) {
        return err;
    }
}

export async function getMe(token) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/self/me`, {
            cache: "no-store",
            headers: {
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            console.error("Error fetching user data");
        }

        const data = await res.json();
        return data;
    } catch (err) {
        return err;
    }
}


export async function deleteUser(userId) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users/${userId}`, {
            method: "DELETE",
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (res.ok) {
            return { success: true };
        } else {
            const errorData = await res.json();
            throw new Error(errorData.message);
        }
    } catch (err) {
        return { success: false, error: err.message };
    }
}
