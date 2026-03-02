import { Component, EventEmitter, input, Output } from '@angular/core';
import { BoardModel, CardModel, ColumnModel } from '../../models/board.model';
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
  @Output() shouldUpdate: EventEmitter<BoardModel> = new EventEmitter();

  onRequestMoveRight(id: string): void {
    const boardSync = this.board();
    if (!boardSync) return;

    // on trouve la colonne et l'index de la card
    const maybeCleanColumns = this.cleanColumn(boardSync, id);
    if (!maybeCleanColumns) return;
    const [columns, card, index] = maybeCleanColumns;

    if (index < columns.length - 1) {
      columns[index + 1].cards.push(card);
      const newBoard = {
        tables: columns,
      };
      this.shouldUpdate.emit(newBoard);
    }
  }

  onRequestMoveLeft(id: string): void {
    const boardSync = this.board();
    if (!boardSync) return;

    // on trouve la colonne et l'index de la card
    const maybeCleanColumns = this.cleanColumn(boardSync, id);
    if (!maybeCleanColumns) return;
    const [columns, card, index] = maybeCleanColumns;

    if (index > 0) {
      columns[index - 1].cards.push(card);
      const newBoard = {
        tables: columns,
      };
      this.shouldUpdate.emit(newBoard);
    }
  }

  private cleanColumn(
    boardSync: BoardModel,
    id: string,
  ): [ColumnModel[], CardModel, number] | undefined {
    // on trouve la colonne et l'index de la card
    const columnAndIndex = boardSync.tables
      .map((c, i) => [c, i] as const)
      .find(([c, _]) => c.cards.map((c) => c.id).includes(id));
    if (!columnAndIndex) return;
    const [oldColumn, index] = columnAndIndex;

    // on recupere la carte a deplacer
    const card = oldColumn.cards.find((c) => c.id === id);
    if (!card) return;

    // on supprime la carte de l'ancienne colonne
    const tableWithoutCard = boardSync.tables.map((column) => {
      const newCards = column.cards.filter((c) => c.id !== id);
      return {
        title: column.title,
        cards: newCards,
      };
    });

    return [tableWithoutCard, card, index];
  }
}
