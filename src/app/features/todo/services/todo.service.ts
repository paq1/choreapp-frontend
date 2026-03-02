import { inject, Injectable } from '@angular/core';
import { TodoApiService } from '../data-access/todo-api.service';
import { BoardModel } from '../models/board.model';
import { Subject, take } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {

  private readonly daoTodo: TodoApiService = inject(TodoApiService);

  private readonly boardSubject: Subject<BoardModel> = new Subject();
  board$ = this.boardSubject.asObservable();

  fetchBoard(tenant: string): void {
    this.daoTodo.fetchBoard(tenant).pipe(take(1)).subscribe({
      next: (board) => {
        console.log('board', board);
        this.boardSubject.next(board.data.attributes);
      },
      error: (err) => console.error(err),
    });
  }

  updateBoard(tenant: string, board: BoardModel): void {
    this.daoTodo.updateBoard(tenant, board);
    this.fetchBoard(tenant);
  }
}
