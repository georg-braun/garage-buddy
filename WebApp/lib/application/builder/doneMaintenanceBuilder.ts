import IPerformedMaintenance from '@/lib/domain/IPerformedMaintenance';

export default class FinishedMaintenanceBuilder {
    maintenance: IPerformedMaintenance = {
        id: '0',
        date: new Date(),
        kilometer: 0,
        patternId: '0',
    };

    build(): IPerformedMaintenance {
        return this.maintenance;
    }

    withKilometer(km: number): FinishedMaintenanceBuilder {
        this.maintenance.kilometer = km;
        return this;
    }

    withDate(date: string): FinishedMaintenanceBuilder {
        this.maintenance.date = new Date(date);
        return this;
    }
}
