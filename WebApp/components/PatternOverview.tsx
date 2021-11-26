import React, { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

import IVehicle from '@/lib/domain/IVehicle';
import PatternEntry from '@/components/PatternListEntry';
import VehicleRepository from '@/lib/application/VehicleRepository';
import IVehicleRepository from '@/lib/application/IVehicleRepository';
import PatternFactory from '@/lib/application/PatternFactory';

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
                        {pattern.id}
                        <PatternEntry
                            pattern={pattern}
                            submitText="Aktualisieren"
                            onSubmit={async (pattern) => console.log(pattern)}
                        />
                    </span>
                </div>
            ))}
            ---
            <PatternEntry
                pattern={PatternFactory.create()}
                submitText="Hinzufügen"
                onSubmit={async (pattern) => {
                    // id generation shouldn't be made in view. move it to app logic
                    const newPattern = { ...pattern };
                    newPattern.id = uuid();
                    const vehicle = props.vehicle;
                    vehicle.patterns.push(newPattern);
                    await vehicleRepository.updateVehicleAsync(vehicle);
                    props.patternChanged();
                }}
            />
        </div>
    );
}
