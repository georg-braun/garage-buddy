import { getFirestore, collection, doc, setDoc, query, where, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';

import IVehicle from '@/lib/vehicle/IVehicle';
import firebaseApp from './firebase';

const db = getFirestore(firebaseApp);

export async function createUser(uid, data) {
    try {
        await setDoc(
            doc(db, 'users', uid),
            {
                uid,
                ...data,
            },
            { merge: true },
        );

        console.log('user writtten with ID: ' + uid);
    } catch (e) {
        console.error('Error adding user: ', e);
    }
}
