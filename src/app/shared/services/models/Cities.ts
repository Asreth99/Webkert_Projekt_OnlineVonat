import { Timestamp } from "firebase/firestore";


export interface Cities {
    id: string;
    from: string;
    to: string;
    ar: number;
    schedule: {
        departure: string[];
        arrival: string[];
    }
}