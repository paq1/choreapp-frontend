import { Component, EventEmitter, inject, input, Output } from '@angular/core';
import { TicketModelV2 } from '../../../../models/board.model';
import { CdkDrag } from '@angular/cdk/drag-drop';
import { DragAndDropService } from '../../../../services/drag-and-drop.service';

@Component({
  selector: 'cp-card',
  imports: [CdkDrag],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  standalone: true,
})
export class CardComponent {
  card = input<TicketModelV2>();

  @Output() moveRight: EventEmitter<string> = new EventEmitter();
  @Output() moveLeft: EventEmitter<string> = new EventEmitter();
  @Output() clickOnDelete: EventEmitter<string> = new EventEmitter();
  @Output() currentDragStart: EventEmitter<string> = new EventEmitter();

  private readonly dragAndDropService = inject(DragAndDropService);

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

  onDelete(): void {
    this.clickOnDelete.emit(this.card()?.id);
  }

  onDragStart() {
    const id = this.card()?.id;
    if (!id) return;
    console.log('drag start', id);
    this.currentDragStart.emit(id);
    this.dragAndDropService.setCurrentItem(id);
  }
}
