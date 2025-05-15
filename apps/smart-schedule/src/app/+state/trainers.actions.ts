import { createAction, props } from '@ngrx/store';
import { TrainersEntity } from './trainers.models';

export const loadTrainers = createAction('[Trainers Page] Load');

export const loadTrainersSuccess = createAction(
  '[Trainers/API] Load Trainers Success',
  props<{ trainers: TrainersEntity[] }>()
);

export const loadTrainersFailure = createAction(
  '[Trainers/API] Load Trainers Failure',
  props<{ error: any }>()
);
