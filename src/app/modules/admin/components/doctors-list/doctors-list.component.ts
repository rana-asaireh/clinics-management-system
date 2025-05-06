import { Component } from '@angular/core';
import { DoctorService } from '../../../doctor/services/doctor.service';
import { Doctor } from '../../../shared/models/doctor.model';
import { AdminService } from '../../services/admin.service';
import { Clinic } from '../../../shared/models/clinic.model';
import { ClinicService } from '../../../shared/services/clinic.service';

@Component({
  selector: 'app-doctors-list',
  standalone: false,
  templateUrl: './doctors-list.component.html',
  styleUrl: './doctors-list.component.scss',
})
export class DoctorsListComponent {
  constructor(
    private doctorService: DoctorService,
    private adminService: AdminService,
    private clinicService: ClinicService
  ) {}
  doctors!: Doctor[];
  error!: string;
  success!: string;
  clinics!: Clinic[];
  selectedClinicId!: number;
  filteredDoctors!: Doctor[];

  ngOnInit(): void {
    this.doctorService.getDoctors().subscribe(
      (data: Doctor[]) => {
        this.error = '';
        this.doctors = data;
      },
      (error: any) => {
        this.error = error;
      }
    );
    this.clinicService.getClinics().subscribe(
      (data: Clinic[]) => {
        this.error = '';
        this.clinics = data;
      },
      (error: any) => {
        this.error = error;
      }
    );
    this.filteredDoctors = [...this.doctors];
  }
  filterDoctors(): void {
    if (this.selectedClinicId) {
      this.filteredDoctors = this.doctors.filter(
        (doctor) => doctor.clinic_id === this.selectedClinicId
      );
    } else {
      this.filteredDoctors = [...this.doctors];
    }
  }
  deleteDoctor(id?: string): void {
    if (id === undefined) {
      this.error = 'Invalid Doctor Id';
      setTimeout(() => {
        this.error = '';
      }, 4000);
      return;
    }
    this.adminService.deleteDoctor(id).subscribe(
      (data: any) => {
        this.doctors = this.doctors.filter((doctor) => doctor.id !== id);
        this.error = '';
        this.success = 'Doctor deleted successfully';
        setTimeout(() => {
          this.success = '';
        }, 4000);
      },
      (error: any) => {
        this.error = error;
      }
    );
  }
}
