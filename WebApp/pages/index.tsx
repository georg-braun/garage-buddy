import Head from 'next/head';

import LoginScreen from '../components/LoginScreen';
import LoadingSpin from '../components/LoadingSpin';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';

export default function Home({}) {
    return (
        <Layout>
            <Head>
                <title>{siteTitle}</title>
            </Head>
        </Layout>
    );
}
