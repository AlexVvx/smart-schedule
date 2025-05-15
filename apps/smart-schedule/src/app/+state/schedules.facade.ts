import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as SchedulesActions from './schedules.actions';
import * as SchedulesFeature from './schedules.reducer';
import * as SchedulesSelectors from './schedules.selectors';

@Injectable()
export class SchedulesFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(SchedulesSelectors.selectSchedulesLoaded));
  schedules$ = this.store.pipe(
    select(SchedulesSelectors.selectAllSchedules)
  );
  events$ = this.store.pipe(
    select(SchedulesSelectors.selectAllSchedules)
  );

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  load() {
    this.store.dispatch(SchedulesActions.loadSchedules());
  }
}
