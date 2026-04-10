import { Component, inject, OnInit } from '@angular/core';
import { BoardComponent } from '../../components/board-component/board.component';
import { ColumnFormModel, ProjectFormModel, TicketFormModel } from '../../models/board.model';
import { TodoService } from '../../services/todo.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { AddProjectForm } from '../../components/board-component/add-project-form/add-project-form';

@Component({
  selector: 'app-board-page',
  imports: [BoardComponent, FormsModule, AddProjectForm],
  templateUrl: './board-page.html',
  styleUrl: './board-page.scss',
  standalone: true,
})
export class BoardPage implements OnInit {
  private readonly todoService = inject(TodoService);
  boardSignal = toSignal(this.todoService.boardV2$);
  projectsSignal = this.todoService.projectsSignal;
  selectedProject = '';
  isOpenNewProjectForm = false;

  onNewProject() {
    this.isOpenNewProjectForm = !this.isOpenNewProjectForm;
  }

  onAddProject(form: ProjectFormModel) {
    this.todoService.addProject(form, this.selectedProject);
    this.isOpenNewProjectForm = false;
  }

  onProjectChange() {
    this.todoService.changeProject(this.selectedProject);
  }

  ngOnInit(): void {
    this.todoService.fetchProjects();
    this.todoService.fetchBoardV2();
  }

  onCardChange(idsColumnAndTiclet: [string, string]): void {
    const [ticketId, columnId] = idsColumnAndTiclet;
    this.todoService.changeColumnTicket(ticketId, columnId, this.selectedProject);
  }

  onMoveTicket(idsColumnAndTiclet: [string, string]): void {
    const [ticketId, direction] = idsColumnAndTiclet;
    switch (direction) {
      case 'RIGHT':
        this.todoService.onRequestMoveRight(ticketId);
        break;
      case 'LEFT':
        this.todoService.onRequestMoveLeft(ticketId);
        break;
      default:
        console.warn('Invalid direction:', direction);
    }
  }

  onAddTicket(task: TicketFormModel): void {
    const col = this.boardSignal()?.columns[0];
    if (!col) return;
    this.todoService.addTask(
      {
        title: task.title,
        columnId: col.id,
        priority: task.priority,
        description: task.description,
        projectId: this.selectedProject === '' ? undefined : this.selectedProject,
      },
      this.selectedProject,
    );
  }

  onAddColumn(column: ColumnFormModel): void {
    this.todoService.addColumn(
      {
        title: column.title,
        description: column.description,
        projectId: this.selectedProject === '' ? undefined : this.selectedProject,
      },
      this.selectedProject,
    );
  }

  onDeleteTicket(id: string): void {
    this.todoService.deleteOneTicket(id, this.selectedProject);
  }
}
