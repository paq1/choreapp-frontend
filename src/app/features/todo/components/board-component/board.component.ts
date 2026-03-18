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
  @Output() shouldMove: EventEmitter<[string, string]> = new EventEmitter();
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
    this.shouldMove.emit([idTicket, 'RIGHT']);
  }

  onRequestMoveLeft(idTicket: string): void {
    this.shouldMove.emit([idTicket, 'LEFT']);
  }
}
