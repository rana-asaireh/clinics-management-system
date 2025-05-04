import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Drug } from '../../../shared/models/drug.model';
import { DrugService } from '../../../shared/services/drug.service';
import { PaginationService } from '../../../shared/services/pagination.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-drugs-list',
  standalone: false,
  templateUrl: './drugs-list.component.html',
  styleUrls: ['./drugs-list.component.scss']
})
export class DrugsListComponent {
  drugs: Drug[] = [];
  filteredDrugs: Drug[] = [];
  error!: string;
  success!: string;
  searchTerm: string = '';
  currentPage: number = 1;
  pageSize: number = 4;
  totalDrugs: number = 0;
  totalPages: number = 0;
  pages: number[] = [];

  constructor(
    private adminService: AdminService,
    private drugService: DrugService,
    private paginationService: PaginationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getDrugs();
  }

  getDrugs(): void {
    this.drugService.getDrugs().subscribe(
      (data: Drug[]) => {
        this.drugs = data;
        this.filteredDrugs = [...data];
        this.totalDrugs = this.drugs.length;
        this.totalPages = this.paginationService.getTotalPages(this.totalDrugs, this.pageSize);
        this.generatePageNumbers();
        this.filterDrugs();
      },
      (error: any) => {
        this.error = 'Failed to load drugs.';
      }
    );
  }

  filterDrugs(): void {
    const term = this.searchTerm.trim().toLowerCase();
    let filtered = this.drugs;

    if (term) {
      filtered = filtered.filter(drug =>
        drug.name.toLowerCase().includes(term)
      );
    }

    this.filteredDrugs = filtered;
    this.totalDrugs = filtered.length;
    this.totalPages = this.paginationService.getTotalPages(this.totalDrugs, this.pageSize);
    this.generatePageNumbers();

    this.filteredDrugs = this.paginationService.paginate(filtered, this.currentPage, this.pageSize);
  }

  goToPage(page: number): void {
    this.currentPage = page;
    this.filterDrugs();
  }

  generatePageNumbers(): void {
    this.pages = this.paginationService.generatePageNumbers(this.totalPages);
  }

  onSearch(): void {
    this.currentPage = 1;
    this.filterDrugs();
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.onSearch();
    }
  }

  onKeyUp(event: KeyboardEvent): void {
    if (this.searchTerm.trim() === '') {
      this.currentPage = 1;
      this.filterDrugs();
    }
  }

  editDrug(id?: string): void {
    this.router.navigate(['admin', 'edit-drug', id])
  }

  deleteDrug(id?: string): void {
    if (!id) {
      this.error = 'Invalid Drug Id';
      setTimeout(() => (this.error = ''), 3000);
      return;
    }

    this.adminService.deleteDrug(id).subscribe(
      () => {
        this.success = 'Drug deleted successfully.';
        setTimeout(() => (this.success = ''), 3000);
        this.drugService.getDrugs().subscribe(
          (data: Drug[]) => {
            this.drugs = data;
            this.totalDrugs = data.length;

            if (this.totalDrugs === 0) {
              this.currentPage = 1;
            } else if ((this.currentPage - 1) * this.pageSize >= this.totalDrugs) {
              this.currentPage = Math.max(this.currentPage - 1, 1);
            }

            this.filterDrugs();
          },
          () => {
            this.error = 'Failed to reload doctors after delete.';
          }
        );

      },
      (error: any) => {
        this.error = 'Failed to delete drug.';
      }
    );
  }
}


