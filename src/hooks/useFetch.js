import { useState } from "react";

const useFetch = ({ url, method, body, token }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [typeofError, setTypeofError] = useState(null);

    const fetchData = async () => {
        setLoading(true);

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_ENDPOINT}${url}`,
                {
                    method: method,
                    headers: {
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Methods":
                            "OPTIONS,POST,GET,PATCH",
                        ...(token && { authorization: token }),
                    },
                    ...(body && { body: JSON.stringify(body) }),
                }
            );
            const dataJson = await response.json();

            if (!response.ok || !dataJson) {
                setTypeofError(dataJson.type);
                throw new Error(dataJson.message);
            }
            setData(dataJson);
            setTypeofError(dataJson.type);
        } catch (error) {
            setError(error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    };

    return { fetchData, data, error, loading, typeofError };
};

export default useFetch;
