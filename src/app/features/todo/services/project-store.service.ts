import { Injectable } from '@angular/core';
import { Data } from '../../../shared/models/jsonapi.model';
import { ProjectModelRemote } from '../models/remote.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectStoreService {
  private _currentProjectId?: string;

  constructor() {}

  setCurrentProject(id: string): void {
    this._currentProjectId = id;
  }

  get currentProjectId(): string | undefined {
    return this._currentProjectId;
  }
}
