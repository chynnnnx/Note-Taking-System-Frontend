import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-paginator',
  standalone: true,
  imports: [CommonModule, PaginatorModule],
  templateUrl: './app-paginator.html',
  styleUrl: './app-paginator.scss',
})
export class AppPaginator {
  // Inputs
  totalRecords = input.required<number>();
  rows = input.required<number>();
  currentPage = input.required<number>(); // 0-indexed
  rowsPerPageOptions = input<number[]>([12, 24, 36]);

  // Output
  pageChange = output<PaginatorState>();

  // Derived Signals (Replaces your old methods)
  first = computed(() => this.currentPage() * this.rows());

  startRecord = computed(() => 
    this.totalRecords() === 0 ? 0 : this.first() + 1
  );

  endRecord = computed(() => 
    Math.min((this.currentPage() + 1) * this.rows(), this.totalRecords())
  );

  onPageChange(event: PaginatorState) {
    this.pageChange.emit(event);
  }
}