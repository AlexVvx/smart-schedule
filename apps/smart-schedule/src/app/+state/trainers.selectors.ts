import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  TRAINERS_FEATURE_KEY,
  TrainersState,
  trainersAdapter,
} from './trainers.reducer';

// Lookup the 'Trainers' feature state managed by NgRx
export const selectTrainersState =
  createFeatureSelector<TrainersState>(TRAINERS_FEATURE_KEY);

const { selectAll, selectEntities } = trainersAdapter.getSelectors();

export const selectTrainersLoaded = createSelector(
  selectTrainersState,
  (state: TrainersState) => state.loaded
);

export const selectTrainersError = createSelector(
  selectTrainersState,
  (state: TrainersState) => state.error
);

export const selectAllTrainers = createSelector(
  selectTrainersState,
  (state: TrainersState) => selectAll(state)
);

export const selectTrainersEntities = createSelector(
  selectTrainersState,
  (state: TrainersState) => selectEntities(state)
);

export const selectSelectedId = createSelector(
  selectTrainersState,
  (state: TrainersState) => state.selectedId
);

export const selectEntity = createSelector(
  selectTrainersEntities,
  selectSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
