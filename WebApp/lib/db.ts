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

        console.log('Document writtten with ID: ');
    } catch (e) {
        console.error('Error adding user: ', e);
    }
}

export async function createVehicle(vehicle: IVehicle) {
    try {
        vehicle.id = uuid();

        await setDoc(doc(db, 'vehicles', vehicle.id), vehicle, { merge: true });

        console.log('Vehicle writtten with ID: ' + vehicle.id);
    } catch (e) {
        console.error('Error adding user: ', e);
    }
}

export async function updateVehicle(vehicle: IVehicle) {
    try {
        const docRef = doc(db, 'vehicles', vehicle.id);
        await setDoc(docRef, vehicle, { merge: true });

        console.log('Vehicle updated with ID: ' + vehicle.id);
    } catch (e) {
        console.error('Error adding user: ', e);
    }
}

export async function getVehiclesForUser(userId: string): Promise<IVehicle[]> {
    const vehiclesWithUserIdQuery = query(collection(db, 'vehicles'), where('userId', '==', userId));
    const querySnapshot = await getDocs(vehiclesWithUserIdQuery);

    const vehiclesOfUser: IVehicle[] = [];

    querySnapshot.forEach((doc) => {
        const vehicle: IVehicle = doc.data() as unknown as IVehicle;
        //const vehicle: IVehicle = { ...doc.data };
        console.log('found vehicle with id: ' + vehicle.id);
        vehiclesOfUser.push(vehicle);
    });

    return vehiclesOfUser;
}

export async function deleteVehicle(vehicleId: string): Promise<void> {
    console.log('delete vehicle with id: ' + vehicleId);
    return await deleteDoc(doc(db, 'vehicles', vehicleId));
}
