import React, { useState } from "react";
import REQUIRED from "../components/REQUIRED";
import { POST } from "../services/api";
import LS from "../services/LS";
import alerts from "../services/alerts";

const Login = () => {
    const [is_login, setIsLogin] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image_url, setImageUrl] = useState("");

    const handleLogin = () => {
        const destination = is_login ? "/auth/login" : "/auth/register";
        const data = { email, password } as { email: string; password: string; name?: string; image_url?: string };

        if (!is_login) {
            data.name = name;
            if (image_url) {
                data.image_url = image_url;
            }
        }

        POST(destination, data).then((data) => {
            alerts.success(data.message);
            LS.tokens.set(data.token);
        });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const file = files[0];
        if (!file) return;

        POST("/api/upload", file, false).then((data) => {
            if (data.image_url) {
                setImageUrl(data.image_url);
            }
        });
    };

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-12 col-md-7">
                <div className="card shadow-lg p-3">
                    <h3 className="text-center">
                        {is_login ? "Logging in" : "Registering"}.{" "}
                        <span onClick={() => setIsLogin(!is_login)} className="btn btn-primary">
                            Need to {is_login ? "register" : "log in"}?
                        </span>
                    </h3>
                    {!is_login && (
                        <>
                            <label className="mt-3" htmlFor="name">
                                <REQUIRED />
                                Name:
                            </label>
                            <input className="form-control" name="name" type="name" value={name} onChange={(e) => setName(e.target.value)} />
                            <label className="mt-3" htmlFor="image_url">
                                Profile Image:
                            </label>
                            <input className="form-control" name="image_url" type="file" onChange={handleImageUpload} />
                            {image_url && <img style={{ maxHeight: "33vh" }} src={image_url} />}
                        </>
                    )}
                    <label className="mt-3" htmlFor="email">
                        <REQUIRED />
                        Email:
                    </label>
                    <input className="form-control" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label className="mt-3" htmlFor="password">
                        <REQUIRED />
                        Password:
                    </label>
                    <input className="form-control" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

                    <button onClick={handleLogin} className="mt-2 btn btn-primary">
                        {is_login ? "Log in!" : "Finish registration"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
