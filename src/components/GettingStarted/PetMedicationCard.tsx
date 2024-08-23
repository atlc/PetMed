import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import REQUIRED from "../REQUIRED";
import { POST } from "../../services/api";
import { CreatableMedication, DosageUnit, ScheduleUnit, Medication, Pet } from "../../types";
import LS from "../../services/LS";

interface PetMedCardProps {
    pet: Pet;
    household_id: string;
    dosage_units: DosageUnit[];
    schedule_units: ScheduleUnit[];
    is_first: boolean;
}

const PetMedicationCard = ({ pet, household_id, dosage_units, schedule_units, is_first }: PetMedCardProps) => {
    let meds: Medication[] = [];

    const preexisting_meds = LS.getting_started.medications.get();
    if (preexisting_meds && preexisting_meds[pet.id]) meds = [...preexisting_meds[pet.id]];

    const [showCard, setShowCard] = useState(is_first);
    const [medications, setMedications] = useState<Medication[]>(meds);
    const [form, setForm] = useState<CreatableMedication>({
        name: "",
        pet_id: pet.id,
        dosage_amount: "",
        dosage_unit: "",
        schedule_quantity: "",
        schedule_unit: "",
        initial_administration_time: "",
        start_date: new Date(),
        end_date: new Date(),
        notes: "",
    });

    const handleAddMedication = () => {
        POST("/api/medications", { ...form, household_id }).then(({ id }) => {
            const updatedMedications = [...medications, { ...form, id }];
            LS.getting_started.medications.update(pet.id, updatedMedications);
            setMedications(updatedMedications);
            setForm({
                name: "",
                pet_id: pet.id,
                dosage_amount: "",
                dosage_unit: "",
                schedule_quantity: "",
                schedule_unit: "",
                initial_administration_time: "",
                start_date: new Date(),
                end_date: new Date(),
                notes: "",
            });
        });
    };

    const handleFormUpdate = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const key = e.target.name;
        const value = e.target.value;
        setForm({ ...form, [key]: value });
    };

    const shouldShowButton = () => {
        const { name, start_date, end_date, dosage_amount, dosage_unit, schedule_quantity, schedule_unit, initial_administration_time } = form;
        return name && start_date && end_date && dosage_amount && dosage_unit && schedule_quantity && schedule_unit && initial_administration_time;
    };

    return (
        <div className="card shadow-lg p-2 my-3">
            <h4 className="text-center bg-primary text-light mt-3 p-2 rounded-3 d-flex justify-content-between" onClick={() => setShowCard(!showCard)}>
                <span>Meds for {pet.name}</span>
                <span>{showCard ? "(collapse)" : "(expand)"}</span>
            </h4>
            {showCard && (
                <>
                    {medications.length > 0 ? <h5>Added {medications.map((med) => med.name).join(", ")}</h5> : <></>}
                    <label htmlFor="name">
                        <REQUIRED />
                        Medication's Name:
                    </label>
                    <input id="name" name="name" type="text" value={form["name"]} className="form-control" onChange={handleFormUpdate} />
                    <span>
                        <REQUIRED />
                        <label htmlFor="dosage_amount">Dosage</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <input
                                    type="text"
                                    id="dosage_amount"
                                    name="dosage_amount"
                                    value={form.dosage_amount}
                                    className="form-control"
                                    onChange={handleFormUpdate}
                                />
                            </div>
                            <div className="input-group-append">
                                <span>
                                    <select className="form-control" value={form.dosage_unit} id="dosage_unit" name="dosage_unit" onChange={handleFormUpdate}>
                                        {dosage_units.map((du) => (
                                            <option className="form-control" key={`dosage-unit-${du.id}`} value={du.id}>
                                                {du.name}
                                            </option>
                                        ))}
                                    </select>
                                </span>
                            </div>
                        </div>
                    </span>

                    <label htmlFor="start_date">
                        <REQUIRED />
                        Medication Start Date
                    </label>
                    <Calendar value={form.start_date} onChange={(start_date) => setForm({ ...form, start_date })} />
                    <label htmlFor="end_date">
                        <REQUIRED />
                        Medication End Date
                    </label>
                    <Calendar value={form.end_date} onChange={(end_date) => setForm({ ...form, end_date })} />

                    <span>
                        <REQUIRED />
                        <label>Medication Frequency:</label>
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <input
                                    type="text"
                                    name="schedule_quantity"
                                    value={form.schedule_quantity}
                                    className="form-control"
                                    onChange={handleFormUpdate}
                                />
                            </div>
                            <div className="input-group-append">
                                <span>
                                    <select
                                        className="form-control"
                                        value={form.schedule_unit}
                                        id="schedule_unit"
                                        name="schedule_unit"
                                        onChange={handleFormUpdate}
                                    >
                                        {schedule_units.map((su) => (
                                            <option className="form-control" key={`schedule-unit-${su.id}`} value={su.id}>
                                                {su.name}
                                            </option>
                                        ))}
                                    </select>
                                </span>
                            </div>
                        </div>
                    </span>

                    <label>
                        <REQUIRED />
                        Initial administration time:
                    </label>
                    <input
                        name="initial_administration_time"
                        value={form.initial_administration_time}
                        onChange={handleFormUpdate}
                        type="time"
                        className="form-control"
                    />

                    <label htmlFor="notes">Misc notes:</label>
                    <textarea className="form-control" value={form.notes} id="notes" name="notes" onChange={handleFormUpdate} />
                    {shouldShowButton() && (
                        <button onClick={handleAddMedication} className="btn btn-primary m-3">
                            Add "{form.name}" for {pet.name}
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default PetMedicationCard;
