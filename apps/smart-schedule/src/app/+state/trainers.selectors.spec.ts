import { TrainersEntity } from './trainers.models';
import {
  trainersAdapter,
  TrainersPartialState,
  initialTrainersState,
} from './trainers.reducer';
import * as TrainersSelectors from './trainers.selectors';

describe('Trainers Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getTrainersId = (it: TrainersEntity) => it.id;
  const createTrainersEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as TrainersEntity);

  let state: TrainersPartialState;

  beforeEach(() => {
    state = {
      trainers: trainersAdapter.setAll(
        [
          createTrainersEntity('PRODUCT-AAA'),
          createTrainersEntity('PRODUCT-BBB'),
          createTrainersEntity('PRODUCT-CCC'),
        ],
        {
          ...initialTrainersState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Trainers Selectors', () => {
    it('selectAllTrainers() should return the list of Trainers', () => {
      const results = TrainersSelectors.selectAllTrainers(state);
      const selId = getTrainersId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = TrainersSelectors.selectEntity(state) as TrainersEntity;
      const selId = getTrainersId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectTrainersLoaded() should return the current "loaded" status', () => {
      const result = TrainersSelectors.selectTrainersLoaded(state);

      expect(result).toBe(true);
    });

    it('selectTrainersError() should return the current "error" state', () => {
      const result = TrainersSelectors.selectTrainersError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
