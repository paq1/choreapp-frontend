import { Component, EventEmitter, input, Output } from '@angular/core';
import { ColumnModel } from '../../../models/board.model';
import { CardComponent } from './card.component/card.component';

@Component({
  selector: 'cp-column',
  imports: [CardComponent],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss',
  standalone: true,
})
export class ColumnComponent {
  column = input<ColumnModel>();

  @Output() cardRequestMoveRight: EventEmitter<string> = new EventEmitter();
  @Output() cardRequestMoveLeft: EventEmitter<string> = new EventEmitter();

  onCardRequestMoveRight(id: string): void {
    console.log('onCardRequestMoveRight', id);
    this.cardRequestMoveRight.emit(id);
  }
  onCardRequestMoveLeft(id: string): void {
    console.log('onCardRequestMoveRight', id);
    this.cardRequestMoveLeft.emit(id);
  }
}
