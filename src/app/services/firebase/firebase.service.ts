import { Injectable, OnDestroy, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import {
  Firestore,
  getDocs,
  getDocsFromCache,
  setDoc,
  deleteDoc,
  updateDoc,
  doc,
  collection,
  onSnapshot,
} from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { IAppState } from '@/app/store/app-state.model';
import {
  loadMedicines,
  addMedicine,
  updateMedicine,
  deleteMedicine,
} from '@/app/store/actions/medicine.actions';
import type { Medicine } from '@app-types';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService implements OnDestroy {
  private fireStore: Firestore = inject(Firestore);
  private auth: Auth = inject(Auth);

  constructor(private store: Store<IAppState>) {}

  async getMedicines() {
    const medinotesCollection = collection(
      this.fireStore,
      'medinotes',
      this.auth.currentUser!.uid,
      'data'
    );

    onSnapshot(medinotesCollection, {}, (snapshot) => {
      for (const change of snapshot.docChanges()) {
        if (change.type === 'added') {
          this.store.dispatch(
            addMedicine({ medinote: change.doc.data() as Medicine })
          );
        }

        if (change.type === 'modified') {
          this.store.dispatch(
            updateMedicine({ medinote: change.doc.data() as Medicine })
          );
        }

        if (change.type === 'removed') {
          this.store.dispatch(
            deleteMedicine({ id: (change.doc.data() as Medicine).id })
          );
        }
      }
    });

    try {
      const medinotes = (await getDocsFromCache(medinotesCollection)).docs.map(
        (d) => d.data() as Medicine
      );

      if (!medinotes.length) {
        throw new Error('result is empty. Trying to get from server');
      }

      this.store.dispatch(loadMedicines({ medinotes }));
    } catch (e) {
      console.error(
        '[FirebaseService -> getMedicines] fetching from cache is failed.\nError:',
        e
      );

      const medinotes = await getDocs(medinotesCollection);

      this.store.dispatch(
        loadMedicines({
          medinotes: medinotes.docs.map((d) => d.data() as Medicine),
        })
      );
    }
  }

  async addMedicine(m: Omit<Medicine, 'id'>) {
    const medinotesDataCollectionRef = collection(
      this.fireStore,
      'medinotes',
      this.auth.currentUser!.uid,
      'data'
    );

    const newDocId = doc(medinotesDataCollectionRef).id;

    const newMedinote: Medicine = {
      id: newDocId,
      ...m,
    };

    await setDoc(
      doc(
        this.fireStore,
        'medinotes',
        this.auth.currentUser!.uid,
        'data',
        newDocId
      ),
      newMedinote
    );
  }

  async updateMedicine(m: Medicine) {
    const { id: _, ...updatedData } = m;

    await updateDoc(
      doc(
        this.fireStore,
        'medinotes',
        this.auth.currentUser!.uid,
        'data',
        m.id
      ),
      updatedData
    );
  }

  async deleteMedicine(id: string) {
    await deleteDoc(
      doc(this.fireStore, 'medinotes', this.auth.currentUser!.uid, 'data', id)
    );
  }

  async logIn(email: string, password: string) {
    await signInWithEmailAndPassword(this.auth, email, password);
  }

  ngOnDestroy(): void {}
}
