import { useEffect } from 'react';
import StartBtn from 'src/components/Buttons/StartBtn';
import CustomLink from '../Link';

export interface IAssessmentCard extends React.ComponentPropsWithoutRef<'div'> {
  title: string;
  type: string;
  duration: string;
  slug: string;
  created_by: Number;
}

const AssessmentCard: React.FC<IAssessmentCard> = ({
  className,
  title,
  type,
  duration,
  slug,
  created_by,
  ...divProps
}) => {
  return (
    <div
      className="flex flex-col gap-10 py-5 px-10 my-5 text-left border border-blue-600 rounded-md"
      data-aos="fade-left"
      data-aos-delay="300"
      data-aos-easing="linear"
    >
      <div className="flex flex-col gap-4">
        <p className="text-blue-600">{type}</p>
        <h1>{title}</h1>
        <p className="text-gray-600 text-sm">
          To start the assessment, please click on Start Now
        </p>
      </div>
      <div>
        {/* <StartBtn /> */}
        <CustomLink
          to={`assessment/public/${slug}`}
          scroll={false}
        >
          Take the test
        </CustomLink>
      </div>
    </div>
  );
};

export default AssessmentCard;
