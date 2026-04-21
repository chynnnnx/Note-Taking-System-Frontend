import { signal, computed } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';
 import { PageQueryParams } from '../models/paged-query-params';

export function usePagination(defaultSize = 12) {
  const page = signal(0); 
  const pageSize = signal(defaultSize);

   const queryParams = computed((): PageQueryParams => ({
    page: page() + 1,
    pageSize: pageSize(),
  }));

  return {
    page,
    pageSize,
    queryParams,
    update: (state: PaginatorState) => {
      if (state.page !== undefined) page.set(state.page);
      if (state.rows !== undefined) pageSize.set(state.rows);
    }
  };
}