import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonApiManyModel } from '../../../shared/models/jsonapi.model';
import { CardInModel } from '../models/board.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ColumnModelRemote, TicketModelRemote } from '../models/remote.model'; // TODO : a degager lorsque le back sera la

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

  addTask(task: CardInModel): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/tickets`, {
      title: task.title,
      columnId: task.columnId,
      description: task.description,
    });
  }
}
