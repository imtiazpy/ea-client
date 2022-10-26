import type { NextPage } from 'next';
import { NextPageWithLayout } from './page';
import PrimaryLayout from '../components/Layouts/primary/PrimaryLayout';

const Home: NextPageWithLayout = () => {
  return (
    <div>
      <p className="text-3xl">
        Hello from index lorem ipsum dolor sit amet lorem ipsum dolor sit amet
        lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor
        sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem
        ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit
        amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet lorem ipsum
        dolor sit amet lorem ipsum dolor sit amet lorem ipsum dolor sit amet
        lorem ipsum dolor sit amet
      </p>
    </div>
  );
};

export default Home;

Home.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
