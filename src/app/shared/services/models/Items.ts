import { Timestamp } from "firebase/firestore";

export interface Items {
    id: string;
    from: string;
    to: string;
    ar: number;
    selectedPassenger: string;
    outdate: Timestamp;
    returndate: Timestamp,
    departure: string[];
    arrival: string[];
    
}