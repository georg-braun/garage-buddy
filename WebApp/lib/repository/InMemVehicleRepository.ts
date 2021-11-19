import IPattern from '@/lib/vehicle/IPattern';
import IVehicle from '@/lib/vehicle/IVehicle';
import { PatternBuilder, VehicleBuilder } from '../vehicleBuilder';
interface IPatternRepository {
    getVehiclesAsync(): Promise<IVehicle[]>;
    addVehicleAsync(pattern: IVehicle): Promise<void>;
}

class InMemVehicleRepository implements IPatternRepository {
    vehicles: IVehicle[] = [];

    constructor() {
        const patternBuilder = new PatternBuilder()
            .withName('Luftfilter')
            .withKilometerInterval(5000)
            .withTimeInterval(365);
        const vehicleBuilder = new VehicleBuilder()
            .withName('Opel')
            .withKilometer(4000)
            .withPattern(patternBuilder.pattern);
        this.vehicles.push(vehicleBuilder.vehicle);
    }

    getVehiclesAsync(): Promise<IVehicle[]> {
        return Promise.resolve(this.vehicles);
    }

    addVehicleAsync(vehicle: IVehicle): Promise<void> {
        this.vehicles.push(vehicle);
        return Promise.resolve();
    }
}

export default new InMemVehicleRepository();
