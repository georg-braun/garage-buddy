import IVehicle from '@/lib/domain/IVehicle';

export default interface IVehicleRepository {
    getVehiclesForUserAsync(userId: string): Promise<IVehicle[]>;
    createVehicleAsync(vehicle: IVehicle): Promise<void>;
    updateVehicleAsync(vehicle: IVehicle): Promise<void>;
    deleteVehicleAsync(vehicleId: string): Promise<void>;
}

