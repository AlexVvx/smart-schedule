import { SchedulesEntity } from './schedules.models';
import {
  schedulesAdapter,
  SchedulesPartialState,
  initialSchedulesState,
} from './schedules.reducer';
import * as SchedulesSelectors from './schedules.selectors';

describe('Schedules Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getSchedulesId = (it: SchedulesEntity) => it.id;
  const createSchedulesEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as SchedulesEntity);

  let state: SchedulesPartialState;

  beforeEach(() => {
    state = {
      schedules: schedulesAdapter.setAll(
        [
          createSchedulesEntity('PRODUCT-AAA'),
          createSchedulesEntity('PRODUCT-BBB'),
          createSchedulesEntity('PRODUCT-CCC'),
        ],
        {
          ...initialSchedulesState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Schedules Selectors', () => {
    it('selectAllSchedules() should return the list of Schedules', () => {
      const results = SchedulesSelectors.selectAllSchedules(state);
      const selId = getSchedulesId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectEntity() should return the selected Entity', () => {
      const result = SchedulesSelectors.selectEntity(state) as SchedulesEntity;
      const selId = getSchedulesId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('selectSchedulesLoaded() should return the current "loaded" status', () => {
      const result = SchedulesSelectors.selectSchedulesLoaded(state);

      expect(result).toBe(true);
    });

    it('selectSchedulesError() should return the current "error" state', () => {
      const result = SchedulesSelectors.selectSchedulesError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
