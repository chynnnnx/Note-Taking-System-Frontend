export interface CreateNoteDto{
    title: string;
    content: string;
    categoryId?: string | null;
    isPinned: boolean;
}