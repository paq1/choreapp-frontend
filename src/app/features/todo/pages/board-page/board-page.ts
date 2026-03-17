import { Component, inject, OnInit } from '@angular/core';
import { BoardComponent } from '../../components/board-component/board.component';
import { BoardModel, BoardV2, CardInModel, TicketFormModel } from '../../models/board.model';
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

  onNewBoard(board: BoardV2): void {
    console.log('onNewBoard', board);
    // this.todoService.updateBoard('pierre', board);
  }

  onAddTask(task: TicketFormModel): void {
    const col = this.boardSignal()?.columns[0]
    if (!col) return;
    this.todoService.addTask('pierre', {
      title: task.title,
      columnId: col.id,
      description: task.description,
    });
    this.todoService.fetchBoardV2();
    console.log('onAddTask', task);
  }
}
