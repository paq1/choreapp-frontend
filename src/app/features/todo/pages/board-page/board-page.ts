import { Component, inject, OnInit } from '@angular/core';
import { BoardComponent } from '../../components/board-component/board.component';
import { BoardModel, CardInModel } from '../../models/board.model';
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
  boardSignal = toSignal(this.todoService.board$);

  ngOnInit(): void {
    this.todoService.fetchBoard('pierre');
  }

  onNewBoard(board: BoardModel): void {
    console.log('onNewBoard', board);
    this.todoService.updateBoard('pierre', board);
  }

  onAddTask(task: CardInModel): void {
    this.todoService.addTask('pierre', task);
    console.log('onAddTask', task);
  }
}
