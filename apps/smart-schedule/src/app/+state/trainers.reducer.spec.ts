import { Action } from '@ngrx/store';

import * as TrainersActions from './trainers.actions';
import { TrainersEntity } from './trainers.models';
import {
  TrainersState,
  initialTrainersState,
  trainersReducer,
} from './trainers.reducer';

describe('Trainers Reducer', () => {
  const createTrainersEntity = (id: string, name = ''): TrainersEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Trainers actions', () => {
    it('loadTrainersSuccess should return the list of known Trainers', () => {
      const trainers = [
        createTrainersEntity('PRODUCT-AAA'),
        createTrainersEntity('PRODUCT-zzz'),
      ];
      const action = TrainersActions.loadTrainersSuccess({ trainers });

      const result: TrainersState = trainersReducer(
        initialTrainersState,
        action
      );

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = trainersReducer(initialTrainersState, action);

      expect(result).toBe(initialTrainersState);
    });
  });
});
