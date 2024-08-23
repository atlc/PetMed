import React, { useState, useEffect } from "react";
import { GET } from "../../services/api";
import PetMedicationCard from "./PetMedicationCard";
import LS from "../../services/LS";

const Medications = () => {
    const pets = LS.getting_started.pets.get() || [];
    const household = LS.getting_started.household.get() || { id: "" };

    const [dosageUnits, setDosageUnits] = useState<[]>([]);
    const [scheduleUnits, setScheduleUnits] = useState<[]>([]);

    useEffect(() => {
        GET("/api/dosage_units").then(setDosageUnits);
        GET("/api/schedule_units").then(setScheduleUnits);
    }, []);

    return (
        <div className="row mt-5 justify-content-center">
            <div className="col-12">
                {pets.map((pet, i) => (
                    <PetMedicationCard
                        is_first={i === 0}
                        pet={pet}
                        dosage_units={dosageUnits}
                        schedule_units={scheduleUnits}
                        household_id={household.id}
                        key={`pet-${pet.id}-medications`}
                    />
                ))}
                <button className="btn btn-primary">Next</button>
            </div>
        </div>
    );
};

export default Medications;
