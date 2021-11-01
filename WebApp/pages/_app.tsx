import { AuthProvider } from '../lib/auth';
import '../styles/global.css';

export default function App({ Component, pageProps }) {
    return (
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
}
