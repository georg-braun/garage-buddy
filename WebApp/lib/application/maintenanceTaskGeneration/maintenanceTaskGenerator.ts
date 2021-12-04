import IVehicle from '../../domain/IVehicle';
import IPattern from '../../domain/IPattern';
import IMaintenanceTask from '../../domain/IMaintenanceTask';
import moment from 'moment';

export default function createTasksForPattern(
    vehicle: IVehicle,
    pattern: IPattern,
    kmScope: number,
    timeScopeInDays: number,
    today: Date,
): IMaintenanceTask[] {
    const performedMaintenances = vehicle.performedMaintenances.filter((_) => _.patternId === pattern.id);

    // Kilometer
    const kilometerValues = performedMaintenances.map((_) => _.kilometer);
    const maxKilometerValue = Math.max(...kilometerValues);
    const kmAfterLastMaintenance = vehicle.kilometer + kmScope - maxKilometerValue;
    const kmExceeded = kmAfterLastMaintenance > pattern.kilometerInterval;

    // Time
    const maintenanceDates = performedMaintenances.map((_) => _.date);
    const maxDate = new Date(Math.max.apply(null, maintenanceDates));

    const timeRangeExceeded = calcIfTimeRangeIsExceeded(maxDate, pattern.timeIntervalInDays, timeScopeInDays, today);

    if (kmExceeded || timeRangeExceeded) {
        return [{ name: pattern.name }];
    }

    return [];
}

function calcIfTimeRangeIsExceeded(
    dateOfLastMaintenance: Date,
    maintenanceIntervalInDays: number,
    timeRangeScopeInDays: number,
    today: Date,
): boolean {
    // history
    const maintenanceTimeInterval = moment.duration(maintenanceIntervalInDays, 'days');
    const lastMaintenanceDate = moment(dateOfLastMaintenance);
    // next time slot
    const nextMaintenanceDate = moment(lastMaintenanceDate);
    nextMaintenanceDate.add(maintenanceTimeInterval);

    // observed range
    const timeScope = moment.duration(timeRangeScopeInDays, 'days');
    const momentToday = moment(today);
    const dayInFuture = moment(momentToday);
    dayInFuture.add(timeScope);

    return nextMaintenanceDate.isBefore(dayInFuture);
}
