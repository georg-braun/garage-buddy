import Head from 'next/head';
import { useAuth } from '@/lib/infrastructure/auth';
import styles from './layout.module.css';
import Link from 'next/link';
import { Center, Flex, Heading, Spacer } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Icon } from '@chakra-ui/react';
import { AiFillGithub, AiFillGoogleCircle } from 'react-icons/ai';

export const siteTitle = 'Inspektionen';

// eslint-disable-next-line react/prop-types
export default function Layout({ children }) {
    const auth = useAuth();

    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="Learn how to build a personal website using Next.js" />
                <meta
                    property="og:image"
                    content={`https://og-image.vercel.app/${encodeURI(
                        siteTitle,
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.zeit.co%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            {auth?.user ? (
                <Flex direction="column">
                    <Flex w="100vw" bg="gray.200" alignItems="center" justifyContent="space-between" p="3" wrap="wrap">
                        <Flex mr="5">
                            <Link href="/">🏠 Startseite</Link>
                        </Flex>
                        <Flex>
                            <Link href="/vehicle">🚘 Fahrzeuge</Link>
                        </Flex>
                        <Spacer />
                        <Flex>🧔 {auth.user.email}</Flex>
                        <Flex>
                            <Button colorScheme="blue" size="xs" ml="5" onClick={() => auth.signout()}>
                                Sign Out
                            </Button>
                        </Flex>
                    </Flex>
                    <Center padding="10">
                        <div>{children}</div>
                    </Center>
                </Flex>
            ) : (
                <Flex h="100vh" alignItems="center" justifyContent="center">
                    <Flex direction="column" alignItems="center" padding="10" rounded="6">
                        <Heading>Garage</Heading>
                        <Heading mb="8">Buddy</Heading>
                        <Flex>
                            <Button size="sm" colorScheme="blue" w="3rem" mr="1rem" onClick={() => auth?.signinWithGithub()}>
                                <Icon  as={AiFillGithub} />
                            </Button>
                            <Button size="sm" colorScheme="blue" w="3rem" onClick={() => auth?.signinWithGoogle()}>
                                <Icon as={AiFillGoogleCircle} />
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>
            )}
        </div>
    );
}
