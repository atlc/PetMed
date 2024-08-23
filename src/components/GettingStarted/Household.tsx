import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { POST } from "../../services/api";
import REQUIRED from "../REQUIRED";
import LS from "../../services/LS";

const Household = () => {
    const nav = useNavigate();
    const household = LS.getting_started.household.get();

    const [form, setForm] = useState({
        nickname: household?.name || "",
    });

    const handleFormUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.name;
        const value = e.target.value;
        setForm({ ...form, [key]: value });
    };

    const handleNext = () => {
        POST("/api/households", { name: form.nickname }).then(({ id }) => {
            LS.getting_started.household.set({ name: form.nickname, id });
            LS.getting_started.stage.set("pets");
            nav(`/getting_started/pets`);
        });
    };

    return (
        <div>
            <label htmlFor="nickname">
                <REQUIRED /> Household Nickname:
            </label>
            <input name="nickname" type="text" className="form-control" value={form["nickname"]} onChange={handleFormUpdate} />
            {form.nickname && (
                <button onClick={handleNext} className="btn mt-3 btn-primary">
                    Next
                </button>
            )}
        </div>
    );
};

export default Household;
