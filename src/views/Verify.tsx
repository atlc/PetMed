import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GET } from "../services/api";
import LS from "../services/LS";

const Verify = () => {
    const nav = useNavigate();
    const [token, setToken] = useState("");

    useEffect(() => {
        const parsedParams = window.location.href.replace(window.location.origin, "");
        GET(`/auth${parsedParams}`).then((data) => {
            console.log(data);
            setToken(data.token);
            LS.tokens.set(data.token);
            nav("/getting_started/household");
        });
    }, []);

    return <div>{!token && <p>Verifying account...</p>}</div>;
};

export default Verify;
