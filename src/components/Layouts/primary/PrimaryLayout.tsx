import Head from 'next/head';
import { ReactNode } from 'react';

import Header from '../../navigation/Header/Header';
import Footer from '../../navigation/Footer/Footer';
import SignUpModal from '../../../components/Modals/Auth/SignUp/SignUpModal';
import { ModalsProvider } from '../../../context/Modals/ModalsContext';
import SignInModal from '../../../components/Modals/Auth/SignIn/SignInModal';

export interface IPrimaryLayout extends React.ComponentPropsWithoutRef<'div'> {
  justify?: 'items-center' | 'items-start';
}

const PrimaryLayout: React.FC<IPrimaryLayout> = ({ children, ...divProps }) => {
  return (
    <>
      {/* wrapping header with ModalsProvider to get the access to Modal toggling method */}
      <ModalsProvider>
        <Header />
        {/* Modals */}
        <SignUpModal />
        <SignInModal />
      </ModalsProvider>

      <main className="md:container">{children}</main>

      <Footer />
    </>
  );
};

export default PrimaryLayout;
