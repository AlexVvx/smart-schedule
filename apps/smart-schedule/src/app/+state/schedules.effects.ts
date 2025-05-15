import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as SchedulesActions from './schedules.actions';

@Injectable()
export class SchedulesEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SchedulesActions.loadSchedules),
      switchMap(() =>
        of(
          SchedulesActions.loadSchedulesSuccess({
            schedules: [
              { title: 'event 1', date: '2025-05-01' },
              { title: 'event 2', date: '2025-05-02' },
            ],
          })
        )
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(SchedulesActions.loadSchedulesFailure({ error }));
      })
    )
  );
}
