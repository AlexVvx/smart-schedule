import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SCHEDULES_FEATURE_KEY,
  SchedulesState,
  schedulesAdapter,
} from './schedules.reducer';

// Lookup the 'Schedules' feature state managed by NgRx
export const selectSchedulesState = createFeatureSelector<SchedulesState>(
  SCHEDULES_FEATURE_KEY
);

export const selectSchedulesLoaded = createSelector(
  selectSchedulesState,
  (state: SchedulesState) => state.loaded
);

export const selectSchedulesError = createSelector(
  selectSchedulesState,
  (state: SchedulesState) => state.error
);

export const selectAllSchedules = createSelector(
  selectSchedulesState,
  (state: SchedulesState) => state.schedules
);

export const selectEvents = createSelector(
  selectSchedulesState,
  (state: SchedulesState) => state.schedules
);
