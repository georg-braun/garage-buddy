import { v4 as uuid } from 'uuid';

import IPattern from '@/lib/domain/IPattern';
import IVehicle from '@/lib/domain/IVehicle';
import { PatternBuilder, VehicleBuilder, PerformedMaintenanceBuilder } from '../application/builder/vehicleBuilder';
import IVehicleRepository from '../application/IVehicleRepository';
import IPerformedMaintenance from '../domain/IPerformedMaintenance';
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

    addMaintenanceAsync(vehicleId: string, performedMaintenance: IPerformedMaintenance): Promise<void> {
        const vehicle = this.getVehicle(vehicleId);
        const maintenance = { ...performedMaintenance };
        maintenance.id = uuid();
        vehicle.performedMaintenances.push(maintenance);
        return Promise.resolve();
    }

    addPatternAsync(vehicleId: string, newPattern: IPattern): Promise<void> {
        const vehicle = this.getVehicle(vehicleId);
        const pattern = { ...newPattern };
        pattern.id = uuid();
        vehicle.patterns.push(pattern);
        return Promise.resolve();
    }

    deleteMaintenanceAsync(vehicleId: string, maintenanceId: string): Promise<void> {
        const vehicle = this.getVehicle(vehicleId);
        if (!vehicle) return Promise.resolve();

        const index = vehicle.performedMaintenances.findIndex((_) => _.id === maintenanceId);
        vehicle.performedMaintenances.splice(index, 1);
        return Promise.resolve();
    }

    deletePatternAsync(vehicleId: string, patternId: string): Promise<void> {
        // get vehicle
        const vehicle = this.getVehicle(vehicleId);
        if (!vehicle) return Promise.resolve();

        // don't delete if a maintenance is associated with the pattern id
        const maintenanceWithPatternIdExists = vehicle.performedMaintenances.some((_) => _.patternId === patternId);
        if (maintenanceWithPatternIdExists) return Promise.resolve();

        const index = vehicle.patterns.findIndex((_) => _.id === patternId);
        vehicle.patterns.splice(index, 1);
        return Promise.resolve();
    }
}

export default new InMemVehicleRepository();
