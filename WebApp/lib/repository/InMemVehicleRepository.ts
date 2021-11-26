import { v4 as uuid } from 'uuid';

import IPattern from '@/lib/vehicle/IPattern';
import IVehicle from '@/lib/vehicle/IVehicle';
import { PatternBuilder, VehicleBuilder, PerformedMaintenanceBuilder } from '../vehicleBuilder';
import IVehicleRepository from './IVehicleRepository';
import IPerformedMaintenance from '../vehicle/IPerformedMaintenance';
class InMemVehicleRepository implements IVehicleRepository {
    vehicles: IVehicle[] = [];

    constructor() {
        const firstVehicle = new VehicleBuilder()
            .withName('Opel')
            .withKilometer(4000)
            .withPattern(
                new PatternBuilder()
                    .withPatternId('0')
                    .withName('Luftfilter')
                    .withKilometerInterval(5000)
                    .withTimeInterval(365)
                    .build(),
            )
            .build();
        const secondVehicle = new VehicleBuilder()
            .withName('Audi')
            .withKilometer(8000)
            .withPattern(
                new PatternBuilder()
                    .withPatternId('0')
                    .withName('Luftfilter')
                    .withKilometerInterval(10000)
                    .withTimeInterval(365)
                    .build(),
            )
            .withPattern(
                new PatternBuilder()
                    .withPatternId('1')
                    .withName('Ölwechsel')
                    .withKilometerInterval(5000)
                    .withTimeInterval(365)
                    .build(),
            )
            .withPerformedMaintenances(
                new PerformedMaintenanceBuilder().withPatternId('0').withKilometer(5000).withDate('2021-11-25').build(),
            )
            .build();
        this.vehicles.push(firstVehicle);
        this.vehicles.push(secondVehicle);
    }

    updateVehicleAsync(vehicle: IVehicle): Promise<void> {
        const index = this.vehicles.findIndex((_) => _.id === vehicle.id);
        this.vehicles.splice(index, 1, vehicle);
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

    getVehicle(vehicleId: string): IVehicle {
        return { ...this.vehicles.find((_) => _.id === vehicleId) };
    }

    addMaintenance(vehicleId: string, performedMaintenance: IPerformedMaintenance) {
        const vehicle = this.getVehicle(vehicleId);
        const maintenance = { ...performedMaintenance };
        maintenance.id = uuid();
        vehicle.performedMaintenances.push(maintenance);
    }
}

export default new InMemVehicleRepository();
