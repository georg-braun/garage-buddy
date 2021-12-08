import { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import { AuthProvider } from '../lib/infrastructure/auth';
import '../styles/global.css';

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider>
            <AuthProvider>
                <Component {...pageProps} />
            </AuthProvider>
        </ChakraProvider>
    );
}
