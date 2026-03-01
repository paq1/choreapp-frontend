import { Component, input } from '@angular/core';
import { ColumnModel } from '../../../models/board.model';
import { CardComponent } from './card.component/card.component';

@Component({
  selector: 'cp-column',
  imports: [CardComponent],
  templateUrl: './column.component.html',
  styleUrl: './column.component.scss',
})
export class ColumnComponent {
  column = input<ColumnModel>();
}
