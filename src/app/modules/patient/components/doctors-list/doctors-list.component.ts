import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../../../doctor/services/doctor.service';
import { Doctor } from '../../../shared/models/doctor.model';
import { Clinic } from '../../../shared/models/clinic.model';
import { ClinicService } from '../../../shared/services/clinic.service';
import { PaginationService } from '../../../shared/services/pagination.service';

@Component({
  selector: 'app-doctors-list',
  standalone: false,
  templateUrl: './doctors-list.component.html',
  styleUrl: './doctors-list.component.scss'
})
export class DoctorsListComponent implements OnInit {

  selectedClinicId: string = ''

  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  clinics: Clinic[] = [];
  searchQuery: any;
  searchImage: string = 'search';
  //pagination properities
  currentPage: number = 1;
  pageSize: number = 3;
  totalDoctors: number = 0;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(private doctorService: DoctorService,
    private clinicService: ClinicService,
    private paginationService: PaginationService) {

  }

  ngOnInit(): void {
    //get doctors
    this.doctorService.getDoctors().subscribe(
      (doctors) => {
        this.doctors = doctors
        console.log("doctors", this.doctors)

        this.totalDoctors = doctors.length;
        this.totalPages = this.paginationService.getTotalPages(this.totalDoctors, this.pageSize);
        this.pages = this.paginationService.generatePageNumbers(this.totalPages)
        this.filteredDoctors = this.paginationService.paginate(doctors, this.currentPage, this.pageSize)

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
  onFilterChange(): void {
    this.currentPage = 1;
    this.doctorService.getFilteredDoctors(this.selectedClinicId, this.searchQuery).subscribe(
      (filteredDoctors) => {
        console.log("filtered Doctors ", filteredDoctors)
        this.doctors = filteredDoctors;
        if (this.searchQuery) {
          this.searchImage = 'trash'
        }
        else {
          this.searchImage = 'search'

        }
        this.totalDoctors = filteredDoctors.length;
        this.totalPages = this.paginationService.getTotalPages(this.totalDoctors, this.pageSize);
        this.pages = this.paginationService.generatePageNumbers(this.totalPages)
        this.filteredDoctors = this.paginationService.paginate(filteredDoctors, this.currentPage, this.pageSize)
      }

    )


  }
  imageClicked(): void {
    this.searchQuery = ''
    this.doctorService.getDoctors().subscribe(
      (doctors) => {
        this.doctors = doctors
        console.log("doctors", this.doctors)
        this.searchImage = 'search'

        this.onFilterChange()
      }
    )
  }


  //#region pagination
  goToPage(page: number) {
    this.currentPage = page
    this.filteredDoctors = this.paginationService.paginate(
      this.doctors,
      this.currentPage,
      this.pageSize
    );
  }
}
