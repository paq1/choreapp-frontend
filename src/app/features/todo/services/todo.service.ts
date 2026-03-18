import { inject, Injectable } from '@angular/core';
import { TodoApiService } from '../data-access/todo-api.service';
import { BoardV2, ColumnModelV2, TicketInModel, TicketModelV2 } from '../models/board.model';
import { map, Subject, switchMap } from 'rxjs';
import { Entity } from '../../../shared/models/entity';
import { ColumnModelRemote, TicketModelRemote } from '../models/remote.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly daoTodo: TodoApiService = inject(TodoApiService);

  private readonly boardV2Subject: Subject<BoardV2> = new Subject();
  boardV2$ = this.boardV2Subject.asObservable();
  boardSignal = toSignal(this.boardV2$);

  private readonly columnsSubject: Subject<Entity<ColumnModelRemote>[]> = new Subject();
  columns$ = this.columnsSubject.asObservable();

  private readonly ticketsSubject: Subject<Entity<TicketModelRemote>[]> = new Subject();
  tickets$ = this.ticketsSubject.asObservable();

  fetchBoardV2() {
    this.fetchColumnV2();
    this.fetchTicketV2();

    this.columns$
      .pipe(
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
        next: (value) => {
          this.boardV2Subject.next({ columns: value });
        },
        error: (err) => console.error(err),
      });
  }

  fetchColumnV2(): void {
    this.daoTodo.fetchColumns().subscribe({
      next: (columnsJsonAPi) => {
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

  addTask(task: TicketInModel): void {
    this.daoTodo.addTask(task).subscribe({
      next: () => {
        this.fetchBoardV2();
      },
      error: (err) => console.error(err),
    });
  }

  changeColumn(ticketId: string, columnId: string): void {
    this.daoTodo.changeColumnTicket(ticketId, columnId).subscribe({
      next: () => {
        this.fetchBoardV2();
      },
      error: (err) => console.error(err),
    });
  }

  deleteOneTicket(ticketId: string): void {
    this.daoTodo.deleteTicket(ticketId).subscribe({
      next: () => {
        this.fetchBoardV2();
      },
      error: (err) => console.error(err),
    });
  }

  // TODO : use cases dans le backend
  onRequestMoveRight(idTicket: string): void {
    const boardSync = this.boardSignal();
    if (!boardSync) return;
    const index = this.fetchNextColumnIndex(idTicket, boardSync);
    if (index === undefined) return;
    if (index === boardSync.columns.length - 1) {
      console.warn('onRequestMoveRight', 'last column');
      return;
    } else {
      const nextColumn = boardSync.columns[index + 1];
      this.changeColumn(idTicket, nextColumn.id);
    }
  }

  // TODO : use cases dans le backend
  onRequestMoveLeft(idTicket: string): void {
    const boardSync = this.boardSignal();
    if (!boardSync) return;
    const index = this.fetchNextColumnIndex(idTicket, boardSync);
    if (index === undefined) return;
    if (index === 0) {
      console.warn('onRequestMoveRight', 'first column');
      return;
    } else {
      const nextColumn = boardSync.columns[index - 1];
      this.changeColumn(idTicket, nextColumn.id);
    }
  }

  // specific for move left and right use cases
  private fetchNextColumnIndex(idTicket: string, board: BoardV2): number | undefined {
    const found = board.columns
      .map((c, i) => [c, i] as const)
      .find(([c]) => {
        return c.tickets.map((t) => t.id).includes(idTicket);
      });

    if (!found) {
      console.warn('onRequestMoveRight', 'card not found');
      return;
    }

    const [_, index] = found;
    return index;
  }
}
