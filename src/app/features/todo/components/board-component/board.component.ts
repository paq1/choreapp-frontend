import { Component, EventEmitter, input, Output } from '@angular/core';
import { BoardV2, TicketFormModel } from '../../models/board.model';
import { ColumnComponent } from './column-component/column.component';
import { AddTaskFormComponent } from './add-task-form-component/add-task-form.component';

@Component({
  selector: 'cp-board',
  imports: [ColumnComponent, AddTaskFormComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  standalone: true,
})
export class BoardComponent {
  board = input<BoardV2>();
  @Output() shouldUpdate: EventEmitter<[string, string] | undefined> = new EventEmitter();
  @Output() shouldAddTask: EventEmitter<TicketFormModel> = new EventEmitter();
  @Output() shouldDeleteTask: EventEmitter<string> = new EventEmitter();

  isOpen: boolean = false;

  onNewTask(): void {
    this.isOpen = !this.isOpen;
  }

  onAddTask(task: TicketFormModel): void {
    this.shouldAddTask.emit(task);
  }

  onDeleteTask(id: string): void {
    this.shouldDeleteTask.emit(id);
  }

  onRequestMoveRight(idTicket: string): void {
    const boardSync = this.board();
    if (!boardSync) return;
    const index = this.fetchNextColumnIndex(idTicket, boardSync);
    if (index === undefined) return;
    if (index === boardSync.columns.length - 1) {
      console.warn('onRequestMoveRight', 'last column');
      return;
    } else {
      const nextColumn = boardSync.columns[index + 1];
      this.shouldUpdate.emit([nextColumn.id, idTicket]);
    }
  }

  onRequestMoveLeft(idTicket: string): void {
    const boardSync = this.board();
    if (!boardSync) return;
    const index = this.fetchNextColumnIndex(idTicket, boardSync);
    if (index === undefined) return;
    if (index === 0) {
      console.warn('onRequestMoveRight', 'first column');
      return;
    } else {
      const nextColumn = boardSync.columns[index - 1];
      this.shouldUpdate.emit([nextColumn.id, idTicket]);
    }
  }

  fetchNextColumnIndex(idTicket: string, board: BoardV2): number | undefined {
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
