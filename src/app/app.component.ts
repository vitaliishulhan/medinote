import { Component, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { Auth, User, user } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { IAppState } from '@/app/store/app-state.model';
import { FirebaseService } from './services/firebase/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'medinote';

  private auth: Auth = inject(Auth);
  user$ = user(this.auth);
  user: User | null | undefined;
  userSubscription: Subscription;

  constructor(private store: Store<IAppState>, private firebaseService: FirebaseService) {
    this.userSubscription = this.user$.subscribe((user: User | null) => {
      this.user = user;
      if(user) {
          this.firebaseService.getMedicines();         
      }
    });
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
