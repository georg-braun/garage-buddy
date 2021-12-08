import { Button } from '@chakra-ui/button';
import { Box, Flex } from '@chakra-ui/layout';
import { DeleteIcon } from '@chakra-ui/icons';

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
        VehicleRepository.addMaintenanceAsync(props.vehicle.id, performedMaintenance);
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

    async function deleteMaintenanceAsync(vehicleId: string, maintenance: IPerformedMaintenance) {
        await VehicleRepository.deleteMaintenanceAsync(vehicleId, maintenance);
        props.onDataChanged();
    }

    return (
        <div>
            {vehicle ? (
                <div>
                    {vehicle.performedMaintenances.map((_) => (
                        <Box key={_.id} mt="15px" _hover={{ bg: 'gray.100' }}>
                            <Flex justifyContent="space-between">
                                <Box>
                                    <Box fontWeight="semibold">{getPatternNameById(_.patternId)}</Box>
                                    <Box fontSize="xs" textTransform="uppercase">
                                        {_.date.toLocaleDateString()} • {_.kilometer} km
                                    </Box>
                                </Box>

                                <Box alignItems="center">
                                    <Button
                                        size="xs"
                                        background="transparent"
                                        onClick={() => deleteMaintenanceAsync(vehicle.id, _)}
                                    >
                                        <DeleteIcon />
                                    </Button>
                                </Box>
                            </Flex>
                        </Box>
                    ))}
                </div>
            ) : (
                <div>Keine Historie</div>
            )}
            {vehicle.patterns.length > 0 ? (
                <PerformedMaintenanceEditModal vehicle={vehicle} onSubmitted={onNewMaintenanceSubmitted}>
                    <Button mt="15px" borderRadius="0" height="7">
                        +
                    </Button>
                </PerformedMaintenanceEditModal>
            ) : (
                <div>Lege ein Inspektionsmuster an um eine Inspektion als erledigt einzutragen.</div>
            )}
        </div>
    );
}
