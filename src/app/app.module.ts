import { NgModule, isDevMode } from '@angular/core';
import { NgIf } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { initializeApp, provideFirebaseApp, getApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import {
  FirestoreModule,
  provideFirestore,
  initializeFirestore,
  persistentLocalCache,
} from '@angular/fire/firestore';
import { LoginPage } from './components/login-page/login-page.component';
import { HeaderComponent } from './components/header/header.component';
import { MedicinesTableComponent } from './components/medicines-table/medicines-table.component';
import type { IAppState } from './store/app-state.model';
import { search } from './store/reducers/seach.reducer';
import { medinotes } from './store/reducers/medicine.reducer';
import { FirebaseService } from './services/firebase/firebase.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';

const reducers: ActionReducerMap<IAppState> = { search, medinotes };

@NgModule({
  declarations: [AppComponent],
  imports: [
    LoginPage,
    NgIf,
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
    StoreModule.forRoot<IAppState>(reducers),
    FirestoreModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() =>
      initializeFirestore(getApp(), {
        localCache: persistentLocalCache(),
      })
    ),
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
