export interface PageQueryParams {
    page?: number;
    pageSize?: number;
    archived?: boolean;
  searchTerm?: string;
  isPinned?: boolean;
    [key: string]: any;
}