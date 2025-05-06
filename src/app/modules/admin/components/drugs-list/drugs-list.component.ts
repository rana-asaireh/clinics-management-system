import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Drug } from '../../../shared/models/drug.model';
import { DrugService } from '../../../shared/services/drug.service';

@Component({
  selector: 'app-drugs-list',
  standalone: false,
  templateUrl: './drugs-list.component.html',
  styleUrl: './drugs-list.component.scss',
})
export class DrugsListComponent {
  constructor(
    private adminService: AdminService,
    private drugService: DrugService
  ) {}
  drugs!: Drug[];
  error!: string;
  success!: string;

  ngOnInit(): void {
    this.drugService.getDrugs().subscribe(
      (data: Drug[]) => {
        this.error = '';
        this.drugs = data;
      },
      (error: any) => {
        this.error = error.message;
      }
    );
  }
  deleteDrug(id?: string): void {
    if (id === undefined) {
      this.error = 'Invalid Drug Id';
      setTimeout(() => {
        this.error = '';
      }, 4000);
      return;
    }
    this.adminService.deleteDrug(id).subscribe(
      (data: any) => {
        this.drugs = this.drugs.filter((drug) => drug.id !== id);
        this.error = '';
        this.success = 'Drug deleted successfully';
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
