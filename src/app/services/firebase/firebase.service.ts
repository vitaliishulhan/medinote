import { Injectable, OnDestroy, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, getDocs, setDoc, doc, collection} from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { IAppState } from '@/app/store/app-state.model';
import { loadMedicines } from '@/app/store/actions/medicine.actions';
import type { Medicine } from '@app-types';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService implements OnDestroy {
  private fireStore: Firestore = inject(Firestore);
  private auth: Auth = inject(Auth);

  constructor(private store: Store<IAppState>) {
  }

  async getMedicines() {
    const medinotes = await getDocs(collection(this.fireStore, 'medinotes', this.auth.currentUser!.uid, 'data'));

    this.store.dispatch(
      loadMedicines({
        medinotes: medinotes.docs
          .map((d) => d.data() as Medicine)
      })
    );
  }

  async addMedicine(m: Omit<Medicine, 'id'>) {
    const medinotesDataCollectionRef = collection(this.fireStore, 'medinotes', this.auth.currentUser!.uid, 'data');
    const newDocId = doc(medinotesDataCollectionRef).id;
    await setDoc(doc(this.fireStore, 'medinotes', this.auth.currentUser!.uid, 'data', newDocId), {
      ...m,
      id: newDocId
    });
  }

  async logIn(email: string, password: string) {
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  ngOnDestroy(): void {}
}
