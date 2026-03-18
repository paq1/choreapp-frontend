import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TicketFormModel } from '../models/board.model';

export class CreateFormGroup extends FormGroup {
  constructor() {
    super({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
    });
  }

  get title() {
    return this.get('title');
  }
  get description() {
    return this.get('description');
  }

  getValue(): TicketFormModel {
    return {
      title: this.title?.value,
      description: this.description?.value,
    };
  }
}
