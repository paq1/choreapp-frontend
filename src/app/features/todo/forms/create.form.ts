import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TicketFormModel } from '../models/board.model';

export class CreateFormGroup extends FormGroup {
  constructor() {
    super({
      title: new FormControl('', Validators.required),
      priority: new FormControl(1, Validators.required),
      description: new FormControl(undefined),
    });
  }

  get title() {
    return this.get('title');
  }
  get description() {
    return this.get('description');
  }
  get priority() {
    return this.get('priority');
  }

  getValue(): TicketFormModel {
    return {
      title: this.title?.value,
      priority: this.priority?.value,
      description: this.description?.value === null ? undefined : this.description?.value,
    };
  }
}
