import { Component, inject, OnInit } from '@angular/core';
import { BoardComponent } from '../../components/board-component/board.component';
import { TicketFormModel } from '../../models/board.model';
import { TodoService } from '../../services/todo.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-board-page',
  imports: [BoardComponent, FormsModule],
  templateUrl: './board-page.html',
  styleUrl: './board-page.scss',
  standalone: true,
})
export class BoardPage implements OnInit {
  private readonly todoService = inject(TodoService);
  boardSignal = toSignal(this.todoService.boardV2$);
  projectsSignal = this.todoService.projectsSignal;

  selectedProject = '';

  onProjectChange() {
    if (this.selectedProject.trim() === '') {
      return;
    }
    this.todoService.changeProject(this.selectedProject);
  }

  ngOnInit(): void {
    this.todoService.fetchProjects();
    this.todoService.fetchBoardV2();
  }

  onCardChange(idsColumnAndTiclet: [string, string]): void {
    const [ticketId, columnId] = idsColumnAndTiclet;
    this.todoService.changeColumnTicket(ticketId, columnId);
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
    this.todoService.addTask({
      title: task.title,
      columnId: col.id,
      priority: task.priority,
      description: task.description,
    });
  }

  onDeleteTicket(id: string): void {
    this.todoService.deleteOneTicket(id);
  }
}
