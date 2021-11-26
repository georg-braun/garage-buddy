import IPerformedMaintenance from '@/lib/vehicle/IPerformedMaintenance';
import IPattern from '@/lib/vehicle/IPattern';

interface IVehicle {
    id: string;
    userId: string;
    name: string;
    kilometer: number;
    patterns: IPattern[];
    performedMaintenances: IPerformedMaintenance[];
}

export default IVehicle;
