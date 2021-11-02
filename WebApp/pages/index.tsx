import Head from 'next/head';

import { useAuth } from '@/lib/auth';

import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/layout';

import { Button } from '@chakra-ui/button';
import Layout from '@/components/layout';

export default function Home({}) {
    return (
        <Layout>
            <p>Hi garage buddy</p>
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
