import { expect } from 'chai';
import 'mocha';

import createMaintenanceTasks from '../lib/maintenance/maintenanceTaskCreator';

describe('First test', () => {
    it('should return true', () => {
        const result = createMaintenanceTasks();
        expect(result).to.equal(true);
    });
});
