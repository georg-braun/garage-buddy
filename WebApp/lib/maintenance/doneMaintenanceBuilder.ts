import IPerformedMaintenance from "@/lib/vehicle/IPerformedMaintenance"

export default class FinishedMaintenanceBuilder {
    maintenance: IPerformedMaintenance = {
        date: '2020-01-01',
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
        this.maintenance.date = date;
        return this;
    }
}