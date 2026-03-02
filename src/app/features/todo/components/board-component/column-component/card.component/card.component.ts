import { Component, EventEmitter, input, Output } from '@angular/core';
import { CardModel } from '../../../../models/board.model';

@Component({
  selector: 'cp-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  standalone: true,
})
export class CardComponent {
  card = input<CardModel>();

  @Output() moveRight: EventEmitter<string> = new EventEmitter();
  @Output() moveLeft: EventEmitter<string> = new EventEmitter();

  onMoveRight(): void {
    const cardSync = this.card();
    if (!cardSync) return;
    this.moveRight.emit(cardSync.id);
  }
  onMoveLeft(): void {
    const cardSync = this.card();
    if (!cardSync) return;
    this.moveLeft.emit(cardSync.id);
  }
}
