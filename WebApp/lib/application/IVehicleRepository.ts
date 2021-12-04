import IVehicle from '@/lib/domain/IVehicle';
import IPattern from '@/lib/domain/IPattern';
import IPerformedMaintenance from '@/lib/domain/IPerformedMaintenance';

export default interface IVehicleRepository {
    getVehiclesForUserAsync(userId: string): Promise<IVehicle[]>;
    createVehicleAsync(vehicle: IVehicle): Promise<void>;
    updateVehicleAsync(vehicle: IVehicle): Promise<void>;
    deleteVehicleAsync(vehicleId: string): Promise<void>;
    addMaintenanceAsync(vehicleId: string, maintenance: IPerformedMaintenance): Promise<void>;
    deleteMaintenanceAsync(vehicleId: string, maintenance: IPerformedMaintenance): Promise<void>;
    addPatternAsync(vehicleId: string, pattern: IPattern): Promise<void>;
    updatePatternAsync(vehicle: IVehicle, pattern: IPattern): Promise<void>;
    deletePatternAsync(vehicleId: string, pattern: IPattern): Promise<void>;
}
