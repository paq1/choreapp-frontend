import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonApiManyModel } from '../../../shared/models/jsonapi.model';
import { ColumnInModel, TicketInModel } from '../models/board.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ColumnModelRemote, ProjectModelRemote, TicketModelRemote } from '../models/remote.model';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  apiUrl = environment.apiUrl;

  private http: HttpClient = inject(HttpClient);

  constructor() {}

  fetchProjects(): Observable<JsonApiManyModel<ProjectModelRemote>> {
    return this.http.get<JsonApiManyModel<ProjectModelRemote>>(`${this.apiUrl}/projects`);
  }

  fetchColumns(projectId?: string): Observable<JsonApiManyModel<ColumnModelRemote>> {
    const filter = projectId ? `?filter[projectId]=${projectId}` : '';
    return this.http.get<JsonApiManyModel<ColumnModelRemote>>(`${this.apiUrl}/columns${filter}`);
  }

  fetchTickets(projectId?: string): Observable<JsonApiManyModel<TicketModelRemote>> {
    const filter = projectId ? `?filter[projectId]=${projectId}` : '';
    return this.http.get<JsonApiManyModel<TicketModelRemote>>(`${this.apiUrl}/tickets${filter}`);
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
      priority: task.priority,
      projectId: task.projectId,
    });
  }

  addColumn(column: ColumnInModel): Observable<unknown> {
    return this.http.post(`${this.apiUrl}/columns`, {
      title: column.title,
      description: column.description,
      projectId: column.projectId,
    });
  }
}
