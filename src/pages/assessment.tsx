import { NextPageWithLayout } from "./page";
import PrimaryLayout from "src/components/Layouts/primary/PrimaryLayout";
import { useEffect, useState } from "react";
import { useApiHelper } from "src/utility";

import AssessmentCard from "src/components/Common/Cards/AssessmentCard";


const Assessment: NextPageWithLayout = () => {
  const [publicAssessment, setPublicAssessment] = useState([])

  const api = useApiHelper()

  useEffect(() => {
    api.getPublicAssessments().then((response: any) => {
      setPublicAssessment(response);
    }).catch((err) => {
      console.log(err);
    })
  }, [])

  return (
    <>
      <h1 className="text-center text-2xl my-5">Try these public assessments</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {publicAssessment.map((item: any, index) => (
          <AssessmentCard
            key={item.id}
            title={item.title}
            type={item.type}
            duration={item.duration}
            created_by={item.created_by}
          />
        ))

        }
      </div>
    </>
  );
};

export default Assessment;


Assessment.getLayout = (page) => {
  return (
    <PrimaryLayout>{page}</PrimaryLayout>
  )
}