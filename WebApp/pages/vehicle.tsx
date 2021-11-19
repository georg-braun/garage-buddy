import React, { useState, useEffect } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

import Layout from '@/components/layout';
import { useAuth } from '@/lib/auth';
import IVehicle from '@/lib/vehicle/IVehicle';
import {
    getVehiclesForUser,
    createVehicle as dbCreateVehicle,
    deleteVehicle as dbDeleteVehicle,
    updateVehicle as dbUpdateVehicle,
} from '@/lib/db';
import EditVehicleModal from '@/components/VehicleEditModalProps';
import PatternOverview from '@/components/PatternOverview';
import InMemVehicleRepository from '@/lib/repository/InMemVehicleRepository';

export default function Home({}) {
    const auth = useAuth();

    const [vehicles, setVehicles] = useState<IVehicle[]>([]);

    const [selectedVehicle, setSelectedVehicle] = useState<IVehicle>();

    useEffect(() => {
        loadVehicles();
    }, [auth]);

    async function deleteVehicle(vehicleId: string) {
        await dbDeleteVehicle(vehicleId);
        await loadVehicles();
    }

    async function addVehicle(vehicle: IVehicle) {
        const userId = auth.user.uid;
        if (!userId) {
            console.log('couldnt add vehicle because of empty user id');
        }

        vehicle.userId = userId;

        await dbCreateVehicle(vehicle);
    }

    async function updateVehicle(vehicle: IVehicle) {
        const userId = auth.user.uid;
        if (!userId) {
            console.log('couldnt update vehicle because of empty user id');
        }

        vehicle.userId = userId;
        await dbUpdateVehicle(vehicle);
    }

    async function loadVehicles() {
        if (!auth?.user?.uid) {
            console.log('no user id found => dont try to get vehicle data');
            return;
        }

        console.log('try to get user vehicles');
        //const dbVehicles = await getVehiclesForUser(auth.user.uid);
        const inMemVehicles = await InMemVehicleRepository.getVehiclesAsync();
        setVehicles(inMemVehicles);
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
                        <Button onClick={() => setSelectedVehicle(vehicle)}>{vehicle.name}</Button>
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
                    <PatternOverview vehicle={selectedVehicle} />
                </div>
            ) : (
                <div></div>
            )}
        </Layout>
    );
}
