import Head from 'next/head';

import { useAuth } from '@/lib/auth';

import React, { useState, useEffect } from 'react';
import { Box, Flex, Heading } from '@chakra-ui/layout';

import { Button } from '@chakra-ui/button';
import Layout from '@/components/layout';
import IVehicle from '@/lib/vehicle/IVehicle';
import { createVehicle, getVehiclesForUser } from '@/lib/db';

export default function Home({}) {
    const auth = useAuth();

    const [vehicles, setVehicles] = useState<IVehicle[]>([
        { id: '0', name: 'Test-Fahrzeug', userId: '2', kilometer: 40000 },
    ]);

    useEffect(() => {
        loadVehicles();
    }, [auth]);

    function addVehicle() {
        const userId = auth.user.uid;
        const testVehicle: IVehicle = { id: '0', name: 'Test-Fahrzeug', userId: userId, kilometer: 40000 };
        createVehicle(testVehicle);
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
            <Button onClick={addVehicle}>+</Button>

            {vehicles?.map((vehicle) => (
                <p key={vehicle.id}>
                    {vehicle.name} ({vehicle.id}) von {vehicle.userId}
                </p>
            ))}
        </Layout>
    );
}
