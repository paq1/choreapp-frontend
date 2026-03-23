import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { ColumnModelV2 } from '../../../models/board.model';
import { CardComponent } from './card.component/card.component';
import { CdkDragDrop, CdkDropList } from '@angular/cdk/drag-drop';
import { DragAndDropService } from '../../../services/drag-and-drop.service';

@Component({
  selector: 'cp-column',
  imports: [CardComponent, CdkDropList],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss',
  standalone: true,
})
export class ColumnComponent {
  column = input<ColumnModelV2>();
  currentItem?: string;

  @Output() cardRequestMoveRight: EventEmitter<string> = new EventEmitter();
  @Output() cardRequestMoveLeft: EventEmitter<string> = new EventEmitter();
  @Output() cardRequestDelete: EventEmitter<string> = new EventEmitter();
  @Output() changeCard: EventEmitter<[string, string]> = new EventEmitter();
  private readonly dragAndDropService = inject(DragAndDropService);

  onCardRequestMoveRight(id: string): void {
    this.cardRequestMoveRight.emit(id);
  }
  onCardRequestMoveLeft(id: string): void {
    this.cardRequestMoveLeft.emit(id);
  }
  onCardRequestDelete(id: string): void {
    this.cardRequestDelete.emit(id);
  }

  onCardDragStart(id: string): void {
    this.currentItem = id;
    console.log('column drag start', this.currentItem);
  }

  drop(event: CdkDragDrop<string[]>) {
    console.log(event);
    const currentItem = this.dragAndDropService.currentItem;
    if (!currentItem) return;

    const id = this.column()?.id;
    if (id) {
      this.changeCard.emit([currentItem, id]);
      console.info('emit', currentItem, 'id column', id);
    } else {
      console.warn('No current item or column id');
    }
  }
}
