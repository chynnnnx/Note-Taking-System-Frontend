export interface NoteModel{
    id: string;
    userId: string;
    title: string;
    content: string;
    isPinned: boolean;
    isArchived: boolean;
    isFavorite: boolean;
    createdAt: Date;
    updatedAt: Date;
    categoryId?: string | null;
}