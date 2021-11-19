import IVehicle from '@/lib/vehicle/IVehicle';
import IPattern from '@/lib/vehicle/IPattern';

export class VehicleBuilder {
    vehicle: IVehicle = {
        id: '0',
        name: '',
        kilometer: 0,
        userId: '0',
        patterns: [],
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

    withName(name: string): VehicleBuilder {
        this.vehicle.name = name;
        return this;
    }
}

export class PatternBuilder {
    pattern: IPattern = {
        id: '0',
        name: '',
        kilometerInterval: 0,
        timeIntervalInDays: 0,
    };

    build(): IPattern {
        return this.pattern;
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
