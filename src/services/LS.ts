import { get } from "http";
import { Medication, Pet } from "../types";

const TOKEN_KEY = "token";
const STAGE_KEY = "stage";
const HOUSEHOLD_KEY = "household";
const PETS_KEY = "pets";
const MEDICATIONS_KEY = "medications";

export interface PetWithMedications {
    [key: string]: Medication[];
}

const tokens = {
    get: () => {
        return localStorage.getItem(TOKEN_KEY);
    },
    set: (token: string) => {
        localStorage.setItem(TOKEN_KEY, token);
    },
};

const getting_started = {
    stage: {
        get: () => {
            const stage = localStorage.getItem(STAGE_KEY);
            return stage;
        },
        set: (stage: string) => {
            localStorage.setItem(STAGE_KEY, stage);
        },
    },
    household: {
        set: (household: { id: string; name: string }) => {
            localStorage.setItem(HOUSEHOLD_KEY, JSON.stringify(household));
        },
        get: () => {
            const household = localStorage.getItem(HOUSEHOLD_KEY);

            if (!household) return null;

            return JSON.parse(household) as { id: string; name: string };
        },
    },
    medications: {
        update: (pet_id: string, pet_with_medications: Medication[]) => {
            const saved = JSON.parse(localStorage.getItem(MEDICATIONS_KEY) || JSON.stringify({})) as { [key: string]: Medication[] };
            saved[pet_id] = pet_with_medications;
            localStorage.setItem(MEDICATIONS_KEY, JSON.stringify(saved));
        },
        get: () => {
            const pet_with_medications = localStorage.getItem(MEDICATIONS_KEY);

            if (!pet_with_medications) return null;

            return JSON.parse(pet_with_medications) as { [key: string]: Medication[] };
        },
    },
    pets: {
        set: (pets: Pet[]) => {
            localStorage.setItem(PETS_KEY, JSON.stringify(pets));
        },
        get: () => {
            const pets = localStorage.getItem(PETS_KEY);

            if (!pets) return null;

            return JSON.parse(pets) as Pet[];
        },
    },
};

export default {
    getting_started,
    tokens,
};
