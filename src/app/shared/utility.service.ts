import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  private currentStoryPoint: Subject<number> = new Subject<number>();

  constructor() {}

  getStoryPoint() {
    return this.currentStoryPoint.asObservable();
  }
  setStoryPoint(storyPoint: number) {
    this.currentStoryPoint.next(storyPoint);
  }
}
