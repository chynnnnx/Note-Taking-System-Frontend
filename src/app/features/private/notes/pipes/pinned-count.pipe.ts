import { Pipe, PipeTransform } from "@angular/core";    
import { NoteModel } from "../models/note-model";   

@Pipe({
    name: 'pinnedCount',
    standalone: true
})
export class PinnedCountPipe implements PipeTransform{
    transform(notes:NoteModel[] | null): number{
        if (!notes) return 0;
        return notes.filter(n =>n.isPinned).length;
    }
}