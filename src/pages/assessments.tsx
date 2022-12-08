import { NextPageWithLayout } from './page';
import PrimaryLayout from 'src/components/Layouts/primary/PrimaryLayout';
import { useContext, useEffect, useState } from 'react';
import { useApiHelper } from 'src/utility';

import AssessmentCard from 'src/components/Common/Cards/AssessmentCard';
import AuthContext from 'src/context/Auth/AuthContext';

const Assessments: NextPageWithLayout = () => {
  const [publicAssessment, setPublicAssessment] = useState([]);

  const api = useApiHelper();
  const gContext = useContext(AuthContext);

  useEffect(() => {
    api
      .getPublicAssessments()
      .then((response: any) => {
        setPublicAssessment(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {gContext.isJobSeeker && (
        <h1 className="text-center text-2xl my-5">
          Try these public assessments
        </h1>
      )}
      {gContext.isEmployer && (
        <h1 className="text-center text-2xl my-5 bg-red-400 py-5">
          Sorry you can't access this
        </h1>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {publicAssessment.map((item: any, index) => (
          <AssessmentCard
            key={item.id}
            title={item.title}
            type={item.type}
            duration={item.duration}
            id={item.id}
            created_by={item.created_by}
          />
        ))}
      </div>
    </>
  );
};

export default Assessments;

Assessments.getLayout = (page) => {
  return <PrimaryLayout>{page}</PrimaryLayout>;
};
