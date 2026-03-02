import { Component, input } from '@angular/core';
import { BoardModel } from '../../models/board.model';
import { ColumnComponent } from './column-component/column.component';

@Component({
  selector: 'cp-board',
  imports: [ColumnComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  standalone: true,
})
export class BoardComponent {
  board = input<BoardModel>();
}
