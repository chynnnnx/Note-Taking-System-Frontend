import { HttpErrorResponse } from '@angular/common/http';

export function mapHttpError(err: HttpErrorResponse): string {
  const backendMessage = err.error?.message; 

  if (backendMessage) return backendMessage;

  const messages: Record<number, string> = {
    0: 'Network error. Please check your internet connection.',
    400: 'Bad request.',
    401: 'Unauthorized. Please login again.',
    403: 'Forbidden. You do not have permission.',
    404: 'Resource not found.',
    500: 'Internal server error.',
  };

  return messages[err.status] || 'Something went wrong.';
}
