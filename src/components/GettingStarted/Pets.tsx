import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { POST } from "../../services/api";
import REQUIRED from "../REQUIRED";
import { CreatablePet, Pet } from "../../types";
import LS from "../../services/LS";

const Pets = () => {
    const nav = useNavigate();
    const household = LS.getting_started.household.get();
    const pets = LS.getting_started.pets.get();

    const [newPets, setNewPets] = useState<Pet[]>(pets || []);

    const [form, setForm] = useState<CreatablePet>({
        name: "",
        birthdate: "",
        weight: "",
        species: "",
        household_id: household?.id || "",
        image_url: "",
    });

    const handleAddPet = () => {
        const tempForm = { ...form, weight: Number(form.weight) };
        if (!tempForm.image_url) delete tempForm.image_url;

        POST("/api/pets", tempForm).then(({ id }) => {
            const updatedPets = [...newPets, { ...form, id }];
            LS.getting_started.pets.set(updatedPets);
            setNewPets(updatedPets);
            setForm({
                name: "",
                birthdate: "",
                weight: "",
                species: "",
                household_id: household?.id || "",
                image_url: "",
            });
        });
    };

    const handleFormUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
        const key = e.target.name;
        const value = e.target.value;
        setForm({ ...form, [key]: value });
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const file = files[0];
        if (!file) return;

        POST("/api/upload", file, false).then((data) => {
            if (data.image_url) {
                setForm({ ...form, image_url: data.image_url });
            }
        });
    };

    const handleNext = () => {
        LS.getting_started.stage.set("medications");
        nav(`/getting_started/medications`);
    };

    return (
        <div>
            <h4 className="text-center text-primary mt-3">Pets for household "{household?.name || ""}"</h4>
            {newPets.length > 0 && <h5>Added {newPets.map((p) => p.name).join(", ")}</h5>}
            <label htmlFor="name">
                <REQUIRED />
                Pet's Name:
            </label>
            <input name="name" type="text" value={form["name"]} className="form-control" onChange={handleFormUpdate} />
            <label htmlFor="image_url">Pet's Image:</label>
            <input className="form-control" name="image_url" type="file" onChange={handleImageUpload} />
            <label htmlFor="birthdate">
                <REQUIRED />
                Pet's Birthdate:
            </label>
            <input name="birthdate" type="text" value={form["birthdate"]} className="form-control" onChange={handleFormUpdate} />
            <label htmlFor="weight">
                <REQUIRED />
                Pet's Weight (lbs):
            </label>
            <input name="weight" type="number" value={form["weight"]} className="form-control" onChange={handleFormUpdate} />
            <label htmlFor="species">
                <REQUIRED />
                Pet's Species:
            </label>
            <input name="species" type="text" value={form["species"]} className="form-control" onChange={handleFormUpdate} />
            {form.name && form.birthdate && form.weight && form.species && (
                <button onClick={handleAddPet} className="btn mt-3 btn-primary">
                    Add Pet
                </button>
            )}

            {newPets.length > 0 ? (
                <button onClick={handleNext} className="btn mt-3 btn-primary">
                    Next
                </button>
            ) : (
                <></>
            )}
        </div>
    );
};

export default Pets;
