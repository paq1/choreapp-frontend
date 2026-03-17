import { inject, Injectable } from '@angular/core';
import { TodoApiService } from '../data-access/todo-api.service';
import { BoardModel, BoardV2, CardInModel } from '../models/board.model';
import { Subject } from 'rxjs';
import { Entity } from '../../../shared/models/entity';
import { ColumnModelRemote, TicketModelRemote } from '../models/remote.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly daoTodo: TodoApiService = inject(TodoApiService);

  private readonly boardSubject: Subject<BoardModel> = new Subject();
  board$ = this.boardSubject.asObservable();

  private readonly boardV2Subject: Subject<BoardV2> = new Subject();
  boardV2$ = this.boardV2Subject.asObservable();

  private readonly columnsSubject: Subject<Entity<ColumnModelRemote>[]> = new Subject();
  columns$ = this.columnsSubject.asObservable();

  private readonly ticketsSubject: Subject<Entity<TicketModelRemote>[]> = new Subject();
  tickets$ = this.ticketsSubject.asObservable();

  fetchBoardV2() {

  }

  fetchColumnV2(): void {
    this.daoTodo.fetchColumns().subscribe({
      next: (columnsJsonAPi) => {
        console.log('fetch column', columnsJsonAPi);

        const entities = columnsJsonAPi.data.map((column) => ({
          id: column.id,
          type: column.type,
          attributes: column.attributes,
        }));

        this.columnsSubject.next(entities);
      },
      error: (err) => console.error(err),
    });
  }

  fetchTicketV2(): void {
    this.daoTodo.fetchTickets().subscribe({
      next: (ticketsJsonAPi) => {
        console.log('fetch tickets', ticketsJsonAPi);

        const entities = ticketsJsonAPi.data.map((tickets) => ({
          id: tickets.id,
          type: tickets.type,
          attributes: tickets.attributes,
        }));

        this.ticketsSubject.next(entities);
      },
      error: (err) => console.error(err),
    });
  }

  fetchBoard(tenant: string): void {
    this.daoTodo.fetchBoard(tenant).subscribe({
      next: (board) => {
        console.log('fetch board', board);
        this.boardSubject.next(board.data.attributes);
      },
      error: (err) => console.error(err),
    });
  }

  updateBoard(tenant: string, board: BoardModel): void {
    this.daoTodo.updateBoard(tenant, board);
    this.fetchBoard(tenant);
  }

  addTask(tenant: string, task: CardInModel): void {
    this.daoTodo.addTask(tenant, task);
    this.fetchBoard(tenant);
  }
}
