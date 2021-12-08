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
                new PatternBuilder().withName('Luftfilter').withKilometerInterval(5000).withTimeInterval(365).build(),
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
                new PatternBuilder().withName('Ölwechsel').withKilometerInterval(5000).withTimeInterval(365).build(),
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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    addPatternAsync(vehicleId: string, pattern: IPattern): Promise<void> {
        const vehicle = this.getVehicle(vehicleId);
        const patternCopy = { ...pattern, id: uuid() };
        vehicle.patterns.push(patternCopy);
        return Promise.resolve();
    }

    updatePatternAsync(vehicle: IVehicle, pattern: IPattern): Promise<void> {
        const vehicleFromRepo = this.getVehicle(vehicle.id);
        const patternCopy = { ...pattern };
        pattern.id = uuid();
        const existingPatternIndex = vehicleFromRepo.patterns.findIndex((_) => _.id === pattern.id);
        if (!existingPatternIndex) return Promise.resolve();
        vehicleFromRepo.patterns.splice(existingPatternIndex, 1, patternCopy);
        return Promise.resolve();
    }

    deleteMaintenanceAsync(vehicleId: string, maintenance: IPerformedMaintenance): Promise<void> {
        const vehicle = this.getVehicle(vehicleId);
        if (!vehicle) return Promise.resolve();

        const index = vehicle.performedMaintenances.findIndex((_) => _.id === maintenance.id);
        vehicle.performedMaintenances.splice(index, 1);
        return Promise.resolve();
    }

    deletePatternAsync(vehicleId: string, pattern: IPattern): Promise<void> {
        // get vehicle
        const vehicle = this.getVehicle(vehicleId);
        if (!vehicle) return Promise.resolve();

        // don't delete if a maintenance is associated with the pattern id
        const maintenanceWithPatternIdExists = vehicle.performedMaintenances.some((_) => _.patternId === pattern.id);
        if (maintenanceWithPatternIdExists) return Promise.resolve();

        const index = vehicle.patterns.findIndex((_) => _.id === pattern.id);
        vehicle.patterns.splice(index, 1);
        return Promise.resolve();
    }
}

export default new InMemVehicleRepository();
