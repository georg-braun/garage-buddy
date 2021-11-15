import IMaintenancePattern from '../lib/maintenance/IMaintenancePattern';
import IDoneMaintenance from '../lib/maintenance/IDoneMaintenance';
import createMaintenanceTasks from '../lib/maintenance/maintenanceTaskCreator';
import IVehicle from '../lib/vehicle/IVehicle';

test('adds 1 + 2 to equal 3', () => {
    const x = 3;
    expect(x).toBe(3);
});

/*
describe('correct tasks are created', () => {
    it('maintenance task is created because of exceeded kilometer in kilometer range', () => {
        // arrange
        const pattern: IMaintenancePattern = {
            id: '0',
            name: 'Ölwechsel',
            kilometerInterval: 5000,
            timeIntervalInDays: 365,
        };

        const vehicle: IVehicle = {
            id: '0',
            name: 'VW Golf',
            kilometer: 6000,
            userId: '0',
        };

        const lastDoneMaintenance: IDoneMaintenance = {
            patternId: '0',
            kilometer: 1100,
            date: '2020-11-13',
        };

        // act
        const futureTimeRangeInDays = 365;
        const referenceDate = '2021-11-13';
        const tasks = createMaintenanceTasks(
            pattern,
            lastDoneMaintenance,
            vehicle,
            200,
            referenceDate,
            futureTimeRangeInDays,
        );

        // assert
        expect(tasks.length).to.equal(1);
    });

    it('maintenance task is created because of exceeded time', () => {
        // arrange
        const vehicle: IVehicle = {
            id: '0',
            name: 'VW Golf',
            kilometer: 6000,
            userId: '0',
        };

        const pattern: IMaintenancePattern = {
            id: '0',
            name: 'Ölwechsel',
            kilometerInterval: 5000,
            timeIntervalInDays: 20,
        };

        const lastDoneMaintenance: IDoneMaintenance = {
            patternId: '0',
            kilometer: 4000,
            date: '2020-11-13',
        };

        // act
        const futureTimeRangeInDays = 365;
        const referenceDate = '2021-11-13';
        const tasks = createMaintenanceTasks(
            pattern,
            lastDoneMaintenance,
            vehicle,
            200,
            referenceDate,
            futureTimeRangeInDays,
        );

        // assert
        expect(tasks.length).to.equal(1);
    });
});
*/
