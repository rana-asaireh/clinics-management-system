import { ApprovalStatus } from '../enum/appointment-status.enum';
import { AppointmentDetails } from './appointmnt-details.model';

// export interface Appointment {
//   id: string;
//   date: Date;
//   time: string;
//   patient_id: string;
//   patient_name: string;
//   doctor_name: string;
//   doctor_id: string;
//   clinic_name: string;
//   payment: string;
//   email: string;
//   phone_number: string;
//   drugs: string;
//   diagnosis: string;
//   approval_status: AppointmentStatus;
// }
export interface Appointment {
  id?: string;
  date: Date;
  doctor_id: string;
  patient_id: string;
  approval_status: ApprovalStatus;
  appointment_details?: AppointmentDetails;
}
