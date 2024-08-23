import React, { useEffect, useState } from "react";
import Household from "../components/GettingStarted/Household";
import { useParams } from "react-router-dom";
import Medications from "../components/GettingStarted/Medications";
import Pets from "../components/GettingStarted/Pets";
import LS from "../services/LS";

type ValidSteps = "household" | "pets" | "medications" | "schedules";

const GettingStarted = () => {
    let { stage } = useParams() as { stage: ValidSteps | string };
    if (!stage) stage = "household";
    const saved_stage = LS.getting_started.stage.get();

    if (saved_stage) stage = saved_stage;

    const getStage = () => {
        if (stage === "household") {
            return <Household />;
        } else if (stage === "medications") {
            return <Medications />;
        } else if (stage === "pets") {
            return <Pets />;
        } else {
            return <p>Unrecognized step "{stage}"</p>;
        }
    };

    return (
        <div className="row mt-5 justify-content-center">
            <div className="col-12 col-md-9 col-lg-7">
                <div className="card shadow">
                    <div className="card-title">
                        <h3 className="text-center bg-primary text-white p-2">Getting Started - setup your {stage}</h3>
                    </div>
                    <div className="card-body">{getStage()}</div>
                </div>
            </div>
        </div>
    );
};

export default GettingStarted;
