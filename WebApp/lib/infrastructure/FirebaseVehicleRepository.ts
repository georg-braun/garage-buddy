import { getFirestore, collection, doc, setDoc, query, where, getDocs, deleteDoc, updateDoc } from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import firebaseApp from '@/lib/infrastructure/firebase';

import IVehicle from '@/lib/domain/IVehicle';
import IVehicleRepository from '../application/IVehicleRepository';

class FirebaseVehicleRepository implements IVehicleRepository {
    db = getFirestore(firebaseApp);

    async getVehiclesForUserAsync(userId: string): Promise<IVehicle[]> {
        const vehiclesWithUserIdQuery = query(collection(this.db, 'vehicles'), where('userId', '==', userId));
        const querySnapshot = await getDocs(vehiclesWithUserIdQuery);

        const vehiclesOfUser: IVehicle[] = [];

        querySnapshot.forEach((doc) => {
            const vehicle: IVehicle = doc.data() as unknown as IVehicle;

            console.log('found vehicle with id: ' + vehicle.id);
            vehiclesOfUser.push(vehicle);
        });

        return vehiclesOfUser;
    }

    async createVehicleAsync(vehicle: IVehicle) {
        try {
            vehicle.id = uuid();

            await setDoc(doc(this.db, 'vehicles', vehicle.id), vehicle, { merge: true });

            console.log('Vehicle writtten with ID: ' + vehicle.id);
        } catch (e) {
            console.error('Error adding user: ', e);
        }
    }

    async updateVehicleAsync(vehicle: IVehicle) {
        try {
            const docRef = doc(this.db, 'vehicles', vehicle.id);
            await setDoc(docRef, vehicle, { merge: true });

            console.log('Vehicle updated with ID: ' + vehicle.id);
        } catch (e) {
            console.error('Error adding user: ', e);
        }
    }

    async deleteVehicleAsync(vehicleId: string): Promise<void> {
        console.log('delete vehicle with id: ' + vehicleId);
        return await deleteDoc(doc(this.db, 'vehicles', vehicleId));
    }
}

export default new FirebaseVehicleRepository();
