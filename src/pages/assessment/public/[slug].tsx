import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import StartBtn from 'src/components/Buttons/StartBtn';
import { CustomLink } from 'src/components/Common';
import { useApiHelper } from 'src/utility';



// Public assessment detail page
const Assessment = (props: any) => {

  const [data, setData] = useState<any>({});

  const api = useApiHelper();

  const convertDuration = (duration: String) => {
    if (duration) {
      const [hours, minutes, seconds] = duration.split(':');
      const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
      return totalMinutes
    }
  }

  useEffect(() => {
    api.retrievePublicAssessment(props.slug).then(response => {
      setData(response)
    }).catch(err => {
      //
    })
  }, [])

  return (
    <div>
      <nav className="shadow-sm w-full">
        <div className="w-full">
          <div className="flex items-center h-20 w-full">
            <div className="flex items-center xs:mx-2 sm:mx-2 md:mx-20 justify-between w-full">
              <div className="flex justify-center items-center flex-shrink-0 ">
                <h1 className=" font-bold text-xl cursor-pointer">
                  <CustomLink to="/" scroll={false}>
                    E<span className="text-blue-600">A</span>
                  </CustomLink>
                </h1>
              </div>
              <div className="ml-10 flex items-baseline space-x-4">
                <h4 className='xs:text-lg md:text-xl'>{data.title}</h4>
              </div>
              <div className='flex justify-between items-center gap-2'>
                <i className="fas fa-stopwatch text-blue-600"></i>
                <p>Time left: {data.duration}</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <section className='px-2 md:px-10 py-10 text-center bg-slate-100 h-screen'>
        <div className="flex flex-col justify-center">
          <p className='mb-10 text-xl'>You can move between questions</p>
          <div className='bg-white xs:px-2 py-10 md:mx-10 lg:mx-20 border border-blue-600 rounded-md flex flex-col justify-between'>
            <div className='flex flex-col items-center justify-center sm:leading-8 md:leading-10'>
              <p className='text-2xl'>You have <span className='text-red-500'>{convertDuration(data.duration)} minutes</span> to answer {data?.mc_questions?.length} questions</p>
              <p>You can change your response to questions before the test ends.</p>
              <p>You can take the test only once, so do your best.</p>
            </div>

            <div className='mt-10'>
              <StartBtn />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Assessment;

export async function getServerSideProps(context: any) {

  return {
    props: { slug: context.params.slug }
  }
}