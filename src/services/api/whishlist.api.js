export async function getWhishlist(take) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/whishlist?take=${take}`, {
            cache: "no-store",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await res.json();
        return data;
    }
    catch (err) {
        return err;
    }
}
