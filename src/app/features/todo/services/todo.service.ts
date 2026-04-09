import { inject, Injectable, signal } from '@angular/core';
import { TodoApiService } from '../data-access/todo-api.service';
import { BoardV2, ColumnModelV2, TicketInModel, TicketModelV2 } from '../models/board.model';
import { BehaviorSubject, catchError, forkJoin, map, of } from 'rxjs';
import { JsonApiManyModel } from '../../../shared/models/jsonapi.model';
import { ProjectModelRemote } from '../models/remote.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly daoTodo: TodoApiService = inject(TodoApiService);

  private readonly boardV2Subject: BehaviorSubject<BoardV2 | null> =
    new BehaviorSubject<BoardV2 | null>(null);
  boardV2$ = this.boardV2Subject.asObservable();

  private _projectsSignal = signal<JsonApiManyModel<ProjectModelRemote> | null>(null);
  public readonly projectsSignal = this._projectsSignal.asReadonly();

  fetchProjects(): void {
    this.daoTodo.fetchProjects().subscribe({
      next: (data) => {
        this._projectsSignal.set(data);
      },
      error: (err) => console.error(err),
    });
  }

  changeProject(idProject: string) {
    this.fetchBoardV2(idProject);
  }

  fetchBoardV2(projectId?: string) {
    forkJoin({
      columns: this.daoTodo.fetchColumns(projectId),
      tickets: this.daoTodo.fetchTickets(projectId),
    })
      .pipe(
        map(({ columns, tickets }) => {
          const mappedTickets = tickets.data.map((ticket) => {
            return {
              id: ticket.id,
              columnId: ticket.attributes.columnId,
              title: ticket.attributes.title,
              order: ticket.attributes.order,
              priority: ticket.attributes.priority,
              description: ticket.attributes.description,
            } as TicketModelV2;
          });

          const mappedColumns = columns.data.map((column) => {
            return {
              id: column.id,
              title: column.attributes.title,
              position: column.attributes.position,
              tickets: mappedTickets.filter((ticket) => ticket.columnId === column.id),
              description: column.attributes.description,
            } as ColumnModelV2;
          });

          return { columns: mappedColumns } as BoardV2;
        }),
        catchError((err) => {
          console.error(err);
          return of({ columns: [] } as BoardV2);
        }),
      )
      .subscribe((board) => this.boardV2Subject.next(board));
  }

  addTask(task: TicketInModel): void {
    this.daoTodo.addTask(task).subscribe({
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

  onRequestMoveRight(idTicket: string): void {
    this.daoTodo.moveNextColumn(idTicket, 'RIGHT').subscribe({
      next: () => {
        this.fetchBoardV2();
      },
      error: (err) => console.error(err),
    });
  }

  changeColumnTicket(ticketId: string, columnId: string): void {
    this.daoTodo.changeColumnTicket(ticketId, columnId).subscribe({
      next: () => {
        this.fetchBoardV2();
      },
      error: (err) => console.error(err),
    });
  }

  onRequestMoveLeft(idTicket: string): void {
    this.daoTodo.moveNextColumn(idTicket, 'LEFT').subscribe({
      next: () => {
        this.fetchBoardV2();
      },
      error: (err) => console.error(err),
    });
  }
}
