import { NgModule, isDevMode } from '@angular/core';
import { NgIf } from '@angular/common';
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
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { LoginPage } from '@components/login-page/login-page.component';
import { FirebaseService } from './services/firebase/firebase.service';


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
    StoreModule.forRoot<IAppState>({
      search: searchReducer,
      medicine: medicineReducer,
      // user: userReducer,
    }),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent],
})
export class AppModule {}
