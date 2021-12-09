import {
    getFirestore,
    collection,
    doc,
    setDoc,
    query,
    where,
    getDocs,
    deleteDoc,
    updateDoc,
    arrayUnion,
    arrayRemove,
} from 'firebase/firestore';
import { v4 as uuid } from 'uuid';
import firebaseApp from '@/lib/infrastructure/firebase';

import IVehicle from '@/lib/domain/IVehicle';
import IVehicleRepository from '../application/IVehicleRepository';
import IPattern from '../domain/IPattern';
import IPerformedMaintenance from '../domain/IPerformedMaintenance';

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

        // convert the firestore timestamps to javascript dates
        vehiclesOfUser.forEach((vehicle) => {
            vehicle.performedMaintenances.forEach((maintenance) => (maintenance.date = maintenance.date.toDate()));
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

    async addMaintenanceAsync(vehicleId: string, performedMaintenance: IPerformedMaintenance): Promise<void> {
        try {
            performedMaintenance.id = uuid();
            const docRef = doc(this.db, 'vehicles', vehicleId);
            await updateDoc(docRef, {
                performedMaintenances: arrayUnion(performedMaintenance),
            });
        } catch (e) {}
    }

    async deleteMaintenanceAsync(vehicleId: string, maintenance: IPerformedMaintenance): Promise<void> {
        try {
            const docRef = doc(this.db, 'vehicles', vehicleId);
            await updateDoc(docRef, {
                performedMaintenances: arrayRemove(maintenance),
            });
        } catch (e) {}
    }

    async addPatternAsync(vehicleId: string, pattern: IPattern): Promise<void> {
        try {
            pattern.id = uuid();
            const docRef = doc(this.db, 'vehicles', vehicleId);
            await updateDoc(docRef, {
                patterns: arrayUnion(pattern),
            });
        } catch (e) {}
    }
    async updatePatternAsync(vehicle: IVehicle, pattern: IPattern): Promise<void> {
        try {
            // replace pattern in vehicle object
            const vehicleCopy = { ...vehicle };
            const updatedPatternCopy = { ...pattern };
            const existingPatternIndex = vehicle.patterns.findIndex((_) => _.id === pattern.id);

            vehicleCopy.patterns.splice(existingPatternIndex, 1, updatedPatternCopy);
            // and update the whole vehicle
            this.updateVehicleAsync(vehicleCopy);
        } catch (e) {
            console.error('Error: ', e);
        }
    }

    async deletePatternAsync(vehicleId: string, pattern: IPattern): Promise<void> {
        try {
            const docRef = doc(this.db, 'vehicles', vehicleId);
            await updateDoc(docRef, {
                patterns: arrayRemove(pattern),
            });
        } catch (e) {}
    }
}

export default new FirebaseVehicleRepository();
