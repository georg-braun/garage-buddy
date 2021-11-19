import React, { useState, useEffect } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import Layout from '@/components/layout';
import { useAuth } from '@/lib/auth';
import IVehicle from '@/lib/vehicle/IVehicle';
import EditVehicleModal from '@/components/VehicleEditModalProps';
import PatternOverview from '@/components/PatternOverview';
import VehicleRepository from '@/lib/repository/VehicleRepository';
import IVehicleRepository from '@/lib/repository/IVehicleRepository';
import createTask from '@/lib/maintenance/maintenanceTaskCreator';
import IDoneMaintenance from '@/lib/maintenance/IDoneMaintenance';
import FinishedMaintenanceBuilder from '@/lib/maintenance/doneMaintenanceBuilder';
import IMaintenanceTask from '@/lib/maintenance/IMaintenanceTask';

export default function Home({}) {
    const auth = useAuth();
    const vehicleRepository: IVehicleRepository = VehicleRepository;

    const [vehicles, setVehicles] = useState<IVehicle[]>([]);

    const [selectedVehicle, setSelectedVehicle] = useState<IVehicle>();
    const [selectedVehicleTasks, setSelectedVehicleTasks] = useState<IMaintenanceTask[]>();

    useEffect(() => {
        loadVehicles();
    }, [auth]);

    function createTasksForSelectedVehicle(vehicle: IVehicle) {
        if (!vehicle) return;

        const allTasks: IMaintenanceTask[] = [];
        const patterns = vehicle.patterns;

        const lastDoneTask: IDoneMaintenance = new FinishedMaintenanceBuilder()
            .withDate('1992-10-15')
            .withKilometer(0)
            .build();

        patterns.forEach((pattern) => {
            const tasksForCurrentPattern = createTask(vehicle, pattern, lastDoneTask, 50000, 365, '2021-11-19');
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
        setVehicles(vehiclesFromRepo);
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
                        <Button
                            onClick={() => {
                                createTasksForSelectedVehicle(vehicle);
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
                    <PatternOverview vehicle={selectedVehicle} patternChanged={loadVehicles} />
                    <Heading size="lg">Aufgaben</Heading>
                    {selectedVehicleTasks ? (
                        <div>
                            {selectedVehicleTasks?.map((task) => (
                                <div key={task.name}>{task.name}</div>
                            ))}
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            ) : (
                <div></div>
            )}
        </Layout>
    );
}
