import createTasksForPattern from '../lib/application/maintenanceTaskGeneration/maintenanceTaskGenerator';

import { VehicleBuilder, PatternBuilder, PerformedMaintenanceBuilder } from '../lib/application/builder/vehicleBuilder';

test('adds 1 + 2 to equal 3', () => {
    const x = 3;
    expect(x).toBe(3);
});

test('maintenance task is created because of exceeded kilometer in kilometer range', () => {
    // arrange
    const vehicle = new VehicleBuilder().withKilometer(20000).build();
    const pattern = new PatternBuilder().withKilometerInterval(5000).withTimeInterval(365).build();
    const lastMaintenance = new PerformedMaintenanceBuilder().withKilometer(1100).withDate('2020-11-13').withPatternId(pattern.id).build();
    vehicle.performedMaintenances.push(lastMaintenance);
    const referenceDate = new Date('2021-11-13');
    const futureTimeRangeInDays = 365;

    // act
    const tasks = createTasksForPattern(vehicle, pattern, 200, futureTimeRangeInDays, referenceDate);

    // assert
    expect(tasks.length).toBe(1);
});

test('maintenance task is created because of exceeded time', () => {
    // arrange
    const vehicle = new VehicleBuilder().withKilometer(6000).build();
    const pattern = new PatternBuilder().withKilometerInterval(5000).withTimeInterval(100).build();
    const lastMaintenance = new PerformedMaintenanceBuilder().withKilometer(4000).withDate('2020-11-13').build();
    const referenceDate = new Date('2021-11-13');
    const futureTimeRangeInDays = 365;

    // act
    const tasks = createTasksForPattern(vehicle, pattern, 200, futureTimeRangeInDays, referenceDate);

    // assert
    expect(tasks.length).toBe(1);
});
