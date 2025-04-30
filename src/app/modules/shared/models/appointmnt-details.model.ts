import { Diagnosis } from "./diagnsis.model";
import { Drug } from "./drug.model";

export interface AppointmentDetails {
    drugs: Drug | Drug[],
    diagnosis: Diagnosis | Diagnosis[],

}  