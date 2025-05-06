import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Clinic } from '../../../shared/models/clinic.model';
import { ClinicService } from '../../../shared/services/clinic.service';

@Component({
  selector: 'app-clinics-list',
  standalone: false,
  templateUrl: './clinics-list.component.html',
  styleUrl: './clinics-list.component.scss',
})
export class ClinicsListComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private clinicService: ClinicService
  ) {}
  clinics!: Clinic[];
  error!: string;
  success!: string;

  ngOnInit(): void {
    this.clinicService.getClinics().subscribe(
      (data: Clinic[]) => {
        this.error = '';
        this.clinics = data;
      },
      (error: any) => {
        this.error = error;
      }
    );
  }
  deleteClinic(id?: string): void {
    this.error = '';
    if (id === undefined) {
      this.error = 'Invalid Clinic Id';
      setTimeout(() => {
        this.error = '';
      }, 4000);
      return;
    }
    this.adminService.deleteClinic(id).subscribe(
      (data: any) => {
        this.clinics = this.clinics.filter((clinic) => clinic.id !== id);
        this.error = '';
        this.success = 'Clinic deleted successfully';
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
