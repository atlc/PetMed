export interface Pet extends CreatablePet {
    id: string;
}

export interface CreatablePet {
    name: string;
    birthdate: string;
    weight: string;
    species: string;
    household_id: string;
    image_url?: string;
}

export interface Medication extends CreatableMedication {
    id: string;
}

export interface CreatableMedication {
    name: string;
    pet_id: string;
    dosage_amount: string;
    dosage_unit: string;
    schedule_quantity: string;
    schedule_unit: string;
    initial_administration_time: string;
    start_date: string | CalendarValue;
    end_date: string | CalendarValue;
    notes: string;
}

export interface DosageUnit {
    id: string;
    name: string;
}

export interface ScheduleUnit {
    id: string;
    name: string;
}

type CalendarValuePiece = Date | null;
export type CalendarValue = CalendarValuePiece | [CalendarValuePiece, CalendarValuePiece];
