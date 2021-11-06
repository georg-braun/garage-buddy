import React, { useState, useEffect } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { DeleteIcon } from '@chakra-ui/icons';

import Layout from '@/components/layout';
import { useAuth } from '@/lib/auth';
import IVehicle from '@/lib/vehicle/IVehicle';
import { getVehiclesForUser, deleteVehicle as dbDeleteVehicle } from '@/lib/db';
import AddVehicleModal from '@/components/AddVehicleModal';

export default function Home({}) {
    const auth = useAuth();

    const [vehicles, setVehicles] = useState<IVehicle[]>([
        { id: '0', name: 'Demo-Fahrzeug', userId: '2', kilometer: 40000 },
    ]);

    useEffect(() => {
        loadVehicles();
    }, [auth]);

    async function deleteVehicle(vehicleId: string) {
        await dbDeleteVehicle(vehicleId);
        await loadVehicles();
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

    return (
        <Layout>
            <AddVehicleModal />

            {vehicles?.map((vehicle) => (
                <div key={vehicle.id}>
                    <p>
                        {vehicle.name} ({vehicle.id}) von {vehicle.userId}
                    </p>
                    <Button onClick={() => deleteVehicle(vehicle.id)}>
                        <DeleteIcon />
                    </Button>
                </div>
            ))}
        </Layout>
    );
}
