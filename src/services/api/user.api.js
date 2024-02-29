export async function getUsers() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/users`, {
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        return data;
    } catch (err) {
        return err;
    }
}

export async function getUser() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/user/${id}`, {
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json({
            userId: token.id,
            isAdmin: token.isAdmin
        });
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
