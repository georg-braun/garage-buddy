import IPattern from '@/lib/vehicle/IPattern';

interface IVehicle {
    id: string;
    userId: string;
    name: string;
    kilometer: number;
    patterns: IPattern[];
}

export default IVehicle;
