import { expect } from 'chai';
import 'mocha';

import IMaintenancePattern from '../lib/maintenance/IMaintenancePattern';
import IDoneMaintenance from '../lib/maintenance/IDoneMaintenance';
import createMaintenanceTasks from '../lib/maintenance/maintenanceTaskCreator';
import IVehicle from '../lib/vehicle/IVehicle';

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
            date: new Date(),
        };

        // act
        const tasks = createMaintenanceTasks(pattern, lastDoneMaintenance, vehicle, 200);

        // assert
        expect(tasks.length).to.equal(1);
    });
});
