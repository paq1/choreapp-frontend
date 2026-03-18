import { Component, EventEmitter, input, Output } from '@angular/core';
import { ColumnModelV2 } from '../../../models/board.model';
import { CardComponent } from './card.component/card.component';

@Component({
  selector: 'cp-column',
  imports: [CardComponent],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss',
  standalone: true,
})
export class ColumnComponent {
  column = input<ColumnModelV2>();

  @Output() cardRequestMoveRight: EventEmitter<string> = new EventEmitter();
  @Output() cardRequestMoveLeft: EventEmitter<string> = new EventEmitter();
  @Output() cardRequestDelete: EventEmitter<string> = new EventEmitter();

  onCardRequestMoveRight(id: string): void {
    this.cardRequestMoveRight.emit(id);
  }
  onCardRequestMoveLeft(id: string): void {
    this.cardRequestMoveLeft.emit(id);
  }
  onCardRequestDelete(id: string): void {
    this.cardRequestDelete.emit(id);
  }
}
