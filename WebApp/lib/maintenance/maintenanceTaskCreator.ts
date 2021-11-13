import IVehicle from '../vehicle/IVehicle';
import IMaintenancePattern from './IMaintenancePattern';
import IMaintenanceTask from './IMaintenanceTask';
import IDoneMaintenance from './IDoneMaintenance';

export default function createMaintenanceTasks(
    pattern: IMaintenancePattern,
    lastDoneMaintenance: IDoneMaintenance,
    vehicle: IVehicle,
    kilometerHorizon: number,
): IMaintenanceTask[] {
    const kilometerAfterLastMaintenance = vehicle.kilometer + kilometerHorizon - lastDoneMaintenance.kilometer;
    const kilometerExceeded = kilometerAfterLastMaintenance > pattern.kilometerInterval;

    if (kilometerExceeded) {
        return [{ name: 'Ölwechsel' }];
    }

    return [];
}
