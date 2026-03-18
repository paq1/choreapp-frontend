import { inject, Injectable } from '@angular/core';
import { TodoApiService } from '../data-access/todo-api.service';
import { BoardV2, CardInModel, ColumnModelV2, TicketModelV2 } from '../models/board.model';
import { map, Subject, switchMap } from 'rxjs';
import { Entity } from '../../../shared/models/entity';
import { ColumnModelRemote, TicketModelRemote } from '../models/remote.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly daoTodo: TodoApiService = inject(TodoApiService);

  private readonly boardV2Subject: Subject<BoardV2> = new Subject();
  boardV2$ = this.boardV2Subject.asObservable();

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

  addTask(task: CardInModel): void {
    this.daoTodo.addTask(task).subscribe({
      next: (value) => {
        console.log('add task', value);
        this.fetchBoardV2();
      },
      error: (err) => console.error(err),
    });
  }

  deleteOneTicket(ticketId: string): void {
    this.daoTodo.deleteTicket(ticketId).subscribe({
      next: (value) => {
        console.log('delete ticket', value);
        this.fetchBoardV2();
      },
      error: (err) => console.error(err),
    });
  }
}
