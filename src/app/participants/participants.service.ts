import { Injectable } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {AngularFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {

  constructor(private authService: AuthService, private firestore: AngularFirestore) { }

  async getParticipants(): Promise<{}[]> {
    await this.authService.forceLogin();
    let participantsDoc;
    if (["editor", "viewer"].includes(this.authService.getRole())) {
      participantsDoc = await this.firestore.firestore.collection('participants')
        .where('entity', '==', this.authService.getEntity());
    } else participantsDoc = await this.firestore.firestore.collection('participants')

    let result: {}[] = []
    const querySnapshot = await participantsDoc.get();
    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    })
    return result;
  }
}