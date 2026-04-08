import { Injectable } from '@angular/core';
import { Data } from '../../../shared/models/jsonapi.model';
import { ProjectModelRemote } from '../models/remote.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectStoreService {
  currentProject?: Data<ProjectModelRemote>;

  constructor() {}
}
