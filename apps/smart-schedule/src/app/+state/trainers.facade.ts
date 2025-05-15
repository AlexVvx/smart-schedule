import { Injectable, inject } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';

import * as TrainersActions from './trainers.actions';
import * as TrainersFeature from './trainers.reducer';
import * as TrainersSelectors from './trainers.selectors';

@Injectable()
export class TrainersFacade {
  private readonly store = inject(Store);

  /**
   * Combine pieces of state using createSelector,
   * and expose them as observables through the facade.
   */
  loaded$ = this.store.pipe(select(TrainersSelectors.selectTrainersLoaded));
  allTrainers$ = this.store.pipe(select(TrainersSelectors.selectAllTrainers));
  selectedTrainers$ = this.store.pipe(select(TrainersSelectors.selectEntity));

  /**
   * Use the initialization action to perform one
   * or more tasks in your Effects.
   */
  init() {
    this.store.dispatch(TrainersActions.initTrainers());
  }
}
