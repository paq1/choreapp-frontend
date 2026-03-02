import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardComponent } from './board.component';
import { BoardModel } from '../../models/board.model';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a column per table', () => {
    const board: BoardModel = {
      tables: [
        { title: 'TODO', cards: [] },
        { title: 'DONE', cards: [] },
      ],
    };

    fixture.componentRef.setInput('board', board);
    fixture.detectChanges();

    const columns = fixture.nativeElement.querySelectorAll('cp-column');
    expect(columns.length).toBe(2);
  });
});
