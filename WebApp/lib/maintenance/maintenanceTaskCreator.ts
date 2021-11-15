import IVehicle from '../vehicle/IVehicle';
import IMaintenancePattern from './IMaintenancePattern';
import IMaintenanceTask from './IMaintenanceTask';
import IDoneMaintenance from './IDoneMaintenance';
import moment from 'moment';

export default function createMaintenanceTasks(
    pattern: IMaintenancePattern,
    lastDoneMaintenance: IDoneMaintenance,
    vehicle: IVehicle,
    kilometerScope: number,
    todayAsString: string,
    timeRangeScopeInDays: number,
): IMaintenanceTask[] {
    const kilometerAfterLastMaintenance = vehicle.kilometer + kilometerScope - lastDoneMaintenance.kilometer;
    const kilometerExceeded = kilometerAfterLastMaintenance > pattern.kilometerInterval;

    const timeRangeExceeded = calcIfTimeRangeIsExceeded(
        lastDoneMaintenance.date,
        pattern.timeIntervalInDays,
        todayAsString,
        timeRangeScopeInDays,
    );

    if (kilometerExceeded || timeRangeExceeded) {
        return [{ name: 'Ölwechsel' }];
    }

    return [];
}

function calcIfTimeRangeIsExceeded(
    dateOfLastMaintenanceAsString: string,
    maintenanceTimeIntervalInDays: number,
    todayAsString: string,
    timeRangeScopeInDays: number,
): boolean {
    const lastMaintenanceDate = moment(dateOfLastMaintenanceAsString);
    const today = moment(todayAsString);
    const timeScope = moment.duration(timeRangeScopeInDays, 'days');
    const maintenanceTimeInterval = moment.duration(maintenanceTimeIntervalInDays, 'days');

    const dateOfNextMaintenanceTask = lastMaintenanceDate.add(maintenanceTimeInterval);
    const observedDate = today.add(timeScope);

    return observedDate < dateOfNextMaintenanceTask;
}
