import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CardInModel } from '../models/board.model';

export class CreateFormGroup extends FormGroup {
  constructor() {
    super({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });
  }

  get title() {
    return this.get('title');
  }
  get description() {
    return this.get('description');
  }

  getValue(): CardInModel {
    return {
      title: this.title?.value,
      description: this.description?.value,
      tags: [],
    };
  }
}
