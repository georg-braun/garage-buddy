import React, { useState, useEffect } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { DeleteIcon } from '@chakra-ui/icons';

import Layout from '@/components/layout';
import { useAuth } from '@/lib/auth';
import IVehicle from '@/lib/vehicle/IVehicle';
import {
    createVehicle,
    getVehiclesForUser,
    deleteVehicle as dbDeleteVehicle,
    updateVehicle as dbUpdateVehicle,
} from '@/lib/db';
import EditVehicleModal from '@/components/AddVehicleModal';

export default function Home({}) {
    const auth = useAuth();

    const exampleVehicle: IVehicle = { id: '0', name: 'Demo-Fahrzeug', userId: '2', kilometer: 39000 };
    const [vehicles, setVehicles] = useState<IVehicle[]>([
        { id: '0', name: 'Demo-Fahrzeug', userId: '2', kilometer: 39000 },
    ]);

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

        await createVehicle(vehicle);
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
        const dbVehicles = await getVehiclesForUser(auth.user.uid);
        setVehicles(dbVehicles);
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
            <EditVehicleModal onSubmitted={onNewVehicleSubmitted} initialValue={exampleVehicle} />

            {vehicles?.map((vehicle) => (
                <div key={vehicle.id}>
                    <p>
                        {vehicle.name} ({vehicle.id}) von {vehicle.userId}
                    </p>
                    <EditVehicleModal onSubmitted={onEditedVehicleSubmitted} initialValue={vehicle} />
                    <Button onClick={() => deleteVehicle(vehicle.id)}>
                        <DeleteIcon />
                    </Button>
                </div>
            ))}
        </Layout>
    );
}
