import { getFirestore, doc, setDoc } from 'firebase/firestore';
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
