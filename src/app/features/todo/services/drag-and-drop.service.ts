import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DragAndDropService {
  currentItem?: string;

  setCurrentItem(id: string): void {
    this.currentItem = id;
  }
}
