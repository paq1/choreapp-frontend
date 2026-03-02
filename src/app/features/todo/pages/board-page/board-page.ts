import { Component, inject } from '@angular/core';
import { BoardComponent } from '../../components/board-component/board.component';
import { TodoApiService } from '../../data-access/todo-api.service';
import { JsonApiSingleModel } from '../../../../shared/models/jsonapi.model';
import { BoardModel } from '../../models/board.model';
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board-page',
  imports: [BoardComponent, AsyncPipe],
  templateUrl: './board-page.html',
  styleUrl: './board-page.scss',
  standalone: true,
})
export class BoardPage {
  private readonly todoApiService = inject(TodoApiService);

  readonly board$: Observable<JsonApiSingleModel<BoardModel>> =
    this.todoApiService.fetchBoard('pierre');

  onNewBoard(board: BoardModel): void {
    console.log('onNewBoard', board);
    this.todoApiService.updateBoard('pierre', board);
  }
}
