export interface UpdateNoteDto{
    title?: string;
    content?: string;
    categoryId?: string | null;
    isPinned?: boolean;
    isArchived?: boolean;
}