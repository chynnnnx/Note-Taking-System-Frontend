export interface NoteForm{
    title: string;
    content: string;
    categoryId?: string | null;
    isPinned: boolean;
}