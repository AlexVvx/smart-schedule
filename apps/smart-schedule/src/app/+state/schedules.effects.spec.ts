import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';

import * as SchedulesActions from './schedules.actions';
import { SchedulesEffects } from './schedules.effects';

describe('SchedulesEffects', () => {
  let actions: Observable<Action>;
  let effects: SchedulesEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        SchedulesEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(SchedulesEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: SchedulesActions.initSchedules() });

      const expected = hot('-a-|', {
        a: SchedulesActions.loadSchedulesSuccess({ schedules: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
