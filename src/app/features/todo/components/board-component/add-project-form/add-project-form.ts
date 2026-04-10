import { Component, EventEmitter, Output } from '@angular/core';
import { ProjectFormModel } from '../../../models/board.model';
import { CreateProjectFormGroup } from '../../../forms/create-project.form';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'cp-add-project-form',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './add-project-form.html',
  styleUrl: './add-project-form.scss',
})
export class AddProjectForm {
  form: CreateProjectFormGroup = new CreateProjectFormGroup();
  @Output() addProjectRequest: EventEmitter<ProjectFormModel> = new EventEmitter();

  onSubmit(): void {
    this.addProjectRequest.emit(this.form.getValue());
  }
}
