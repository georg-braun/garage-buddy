import IDoneMaintenance from "@/lib/maintenance/IDoneMaintenance"

export default class FinishedMaintenanceBuilder {
    maintenance: IDoneMaintenance = {
        date: '2020-01-01',
        kilometer: 0,
        patternId: '0',
    };

    build(): IDoneMaintenance {
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
