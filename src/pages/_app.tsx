import type { AppProps } from 'next/app';
import '../assets/globals.css';
import '../assets/icons/fontawesome-5/css/all.min.css';
import PrimaryLayout from '../components/Layouts/primary/PrimaryLayout';


function MyApp({ Component, pageProps }: AppProps) {

  return (
    <PrimaryLayout>
      <Component {...pageProps} />
    </PrimaryLayout>
  )
}

export default MyApp;
