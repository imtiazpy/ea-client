import { NextPageWithLayout } from './page';
import SidebarLayout from '../components/Layouts/sidebar/SidebarLayout';

export interface IDashboard extends React.ComponentPropsWithoutRef<'div'> {}

const Dashboard: NextPageWithLayout = () => {
  return (
    <div className='bg-slate-600 p-5'>
      Hello from the Dashboard Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Fuga ut accusantium nam tempora quia natus! Deleniti
      aliquid cupiditate, hic esse magnam voluptatum ab voluptate, harum ea
      quibusdam architecto velit reiciendis. Lorem ipsum dolor sit, amet
      consectetur adipisicing elit. Consequatur eaque cumque sit? Unde, beatae?
      Deserunt, rem est sit quidem voluptate dolorum, voluptatum odio accusamus
      unde earum non distinctio omnis eveniet.
    </div>
  );
};

export default Dashboard;

// TODO: we will use a different layout for the dashboard, not the PrimaryLayout

Dashboard.getLayout = (page) => {
  return <SidebarLayout>{page}</SidebarLayout>;
};
