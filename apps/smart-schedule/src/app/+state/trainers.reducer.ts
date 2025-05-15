import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as TrainersActions from './trainers.actions';
import { TrainersEntity } from './trainers.models';

export const TRAINERS_FEATURE_KEY = 'trainers';

export interface TrainersState extends EntityState<TrainersEntity> {
  selectedId?: string | number; // which Trainers record has been selected
  loaded: boolean; // has the Trainers list been loaded
  error?: string | null; // last known error (if any)
}

export interface TrainersPartialState {
  readonly [TRAINERS_FEATURE_KEY]: TrainersState;
}

export const trainersAdapter: EntityAdapter<TrainersEntity> =
  createEntityAdapter<TrainersEntity>();

export const initialTrainersState: TrainersState =
  trainersAdapter.getInitialState({
    // set initial required properties
    loaded: false,
  });

const reducer = createReducer(
  initialTrainersState,
  on(TrainersActions.initTrainers, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(TrainersActions.loadTrainersSuccess, (state, { trainers }) =>
    trainersAdapter.setAll(trainers, { ...state, loaded: true })
  ),
  on(TrainersActions.loadTrainersFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);

export function trainersReducer(
  state: TrainersState | undefined,
  action: Action
) {
  return reducer(state, action);
}
