import React, { useState, useEffect } from 'react';
import { Button } from '@chakra-ui/button';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import IVehicle from '@/lib/domain/IVehicle';

import VehicleRepository from '@/lib/application/VehicleRepository';
import IVehicleRepository from '@/lib/application/IVehicleRepository';

import PatternEditModal from './PatternEditModal';

interface IPatternOverviewProps {
    vehicle: IVehicle;
    patternChanged: () => void;
}

export default function PatternOverview(props: IPatternOverviewProps) {
    const vehicleRepository: IVehicleRepository = VehicleRepository;

    return (
        <div>
            {props.vehicle.patterns?.map((pattern) => (
                <div key={pattern.id}>
                    <span>
                        {pattern.id} {pattern.name} {pattern.kilometerInterval} {pattern.timeIntervalInDays}
                        <PatternEditModal
                            initialValue={pattern}
                            onSubmitted={async (pattern) => {
                                // id generation shouldn't be made in view. move it to app logic
                                const newPattern = { ...pattern };
                                await vehicleRepository.updatePatternAsync(props.vehicle.id, newPattern);
                                props.patternChanged();
                            }}
                        >
                            <Button size="sm">
                                <EditIcon />
                            </Button>
                        </PatternEditModal>
                    </span>
                </div>
            ))}
            <PatternEditModal
                onSubmitted={async (pattern) => {
                    const newPattern = { ...pattern };
                    await vehicleRepository.addPatternAsync(props.vehicle.id, newPattern);
                    props.patternChanged();
                }}
            >
                <Button>+</Button>
            </PatternEditModal>
        </div>
    );
}
