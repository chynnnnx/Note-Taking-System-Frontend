export interface NoteModel{
    id: string;
    userId: string;
    title: string;
    content: string;
    isPinned: boolean;
    isArchived: boolean;
    createdAt: Date;
    updatedAt: Date;
    categoryId?: string | null;
}