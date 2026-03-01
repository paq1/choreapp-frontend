import { Component, inject } from '@angular/core';
import { BoardComponent } from '../../components/board-component/board.component';
import { TodoApiService } from '../../data-access/todo-api.service';
import { Observable } from 'rxjs';
import { JsonApiSingleModel } from '../../../../shared/models/jsonapi.model';
import { BoardModel } from '../../models/board.model';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-board-page',
  imports: [BoardComponent, AsyncPipe],
  templateUrl: './board-page.html',
  styleUrl: './board-page.scss',
})
export class BoardPage {
  todoApiService = inject(TodoApiService);

  fetchBoard(): Observable<JsonApiSingleModel<BoardModel>> {
    return this.todoApiService.fetchBoard('pierre');
  }
}
