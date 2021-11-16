import IMaintenancePattern from '../lib/maintenance/IMaintenancePattern';
import IFinishedMaintenance from '../lib/maintenance/IDoneMaintenance';
import createTask from '../lib/maintenance/maintenanceTaskCreator';
import IVehicle from '../lib/vehicle/IVehicle';

test('adds 1 + 2 to equal 3', () => {
    const x = 3;
    expect(x).toBe(3);
});

test('maintenance task is created because of exceeded kilometer in kilometer range', () => {
    // arrange
    const vehicle = new VehicleBuilder().withKilometer(20000).build();
    const pattern = new PatternBuilder().withKilometerInterval(5000).withTimeInterval(365).build();
    const lastMaintenance = new FinishedMaintenanceBuilder().withKilometer(1100).withDate('2020-11-13').build();
    const referenceDate = '2021-11-13';
    const futureTimeRangeInDays = 365;

    // act
    const tasks = createTask(vehicle, pattern, lastMaintenance, 200, futureTimeRangeInDays, referenceDate);

    // assert
    expect(tasks.length).toBe(1);
});

test('maintenance task is created because of exceeded time', () => {
    // arrange
    const vehicle = new VehicleBuilder().withKilometer(6000).build();
    const pattern = new PatternBuilder().withKilometerInterval(5000).withTimeInterval(100).build();
    const lastMaintenance = new FinishedMaintenanceBuilder().withKilometer(4000).withDate('2020-11-13').build();
    const referenceDate = '2021-11-13';
    const futureTimeRangeInDays = 365;

    // act

    const tasks = createTask(vehicle, pattern, lastMaintenance, 200, futureTimeRangeInDays, referenceDate);

    // assert
    expect(tasks.length).toBe(1);
});

class VehicleBuilder {
    vehicle: IVehicle = {
        id: '0',
        name: '',
        kilometer: 0,
        userId: '0',
    };

    build(): IVehicle {
        return this.vehicle;
    }

    withKilometer(km: number): VehicleBuilder {
        this.vehicle.kilometer = km;
        return this;
    }
}

class FinishedMaintenanceBuilder {
    maintenance: IFinishedMaintenance = {
        date: '2020-01-01',
        kilometer: 0,
        patternId: '0',
    };

    build(): IFinishedMaintenance {
        return this.maintenance;
    }

    withKilometer(km: number): FinishedMaintenanceBuilder {
        this.maintenance.kilometer = km;
        return this;
    }

    withDate(date: string): FinishedMaintenanceBuilder {
        this.maintenance.date = date;
        return this;
    }
}

class PatternBuilder {
    pattern: IMaintenancePattern = {
        id: '0',
        name: '',
        kilometerInterval: 0,
        timeIntervalInDays: 0,
    };

    build(): IMaintenancePattern {
        return this.pattern;
    }

    withKilometerInterval(km: number): PatternBuilder {
        this.pattern.kilometerInterval = km;
        return this;
    }

    withTimeInterval(days: number): PatternBuilder {
        this.pattern.timeIntervalInDays = days;
        return this;
    }
}
