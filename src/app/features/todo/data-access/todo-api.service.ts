import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonApiManyModel } from '../../../shared/models/jsonapi.model';
import { TicketInModel } from '../models/board.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ColumnModelRemote, TicketModelRemote } from '../models/remote.model';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  apiUrl = environment.apiUrl;

  private http: HttpClient = inject(HttpClient);

  constructor() {}

  fetchColumns(): Observable<JsonApiManyModel<ColumnModelRemote>> {
    return this.http.get<JsonApiManyModel<ColumnModelRemote>>(`${this.apiUrl}/columns`);
  }

  fetchTickets(): Observable<JsonApiManyModel<TicketModelRemote>> {
    return this.http.get<JsonApiManyModel<TicketModelRemote>>(`${this.apiUrl}/tickets`);
  }

  deleteTicket(ticketId: string): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/tickets/${ticketId}`);
  }

  moveNextColumn(ticketId: string, direction: 'LEFT' | 'RIGHT'): Observable<unknown> {
    return this.http.patch(`${this.apiUrl}/tickets/${ticketId}/command/move-left-or-right`, {
      direction: direction,
    });
  }

  changeColumnTicket(ticketId: string, columnId: string): Observable<unknown> {
    return this.http.patch(`${this.apiUrl}/tickets/${ticketId}/command/change-column`, {
      columnId: columnId,
    });
  }

  addTask(task: TicketInModel): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/tickets`, {
      title: task.title,
      columnId: task.columnId,
      description: task.description,
    });
  }
}
