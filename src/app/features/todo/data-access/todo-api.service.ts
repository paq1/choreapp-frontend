import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { JsonApiManyModel, JsonApiSingleModel } from '../../../shared/models/jsonapi.model';
import {
  BoardModel,
  CardInModel,
  ColumnModel,
} from '../models/board.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import * as uuid from 'uuid';
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

  fetchBoard(tenant: string): Observable<JsonApiSingleModel<BoardModel>> {
    // TODO : remplace lorsque l'api sera prete : return this.http.get<JsonApiSingleModel<BoardModel>>(`${this.apiUrl}/boards?tenant=${tenant}`);
    return of(this.mockBoard);
  }

  updateBoard(tenant: string, board: BoardModel): void {
    // TODO : remplace lorsque l'api sera prete : return this.http.get<JsonApiSingleModel<BoardModel>>(`${this.apiUrl}/boards?tenant=${tenant}`);
    this.mockBoard.data.attributes = board;
  }

  addTask(tenant: string, task: CardInModel): void {
    const nextId = uuid.v4();
    this.mockBoard.data.attributes.tables[0].cards.push({
      id: nextId,
      title: task.title,
      description: task.description,
      tags: task.tags,
    });
  }

  private mockBoard = {
    data: {
      type: 'board',
      id: '1',
      attributes: {
        tables: [
          {
            title: 'TODO',
            cards: [
              {
                id: '1',
                title: 'Faire a manger',
                description: 'prendre en compte les 5 fruits et légume',
                tags: ['code'],
              },
              {
                id: '2',
                title: 'Ranger la cuisine',
                description: 'faire la vaisselle',
                tags: ['code'],
              },
            ],
          },
          {
            title: 'IN PROGRESS',
            cards: [
              {
                id: '3',
                title: 'Faire les courses',
                description: 'acheter des légumes',
                tags: ['chiant'],
              },
            ],
          },
          {
            title: 'DONE',
            cards: [],
          },
        ],
      },
    },
  };
}
