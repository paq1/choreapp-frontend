import { Component, inject, OnInit } from '@angular/core';
import { BoardComponent } from '../../components/board-component/board.component';
import { BoardModel } from '../../models/board.model';
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
  private readonly todoApiService = inject(TodoService);
  boardSignal = toSignal(this.todoApiService.board$);

  ngOnInit(): void {
    this.todoApiService.fetchBoard('pierre');
  }

  onNewBoard(board: BoardModel): void {
    console.log('onNewBoard', board);
    this.todoApiService.updateBoard('pierre', board);
  }
}
