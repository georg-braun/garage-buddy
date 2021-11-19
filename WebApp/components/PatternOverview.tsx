import React, { useState, useEffect } from 'react';
import IVehicle from '@/lib/vehicle/IVehicle';
import PatternEntry from '@/components/PatternListEntry';
import IPattern from '@/lib/vehicle/IPattern';
import InMemVehicleRepository from '@/lib/repository/InMemVehicleRepository';

interface IPatternOverviewProps {
    vehicle: IVehicle;
}

export default function PatternOverview(props: IPatternOverviewProps) {
    //const [patterns, setPatterns] = useState<IPattern[]>(await InMemPatternRepository.getPatternsAsync());

    return (
        <div>
            {props.vehicle.patterns?.map((pattern) => (
                <div key={pattern.id}>
                    <span>
                        <PatternEntry
                            pattern={pattern}
                            submitText="Aktualisieren"
                            onSubmit={async (pattern) => console.log(pattern)}
                        />
                    </span>
                </div>
            ))}
            <PatternEntry
                pattern={{ id: '0', name: 'Inspektion', kilometerInterval: 5000, timeIntervalInDays: 365 }}
                submitText="Hinzufügen"
                onSubmit={async (pattern) => /*InMemVehicleRepository.addPatternAsync(pattern)*/ console.log('add')}
            />
        </div>
    );
}
