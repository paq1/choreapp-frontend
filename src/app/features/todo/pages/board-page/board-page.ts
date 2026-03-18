import { Component, inject, OnInit } from '@angular/core';
import { BoardComponent } from '../../components/board-component/board.component';
import { TicketFormModel } from '../../models/board.model';
import { TodoService } from '../../services/todo.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-board-page',
  imports: [BoardComponent],
  templateUrl: './board-page.html',
  styleUrl: './board-page.scss',
  standalone: true,
})
export class BoardPage implements OnInit {
  private readonly todoService = inject(TodoService);
  boardSignal = toSignal(this.todoService.boardV2$);

  ngOnInit(): void {
    this.todoService.fetchBoardV2();
  }

  onMoveColumn(idsColumnAndTiclet: [string, string] | undefined): void {
    console.log('onMoveColumn', idsColumnAndTiclet);
    if (!idsColumnAndTiclet) return;
    const [columnId, ticketId] = idsColumnAndTiclet;
    console.log('move ticket ', ticketId, ' to column ', columnId);
    this.todoService.changeColumn(ticketId, columnId);
    // this.todoService.updateBoard('pierre', board);
  }

  onAddTask(task: TicketFormModel): void {
    const col = this.boardSignal()?.columns[0];
    if (!col) return;
    this.todoService.addTask({
      title: task.title,
      columnId: col.id,
      description: task.description,
    });
    console.log('onAddTask', task);
  }

  onDeleteTask(id: string): void {
    console.log('onDeleteTask', id);
    this.todoService.deleteOneTicket(id);
  }
}
