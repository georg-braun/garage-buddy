import React, { useState, useEffect } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import Layout from '@/components/layout';
import { useAuth } from '@/lib/infrastructure/auth';
import IVehicle from '@/lib/domain/IVehicle';
import EditVehicleModal from '@/components/VehicleEditModalProps';
import PatternOverview from '@/components/PatternOverview';
import VehicleRepository from '@/lib/application/VehicleRepository';
import IVehicleRepository from '@/lib/application/IVehicleRepository';
import createTasksFromPattern from '@/lib/application/maintenanceTaskGeneration/maintenanceTaskGenerator';
import IPerformedMaintenance from '@/lib/domain/IPerformedMaintenance';
import FinishedMaintenanceBuilder from '@/lib/application/builder/doneMaintenanceBuilder';
import IMaintenanceTask from '@/lib/domain/IMaintenanceTask';
import PerformedMaintenancesOverview from '@/components/PerformedMaintenancesOverview';

export default function Home({}) {
    const auth = useAuth();
    const vehicleRepository: IVehicleRepository = VehicleRepository;

    const [vehicles, setVehicles] = useState<IVehicle[]>([]);

    const [selectedVehicle, setSelectedVehicle] = useState<IVehicle>();
    const [selectedVehicleTasks, setSelectedVehicleTasks] = useState<IMaintenanceTask[]>();

    useEffect(() => {
        loadVehicles();
    }, [auth]);

    function refreshTasksForSelectedVehicle(vehicle: IVehicle) {
        if (!vehicle) return;

        const allTasks: IMaintenanceTask[] = [];
        const patterns = vehicle.patterns;

        patterns.forEach((pattern) => {
            const tasksForCurrentPattern = createTasksFromPattern(vehicle, pattern, 50000, 365, new Date());
            allTasks.push(...tasksForCurrentPattern);
        });

        setSelectedVehicleTasks(allTasks);
    }

    async function deleteVehicle(vehicleId: string) {
        await vehicleRepository.deleteVehicleAsync(vehicleId);
        await loadVehicles();
    }

    async function addVehicle(vehicle: IVehicle) {
        const userId = auth.user.uid;
        if (!userId) {
            console.log('couldnt add vehicle because of empty user id');
        }

        vehicle.userId = userId;

        await vehicleRepository.createVehicleAsync(vehicle);
    }

    async function updateVehicle(vehicle: IVehicle) {
        const userId = auth.user.uid;
        if (!userId) {
            console.log('couldnt update vehicle because of empty user id');
        }

        vehicle.userId = userId;
        await vehicleRepository.updateVehicleAsync(vehicle);
    }

    async function loadVehicles() {
        if (!auth?.user?.uid) {
            console.log('no user id found => dont try to get vehicle data');
            return;
        }

        console.log('try to get user vehicles');
        const vehiclesFromRepo = await vehicleRepository.getVehiclesForUserAsync(auth.user.uid);
        //const newVehicles = [...vehiclesFromRepo];
        setVehicles(vehiclesFromRepo);

        if (!selectedVehicle) return;
        const updatedSelectedVehicle = vehiclesFromRepo.find(_ => _.id === selectedVehicle.id)        
        setSelectedVehicle(updatedSelectedVehicle)        
    }

    async function refresh() {
        await loadVehicles();
        if (selectedVehicle) refreshTasksForSelectedVehicle(selectedVehicle);
    }

    async function onNewVehicleSubmitted(vehicle: IVehicle): Promise<void> {
        await addVehicle(vehicle);
        await loadVehicles();
    }

    async function onEditedVehicleSubmitted(vehicle: IVehicle): Promise<void> {
        await updateVehicle(vehicle);
        await loadVehicles();
    }

    return (
        <Layout>
            <EditVehicleModal onSubmitted={onNewVehicleSubmitted}>
                <Button>+</Button>
            </EditVehicleModal>

            {vehicles?.map((vehicle) => (
                <div key={vehicle.id}>
                    <span>
                        {vehicle.id}
                        <Button
                            onClick={() => {
                                refreshTasksForSelectedVehicle(vehicle);
                                return setSelectedVehicle(vehicle);
                            }}
                        >
                            {vehicle.name}
                        </Button>
                        <EditVehicleModal onSubmitted={onEditedVehicleSubmitted} initialValue={vehicle}>
                            <Button size="sm">
                                <EditIcon />
                            </Button>
                        </EditVehicleModal>
                        <Button onClick={() => deleteVehicle(vehicle.id)} size="sm">
                            <DeleteIcon />
                        </Button>
                    </span>
                </div>
            ))}

            {selectedVehicle ? (
                <div>
                    <p>Details zu {selectedVehicle.name} </p>
                    <Heading size="lg">Inspektionsmuster</Heading>
                    <PatternOverview vehicle={selectedVehicle} onDataChanged={refresh} />
                    <Heading size="lg">Aufgaben</Heading>
                    <p>in den nächsten 5000 Kilometer oder im nächsten Jahr</p>
                    {selectedVehicleTasks ? (
                        <ul>
                            {selectedVehicleTasks?.map((task) => (
                                <li key={task.name}>{task.name}</li>
                            ))}
                        </ul>
                    ) : (
                        <div></div>
                    )}
                    <PerformedMaintenancesOverview vehicle={selectedVehicle} onDataChanged={refresh} />
                </div>
            ) : (
                <div></div>
            )}
        </Layout>
    );
}
