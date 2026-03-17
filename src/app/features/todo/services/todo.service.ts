import { inject, Injectable } from '@angular/core';
import { TodoApiService } from '../data-access/todo-api.service';
import {
  BoardModel,
  BoardV2,
  CardInModel,
  ColumnModelV2,
  TicketModelV2,
} from '../models/board.model';
import { map, Subject, switchMap } from 'rxjs';
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
    this.fetchColumnV2();
    this.fetchTicketV2();

    this.columns$.pipe(
      switchMap((columns) => {
        return this.tickets$.pipe(
          map((data) => {
            return data.map((tickets) => {
              return {
                id: tickets.id,
                columnId: tickets.attributes.columnId,
                title: tickets.attributes.title,
                order: tickets.attributes.order,
                description: tickets.attributes.description,
              } as TicketModelV2;
            });
          }),
          map((tickets) => {
            return columns.map((column) => {
              return {
                id: column.id,
                title: column.attributes.title,
                position: column.attributes.position,
                tickets: tickets.filter((ticket) => ticket.columnId === column.id),
                description: column.attributes.description,
              } as ColumnModelV2;
            });
          }),
        );
      }),
    )
      .subscribe({
        next: value => {
          console.log('fetch column', value);
          this.boardV2Subject.next({ columns: value });
        },
        error: err => console.error(err),
      })
    ;
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
    this.daoTodo.addTask(task);
    this.fetchBoardV2();
  }
}
