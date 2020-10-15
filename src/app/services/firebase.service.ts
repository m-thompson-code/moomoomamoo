import { Injectable } from '@angular/core';
// import { environment } from '@environment';

// import { environment } from '@environment';

import * as firebase from 'firebase/app';

import 'firebase/analytics';
import 'firebase/auth';
// import 'firebase/database';
import 'firebase/firestore';
import 'firebase/storage';
// import 'firebase/messaging';
// import 'firebase/functions';

@Injectable({
    providedIn: 'root',
})
export class FirebaseService {

    constructor() {
        // Initialize Firebase web SDK
        firebase.initializeApp({
            apiKey: "AIzaSyCWoe-bsWJfE4gu9S5YdFrZ8196wQsjBN8",
            authDomain: "moomoomamoocow.firebaseapp.com",
            databaseURL: "https://moomoomamoocow.firebaseio.com",
            projectId: "moomoomamoocow",
            storageBucket: "moomoomamoocow.appspot.com",
            messagingSenderId: "1086902309889",
            appId: "1:1086902309889:web:c9c0dff64c31ba128d1c00",
            measurementId: "G-T9F47GHZ6C"
        });

        firebase.analytics();
    }

    public firebaseIsValid(): boolean {
        if (!firebase.auth || !firebase.firestore || !firebase.storage || !firebase.analytics) {
            return false;
        }
        
        return true;
    }
}
