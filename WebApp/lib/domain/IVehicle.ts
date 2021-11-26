import IPerformedMaintenance from '@/lib/domain/IPerformedMaintenance';
import IPattern from '@/lib/domain/IPattern';

interface IVehicle {
    id: string;
    userId: string;
    name: string;
    kilometer: number;
    patterns: IPattern[];
    performedMaintenances: IPerformedMaintenance[];
}

export default IVehicle;
