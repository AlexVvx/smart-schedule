import { createAction, props } from '@ngrx/store';

export const loadSchedules = createAction('[Schedules Page] Load');

export const loadSchedulesSuccess = createAction(
  '[Schedules/API] Load Schedules Success',
  props<{ schedules: any[] }>()
);

export const loadSchedulesFailure = createAction(
  '[Schedules/API] Load Schedules Failure',
  props<{ error: any }>()
);
