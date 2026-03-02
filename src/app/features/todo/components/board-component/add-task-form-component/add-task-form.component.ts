import { Component, EventEmitter, Output } from '@angular/core';
import { CreateFormGroup } from '../../../forms/create.form';
import { ReactiveFormsModule } from '@angular/forms';
import { CardInModel } from '../../../models/board.model';

@Component({
  selector: 'cp-add-task-form',
  imports: [ReactiveFormsModule],
  templateUrl: './add-task-form.component.html',
  styleUrl: './add-task-form.component.scss',
  standalone: true,
})
export class AddTaskFormComponent {
  form: CreateFormGroup = new CreateFormGroup();
  @Output() addTaskRequest: EventEmitter<CardInModel> = new EventEmitter();

  onSubmit(): void {
    console.log('onSubmit', this.form.getValue());
    this.addTaskRequest.emit(this.form.getValue());
  }
}
