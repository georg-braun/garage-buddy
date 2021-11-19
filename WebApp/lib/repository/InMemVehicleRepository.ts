import { v4 as uuid } from 'uuid';

import IPattern from '@/lib/vehicle/IPattern';
import IVehicle from '@/lib/vehicle/IVehicle';
import { PatternBuilder, VehicleBuilder } from '../vehicleBuilder';
import IVehicleRepository from './IVehicleRepository';
class InMemVehicleRepository implements IVehicleRepository {
    vehicles: IVehicle[] = [];

    constructor() {
        const firstVehicle = new VehicleBuilder()
            .withName('Opel')
            .withKilometer(4000)
            .withPattern(
                new PatternBuilder().withName('Luftfilter').withKilometerInterval(5000).withTimeInterval(365).build(),
            )
            .build();
        const secondVehicle = new VehicleBuilder()
            .withName('Audi')
            .withKilometer(8000)
            .withPattern(
                new PatternBuilder().withName('Luftfilter').withKilometerInterval(10000).withTimeInterval(365).build(),
            )
            .withPattern(
                new PatternBuilder().withName('Ölwechsel').withKilometerInterval(5000).withTimeInterval(365).build(),
            )
            .build();
        this.vehicles.push(firstVehicle);
        this.vehicles.push(secondVehicle);
    }

    updateVehicleAsync(vehicle: IVehicle): Promise<void> {
        return Promise.resolve();
    }
    deleteVehicleAsync(vehicleId: string): Promise<void> {
        const index = this.vehicles.findIndex((_) => _.id === vehicleId);
        this.vehicles.splice(index, 1);
        return Promise.resolve();
    }

    getVehiclesForUserAsync(userId: string): Promise<IVehicle[]> {
        // ignore user id for local development
        return Promise.resolve([...this.vehicles]);
    }

    createVehicleAsync(vehicle: IVehicle): Promise<void> {
        if (vehicle.id == '0') vehicle.id = uuid();
        this.vehicles.push(vehicle);
        return Promise.resolve();
    }
}

export default new InMemVehicleRepository();
