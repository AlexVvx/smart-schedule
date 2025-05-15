import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as SchedulesActions from './schedules.actions';
import { SchedulesEffects } from './schedules.effects';
import { SchedulesFacade } from './schedules.facade';
import { SchedulesEntity } from './schedules.models';
import {
  SCHEDULES_FEATURE_KEY,
  SchedulesState,
  initialSchedulesState,
  schedulesReducer,
} from './schedules.reducer';
import * as SchedulesSelectors from './schedules.selectors';

interface TestSchema {
  schedules: SchedulesState;
}

describe('SchedulesFacade', () => {
  let facade: SchedulesFacade;
  let store: Store<TestSchema>;
  const createSchedulesEntity = (id: string, name = ''): SchedulesEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(SCHEDULES_FEATURE_KEY, schedulesReducer),
          EffectsModule.forFeature([SchedulesEffects]),
        ],
        providers: [SchedulesFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(SchedulesFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allSchedules$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allSchedules$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadSchedulesSuccess` to manually update list
     */
    it('allSchedules$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allSchedules$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        SchedulesActions.loadSchedulesSuccess({
          schedules: [
            createSchedulesEntity('AAA'),
            createSchedulesEntity('BBB'),
          ],
        })
      );

      list = await readFirst(facade.allSchedules$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
