import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnComponent } from './column.component';
import { ColumnModel } from '../../../models/board.model';

describe('ColumnComponent', () => {
  let component: ColumnComponent;
  let fixture: ComponentFixture<ColumnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColumnComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ColumnComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render cards and title', () => {
    const column: ColumnModel = {
      title: 'IN PROGRESS',
      cards: [
        { title: 'Task 1', description: 'Desc 1', tags: [] },
        { title: 'Task 2', description: 'Desc 2', tags: [] },
      ],
    };

    fixture.componentRef.setInput('column', column);
    fixture.detectChanges();

    const cards = fixture.nativeElement.querySelectorAll('cp-card');
    expect(cards.length).toBe(2);
    expect(fixture.nativeElement.textContent).toContain('IN PROGRESS');
  });
});
