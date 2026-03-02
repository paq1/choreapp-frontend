import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { JsonApiSingleModel } from '../../../shared/models/jsonapi.model';
import { BoardModel } from '../models/board.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TodoApiService {
  apiUrl = environment.apiUrl;

  private http: HttpClient = inject(HttpClient);

  constructor() {}

  fetchBoard(tenant: string): Observable<JsonApiSingleModel<BoardModel>> {
    // TODO : remplace lorsque l'api sera prete : return this.http.get<JsonApiSingleModel<BoardModel>>(`${this.apiUrl}/boards?tenant=${tenant}`);
    return of(this.mockBoard);
  }

  updateBoard(tenant: string, board: BoardModel): void {
    // TODO : remplace lorsque l'api sera prete : return this.http.get<JsonApiSingleModel<BoardModel>>(`${this.apiUrl}/boards?tenant=${tenant}`);
    this.mockBoard.data.attributes = board;
  }

  private mockBoard = {
    data: {
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
