import { Component, input } from '@angular/core';
import { CardModel } from '../../../../models/board.model';


@Component({
  selector: 'cp-card',
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  card = input<CardModel>();
}
