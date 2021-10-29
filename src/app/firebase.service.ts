import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class FirebaseService {
    collectionName = 'Zeus'
    constructor(
        private firestore: AngularFirestore,
        private angularFire: AngularFireAuth,
    ) { }

    /**
     * *---------------> FIREBASE USUÁRIOS <---------------------
     */

    updateEmail(youEmail: any, password: any, newEmail: any) {
        this.angularFire.signInWithEmailAndPassword(youEmail, password)
            .then(function (userCredential) {
                userCredential.user.updateEmail(newEmail)
            })
    }

    updateSenha(youEmail: any, password: any, newPassword: any) {
        this.angularFire.signInWithEmailAndPassword(youEmail, password)
            .then(function (userCredential) {
                userCredential.user.updatePassword(newPassword)
            })
    }

}

