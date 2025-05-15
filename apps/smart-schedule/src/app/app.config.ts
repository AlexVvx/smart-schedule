import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideStore, provideState } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import * as fromSchedules from './+state/schedules.reducer';
import { SchedulesEffects } from './+state/schedules.effects';
import { SchedulesFacade } from './+state/schedules.facade';
import * as fromTrainers from './+state/trainers.reducer';
import { TrainersEffects } from './+state/trainers.effects';
import { TrainersFacade } from './+state/trainers.facade';

export const appConfig: ApplicationConfig = {
  providers: [
    provideEffects(TrainersEffects),
    provideState(
      fromTrainers.TRAINERS_FEATURE_KEY,
      fromTrainers.trainersReducer
    ),
    TrainersFacade,
    provideEffects(SchedulesEffects),
    provideState(
      fromSchedules.SCHEDULES_FEATURE_KEY,
      fromSchedules.schedulesReducer
    ),
    SchedulesFacade,
    provideStore(),
    provideEffects(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
  ],
};
