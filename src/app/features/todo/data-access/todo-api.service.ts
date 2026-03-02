import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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
    return of({
      data: {
        id: '1',
        attributes: {
          tables: [
            {
              title: 'TODO',
              cards: [
                {
                  title: 'Faire a manger',
                  description: 'prendre en compte les 5 fruits et légume',
                  tags: ['code'],
                },
              ],
            },
            {
              title: 'IN PROGRESS',
              cards: [
                {
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
    });
  }
}
