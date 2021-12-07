import React from 'react';

import Layout from '@/components/layout';
import { Box, Center, Flex, Heading } from '@chakra-ui/layout';

export default function Home({}) {
    return (
        <Layout>
            <Center mt="20">
                <Heading>Garage Buddy</Heading>
                
            </Center>
        </Layout>

        /*
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
            <main>Hello</main>
        </Layout>
        */
    );
}
