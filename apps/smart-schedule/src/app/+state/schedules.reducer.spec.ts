import { Action } from '@ngrx/store';

import * as SchedulesActions from './schedules.actions';
import { SchedulesEntity } from './schedules.models';
import {
  SchedulesState,
  initialSchedulesState,
  schedulesReducer,
} from './schedules.reducer';

describe('Schedules Reducer', () => {
  const createSchedulesEntity = (id: string, name = ''): SchedulesEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Schedules actions', () => {
    it('loadSchedulesSuccess should return the list of known Schedules', () => {
      const schedules = [
        createSchedulesEntity('PRODUCT-AAA'),
        createSchedulesEntity('PRODUCT-zzz'),
      ];
      const action = SchedulesActions.loadSchedulesSuccess({ schedules });

      const result: SchedulesState = schedulesReducer(
        initialSchedulesState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = schedulesReducer(initialSchedulesState, action);

      expect(result).toBe(initialSchedulesState);
    });
  });
});
