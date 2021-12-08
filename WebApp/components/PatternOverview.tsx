import { Button } from '@chakra-ui/button';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import IVehicle from '@/lib/domain/IVehicle';

import VehicleRepository from '@/lib/application/VehicleRepository';
import IVehicleRepository from '@/lib/application/IVehicleRepository';

import PatternEditModal from './PatternEditModal';
import { Box, Flex } from '@chakra-ui/layout';

interface IPatternOverviewProps {
    vehicle: IVehicle;
    onDataChanged: () => void;
}

export default function PatternOverview(props: IPatternOverviewProps) {
    const vehicleRepository: IVehicleRepository = VehicleRepository;

    return (
        <div>
            {props.vehicle.patterns?.map((pattern) => (
                <Box key={pattern.id} mt="15px" _hover={{ bg: 'gray.100' }}>
                    <Flex justifyContent="space-between">
                        <Box>
                            <Box fontWeight="semibold">{pattern.name}</Box>
                            <Box fontSize="xs" textTransform="uppercase">
                                {pattern.kilometerInterval} km • {pattern.timeIntervalInDays} Tage
                            </Box>
                        </Box>

                        <Box alignItems="center">
                            <PatternEditModal
                                initialValue={pattern}
                                onSubmitted={async (pattern) => {
                                    // id generation shouldn't be made in view. move it to app logic
                                    const newPattern = { ...pattern };
                                    await vehicleRepository.updatePatternAsync(props.vehicle, newPattern);
                                    props.onDataChanged();
                                }}
                            >
                                <Button size="xs" background="transparent">
                                    <EditIcon />
                                </Button>
                            </PatternEditModal>

                            {props.vehicle.performedMaintenances.some((_) => _.patternId === pattern.id) ? (
                                <></>
                            ) : (
                                <Button
                                    size="xs"
                                    background="transparent"
                                    onClick={async () => {
                                        await vehicleRepository.deletePatternAsync(props.vehicle.id, pattern);
                                        props.onDataChanged();
                                    }}
                                >
                                    <DeleteIcon />
                                </Button>
                            )}
                        </Box>
                    </Flex>
                </Box>
            ))}
            <Box mt="15px">
                <PatternEditModal
                    onSubmitted={async (pattern) => {
                        const newPattern = { ...pattern };
                        await vehicleRepository.addPatternAsync(props.vehicle.id, newPattern);
                        props.onDataChanged();
                    }}
                >
                    <Button borderRadius="0" height="7">
                        +
                    </Button>
                </PatternEditModal>
            </Box>
        </div>
    );
}
