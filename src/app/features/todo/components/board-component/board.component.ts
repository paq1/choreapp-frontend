import { Component, EventEmitter, input, Output } from '@angular/core';
import { BoardV2, ColumnFormModel, TicketFormModel } from '../../models/board.model';
import { ColumnComponent } from './column-component/column.component';
import { AddTaskFormComponent } from './add-task-form-component/add-task-form.component';
import { CdkDropListGroup } from '@angular/cdk/drag-drop';
import { AddColumnForm } from './add-column-form/add-column-form';

@Component({
  selector: 'cp-board',
  imports: [ColumnComponent, AddTaskFormComponent, CdkDropListGroup, AddColumnForm],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  standalone: true,
})
export class BoardComponent {
  board = input<BoardV2>();
  @Output() shouldMove: EventEmitter<[string, string]> = new EventEmitter();
  @Output() shouldAddTask: EventEmitter<TicketFormModel> = new EventEmitter();
  @Output() shouldAddColumn: EventEmitter<ColumnFormModel> = new EventEmitter();
  @Output() shouldDeleteTask: EventEmitter<string> = new EventEmitter();
  @Output() changeCard: EventEmitter<[string, string]> = new EventEmitter();

  isOpen: boolean = false;
  isOpenColumn: boolean = false;

  onNewTask(): void {
    this.isOpen = !this.isOpen;
  }

  onNewColumn(): void {
    this.isOpenColumn = !this.isOpenColumn;
  }

  onAddTask(task: TicketFormModel): void {
    this.shouldAddTask.emit(task);
  }

  onAddColumn(column: ColumnFormModel): void {
    this.shouldAddColumn.emit(column);
    this.isOpenColumn = false;
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

  onChangeCard(idsColumnAndTiclet: [string, string]): void {
    console.log('change card', idsColumnAndTiclet);
    this.changeCard.emit(idsColumnAndTiclet);
  }
}
