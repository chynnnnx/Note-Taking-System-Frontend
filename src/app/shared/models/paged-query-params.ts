export interface PageQueryParams {
    page?: number;
    pageSize?: number;
    archived?: boolean;
  searchTerm?: string;
  isPinned?: boolean;
  isFavorite?: boolean;
    [key: string]: any;
}