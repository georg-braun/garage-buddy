import firebaseApp from './firebase';
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';

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

        console.log('Document writtten with ID: ');
    } catch (e) {
        console.error('Error adding user: ', e);
    }
}
