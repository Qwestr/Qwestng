import { Injectable } from '@angular/core';
import {
  AngularFirestoreDocument,
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { config } from './app.config';
import { Qwest } from './app.model';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  qwests: AngularFirestoreCollection<Qwest>;
  private qwestDoc: AngularFirestoreDocument<Qwest>;

  constructor(private db: AngularFirestore) {
    // Get the qwests collection
    this.qwests = db.collection<Qwest>(config.collection_endpoint);
  }

  getQwests() {
    // return this.qwests.valueChanges();
    return this.qwests.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Qwest;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  addQwest(qwest) {
    // Add the new qwest to the collection
    this.qwests.add(qwest);
  }

  updateQwest(id, update) {
    // Get the qwest document
    this.qwestDoc = this.db.doc<Qwest>(`${config.collection_endpoint}/${id}`);
    // Update the qwest
    this.qwestDoc.update(update);
  }

  deleteQwest(id) {
    // Get the qwest document
    this.qwestDoc = this.db.doc<Qwest>(`${config.collection_endpoint}/${id}`);
    // Delete the qwest
    this.qwestDoc.delete();
  }
}
