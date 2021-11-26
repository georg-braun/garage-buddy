import { Button } from '@chakra-ui/button';
import { Heading } from '@chakra-ui/layout';

import IVehicle from '@/lib/domain/IVehicle';
import PerformedMaintenanceEditModal from './PerformedMaintenanceEditModal';
import IPerformedMaintenance from '@/lib/domain/IPerformedMaintenance';
import VehicleRepository from '@/lib/application/VehicleRepository';

interface IPerformedMaintenancesOverviewProps {
    vehicle: IVehicle;
    onDataChanged?: () => void;
}

export default function PerformedMaintenancesOverview(props: IPerformedMaintenancesOverviewProps): JSX.Element {
    const vehicle = props.vehicle;
    const patternNameById = {};
    createPatternIdNameDict();

    async function onNewMaintenanceSubmitted(performedMaintenance: IPerformedMaintenance): Promise<void> {
        VehicleRepository.addMaintenance(props.vehicle.id, performedMaintenance);
        props.onDataChanged();
    }

    function createPatternIdNameDict() {
        vehicle.patterns.forEach((_) => {
            patternNameById[_.id] = _.name;
        });
    }

    function getPatternNameById(patternId: string): string {
        return patternNameById[patternId] ? patternNameById[patternId] : 'Unbekannte Wartung';
    }

    return (
        <div>
            <Heading>Erledigte Inspektionen</Heading>
            {vehicle ? (
                <div>
                    {vehicle.performedMaintenances.map((_) => (
                        <div key={_.id}>
                            {getPatternNameById(_.patternId)} (ID: {_.patternId}) {_.date}
                        </div>
                    ))}
                </div>
            ) : (
                <div>Keine Historie</div>
            )}
            {vehicle.patterns.length > 0 ? (
                <PerformedMaintenanceEditModal vehicle={vehicle} onSubmitted={onNewMaintenanceSubmitted}>
                    <Button>+</Button>
                </PerformedMaintenanceEditModal>
            ) : (
                <div>Lege ein Insepektionsmuster an um eine Inspektion als erledigt einzutragen.</div>
            )}
        </div>
    );
}
