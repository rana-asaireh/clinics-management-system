import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Clinic } from '../../../shared/models/clinic.model';
import { ClinicService } from '../../../shared/services/clinic.service';
import { PaginationService } from '../../../shared/services/pagination.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clinics-list',
  standalone: false,
  templateUrl: './clinics-list.component.html',
  styleUrls: ['./clinics-list.component.scss']
})
export class ClinicsListComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private clinicService: ClinicService,
    private paginationService: PaginationService,
    private router: Router
  ) { }
  clinics!: Clinic[];
  error!: string;
  success!: string;
  currentPage: number = 1;
  pageSize: number = 4;
  totalClinics: number = 0;
  totalPages: number = 0;
  pages: number[] = [];

  ngOnInit(): void {
    this.getTotalClinics();
  }

  getTotalClinics(): void {
    this.clinicService.getClinics().subscribe(
      (data: Clinic[]) => {
        this.totalClinics = data.length;
        this.totalPages = Math.ceil(this.totalClinics / this.pageSize);
        this.generatePageNumbers();
        this.loadClinics();
      },
      (error: any) => {
        this.error = 'Failed to load total clinics count.';
      }
    );
  }

  loadClinics(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginationService.getClinicsByPage(startIndex, this.pageSize).subscribe(
      (data: Clinic[]) => {
        this.clinics = data;
        this.error = '';
      },
      (error: any) => {
        this.error = 'Failed to load clinics for this page.';
      }
    );
  }

  editClinic(id?: string): void {
    this.router.navigate(['admin', 'edit-clinic', id])
  }
  deleteClinic(id?: string): void {
    if (!id) {
      this.error = 'Invalid Clinic Id';
      setTimeout(() => (this.error = ''), 3000);
      return;
    }

    this.adminService.deleteClinic(id).subscribe(
      () => {
        this.success = 'Clinic deleted successfully.';
        setTimeout(() => (this.success = ''), 3000);


        this.clinicService.getClinics().subscribe(
          (data: Clinic[]) => {
            this.totalClinics = data.length;
            this.totalPages = Math.ceil(this.totalClinics / this.pageSize);

            if (this.totalClinics === 0) {
              this.currentPage = 1;
            } else if ((this.currentPage - 1) * this.pageSize >= this.totalClinics) {
              this.currentPage = Math.max(this.currentPage - 1, 1);
            }

            this.generatePageNumbers();
            this.loadClinics();
          },
          (error: any) => {
            this.error = 'Failed to reload clinics after delete.';
          }
        );
      },
      (error: any) => {
        this.error = 'Failed to delete clinic.';
      }
    );
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.loadClinics();
  }

  generatePageNumbers(): void {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }
}
