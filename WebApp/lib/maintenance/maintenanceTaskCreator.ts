import IVehicle from '../vehicle/IVehicle';
import IPattern from '../vehicle/IPattern';
import IMaintenanceTask from './IMaintenanceTask';
import IPerformedMaintenance from '../vehicle/IPerformedMaintenance';
import moment from 'moment';

export default function createTask(
    vehicle: IVehicle,
    pattern: IPattern,
    lastDoneMaintenance: IPerformedMaintenance,
    kmScope: number,
    timeScopeInDays: number,
    todayAsString: string,
): IMaintenanceTask[] {
    const kmAfterLastMaintenance = vehicle.kilometer + kmScope - lastDoneMaintenance.kilometer;
    const kmExceeded = kmAfterLastMaintenance > pattern.kilometerInterval;

    const timeRangeExceeded = calcIfTimeRangeIsExceeded(
        lastDoneMaintenance.date,
        pattern.timeIntervalInDays,
        timeScopeInDays,
        todayAsString,
    );

    if (kmExceeded || timeRangeExceeded) {
        return [{ name: pattern.name }];
    }

    return [];
}

function calcIfTimeRangeIsExceeded(
    dateOfLastMaintenanceAsString: string,
    maintenanceIntervalInDays: number,
    timeRangeScopeInDays: number,
    todayAsString: string,
): boolean {
    // history
    const maintenanceTimeInterval = moment.duration(maintenanceIntervalInDays, 'days');
    const lastMaintenanceDate = moment(dateOfLastMaintenanceAsString);
    // next time slot
    const nextMaintenanceDate = moment(lastMaintenanceDate);
    nextMaintenanceDate.add(maintenanceTimeInterval);

    // observed range
    const timeScope = moment.duration(timeRangeScopeInDays, 'days');
    const today = moment(todayAsString);
    const dayInFuture = moment(today);
    dayInFuture.add(timeScope);

    return nextMaintenanceDate.isBefore(dayInFuture);
}
