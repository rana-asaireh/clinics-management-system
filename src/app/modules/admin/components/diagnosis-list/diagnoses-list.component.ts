import { Component } from '@angular/core';
import { Diagnosis } from '../../../shared/models/diagnosis.model';
import { AdminService } from '../../services/admin.service';
import { DiagnosisService } from '../../../shared/services/diagnosis.service';

@Component({
  selector: 'app-diagnosis-list',
  standalone: false,
  templateUrl: './diagnoses-list.component.html',
  styleUrl: './diagnoses-list.component.scss',
})
export class DiagnosesListComponent {
  constructor(
    private adminService: AdminService,
    private diagnosisService: DiagnosisService
  ) {}
  diagnoses!: Diagnosis[];
  error!: string;
  success!: string;

  ngOnInit(): void {
    this.diagnosisService.getDiagnosis().subscribe(
      (data: Diagnosis[]) => {
        this.error = '';
        this.diagnoses = data;
      },
      (error: any) => {
        this.error = error.message;
      }
    );
  }
  deleteDiagnosis(id?: string): void {
    if (id === undefined) {
      this.error = 'Invalid Diagnosis Id';
      setTimeout(() => {
        this.error = '';
      }, 4000);
      return;
    }
    this.adminService.deleteDiagnosis(id).subscribe(
      (data: any) => {
        this.diagnoses = this.diagnoses.filter(
          (diagnosis) => diagnosis.id !== id
        );
        this.error = '';
        this.success = 'Diagnosis deleted successfully';
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
