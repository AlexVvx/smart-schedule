import { Injectable, inject } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { switchMap, catchError, of } from 'rxjs';
import * as TrainersActions from './trainers.actions';
import * as TrainersFeature from './trainers.reducer';

@Injectable()
export class TrainersEffects {
  private actions$ = inject(Actions);

  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TrainersActions.loadTrainers),
      switchMap(() =>
        of(TrainersActions.loadTrainersSuccess({ trainers: [] }))
      ),
      catchError((error) => {
        console.error('Error', error);
        return of(TrainersActions.loadTrainersFailure({ error }));
      })
    )
  );
}
