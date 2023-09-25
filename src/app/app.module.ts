import { APP_INITIALIZER, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HeaderComponent } from './components/header/header.component';
import { MedicinesTableComponent } from './components/medicines-table/medicines-table.component';
import { StoreModule } from '@ngrx/store';
import type { IAppState } from './store/app-state.model';
import { searchReducer } from './store/reducers/seach.reducer';
import { medicineReducer } from './store/reducers/medicine.reducer';
import { InitialDataService } from './services/initialData.service';


@NgModule({
  declarations: [AppComponent],
  imports: [
    HeaderComponent,
    MedicinesTableComponent,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    StoreModule.forRoot<IAppState>({
      search: searchReducer,
      medicine: medicineReducer,
    }),
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: (initialDataService: InitialDataService) => () => initialDataService.loadData(),
      deps: [InitialDataService],
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
