import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { readFirst } from '@nx/angular/testing';

import * as TrainersActions from './trainers.actions';
import { TrainersEffects } from './trainers.effects';
import { TrainersFacade } from './trainers.facade';
import { TrainersEntity } from './trainers.models';
import {
  TRAINERS_FEATURE_KEY,
  TrainersState,
  initialTrainersState,
  trainersReducer,
} from './trainers.reducer';
import * as TrainersSelectors from './trainers.selectors';

interface TestSchema {
  trainers: TrainersState;
}

describe('TrainersFacade', () => {
  let facade: TrainersFacade;
  let store: Store<TestSchema>;
  const createTrainersEntity = (id: string, name = ''): TrainersEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(TRAINERS_FEATURE_KEY, trainersReducer),
          EffectsModule.forFeature([TrainersEffects]),
        ],
        providers: [TrainersFacade],
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
      facade = TestBed.inject(TrainersFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allTrainers$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allTrainers$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadTrainersSuccess` to manually update list
     */
    it('allTrainers$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allTrainers$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        TrainersActions.loadTrainersSuccess({
          trainers: [createTrainersEntity('AAA'), createTrainersEntity('BBB')],
        })
      );

      list = await readFirst(facade.allTrainers$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
