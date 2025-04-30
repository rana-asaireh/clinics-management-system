import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../doctor/services/doctor.service';
import { Doctor } from '../../../shared/models/doctor.model';
import { Clinic } from '../../../shared/models/clinic.model';
import { ClinicService } from '../../../shared/services/clinic.service';

@Component({
  selector: 'app-doctors-list',
  standalone: false,
  templateUrl: './doctors-list.component.html',
  styleUrl: './doctors-list.component.scss'
})
export class DoctorsListComponent implements OnInit {
  selectedClinicId: any;

  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  clinics: Clinic[] = [];
  searchQuery: any;

  constructor(private doctorService: DoctorService,
    private clinicService: ClinicService) {

  }

  ngOnInit(): void {
    //get doctors
    this.doctorService.getDoctors().subscribe(
      (doctors) => {
        this.doctors = doctors
        console.log("doctors", this.doctors)
      }
    )

    this.clinicService.getClinics().subscribe((clinics) => {
      this.clinics = clinics;
    });
  }

  //get clinic by doctor id 
  getClinicNameByDoctorId(doctorId: string): string {
    const doctor = this.doctors.find(d => d.id?.toString() == doctorId);
    if (doctor) {
      const clinic = this.clinics.find(c => c.id?.toString() == doctor.clinic_id);
      console.log("clinic", clinic)
      return clinic ? clinic.name : 'Unknown Clinic';
    }
    return 'Unknown Clinic';
  }


  //filter items 
  onFilterChange() {
    this.doctorService.getFilteredDoctors(this.selectedClinicId, this.searchQuery).subscribe(
      (filteredDoctors) => {
        console.log("filtered Doctors ", filteredDoctors)
        this.doctors = filteredDoctors
      }
    )
  }
}
