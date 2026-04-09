import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ColumnFormModel } from '../../../models/board.model';
import { CreateColumnFormGroup } from '../../../forms/create-column.form';

@Component({
  selector: 'cp-add-column-form',
  imports: [ReactiveFormsModule],
  templateUrl: './add-column-form.html',
  styleUrl: './add-column-form.scss',
})
export class AddColumnForm {
  form: CreateColumnFormGroup = new CreateColumnFormGroup();
  @Output() addColumnRequest: EventEmitter<ColumnFormModel> = new EventEmitter();

  onSubmit(): void {
    this.addColumnRequest.emit(this.form.getValue());
  }
}
