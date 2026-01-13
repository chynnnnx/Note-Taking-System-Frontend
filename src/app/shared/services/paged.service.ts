import { ApiService } from "../../core/services/api.service";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { PagedResult } from "../models/paged-result";

@Injectable({ providedIn: 'root'}
)
export class PagedService {
    constructor(private api: ApiService){}

    getPaged<T>(url: string, params: Record<string, any>={}): Observable<PagedResult<T>>{
        const queryString = new URLSearchParams(params).toString();
        return this.api.get<PagedResult<T>>(`${url}?${queryString}`);
    }
}