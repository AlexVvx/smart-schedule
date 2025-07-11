import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as TrainersActions from './trainers.actions';
import { TrainersEffects } from './trainers.effects';

describe('TrainersEffects', () => {
  let actions: Observable<Action>;
  let effects: TrainersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        TrainersEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(TrainersEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: TrainersActions.initTrainers() });

      const expected = hot('-a-|', {
        a: TrainersActions.loadTrainersSuccess({ trainers: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
