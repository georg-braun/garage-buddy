import IPerformedMaintenance from '@/lib/vehicle/IPerformedMaintenance';
import { v4 as uuid } from 'uuid';

import IVehicle from '@/lib/vehicle/IVehicle';
import IPattern from '@/lib/vehicle/IPattern';

export class VehicleBuilder {
    vehicle: IVehicle = {
        id: uuid(),
        name: '',
        kilometer: 0,
        userId: '0',
        patterns: [],
        performedMaintenances: [],
    };

    build(): IVehicle {
        return this.vehicle;
    }

    withKilometer(km: number): VehicleBuilder {
        this.vehicle.kilometer = km;
        return this;
    }

    withPattern(pattern: IPattern): VehicleBuilder {
        this.vehicle.patterns.push(pattern);
        return this;
    }

    withPerformedMaintenances(maintenance: IPerformedMaintenance) {
        this.vehicle.performedMaintenances.push(maintenance);
        return this;
    }

    withName(name: string): VehicleBuilder {
        this.vehicle.name = name;
        return this;
    }
}

export class PatternBuilder {
    pattern: IPattern = {
        id: uuid(),
        name: '',
        kilometerInterval: 0,
        timeIntervalInDays: 0,
    };

    build(): IPattern {
        return this.pattern;
    }

    withPatternId(id: string): PatternBuilder {
        this.pattern.id = id;
        return this;
    }

    withName(name: string): PatternBuilder {
        this.pattern.name = name;
        return this;
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

export class PerformedMaintenanceBuilder {
    maintenance: IPerformedMaintenance = {
        patternId: '0',
        date: '',
        kilometer: 0,
    };

    build(): IPerformedMaintenance {
        return this.maintenance;
    }

    withPatternId(id: string): PerformedMaintenanceBuilder {
        this.maintenance.patternId = id;
        return this;
    }

    withDate(date: string): PerformedMaintenanceBuilder {
        this.maintenance.date = date;
        return this;
    }

    withKilometer(kilometer: number): PerformedMaintenanceBuilder {
        this.maintenance.kilometer = kilometer;
        return this;
    }
}
