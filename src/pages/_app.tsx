import type { AppProps } from 'next/app';
import '../assets/globals.css';
import '../assets/icons/fontawesome-5/css/all.min.css';
import PrimaryLayout from '../components/Layouts/primary/PrimaryLayout';
import { AuthProvider } from '../context/Auth/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <PrimaryLayout>
        <Component {...pageProps} />
      </PrimaryLayout>
    </AuthProvider>
  );
}

export default MyApp;
