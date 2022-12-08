import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { CustomLink } from 'src/components/Common';
import { useApiHelper } from 'src/utility';




const Assessment = () => {

  const [data, setData] = useState<any>({});

  const router = useRouter()
  const { id } = router.query
  const api = useApiHelper();

  const convertDuration = (duration: String) => {
    if (duration) {
      const [hours, minutes, seconds] = duration.split(':');
      const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
      return totalMinutes
    }
  }

  useEffect(() => {
    api.retrievePublicAssessment(id).then(response => {
      setData(response)
    }).catch(err => {
      //
    })
  }, [])

  return (
    <div>
      <nav className="shadow-sm w-full z-10">
        <div className="w-full">
          <div className="flex items-center h-20 w-full">
            <div className="flex items-center  mx-20  justify-between w-full">
              <div className="flex justify-center items-center flex-shrink-0 ">
                <h1 className=" font-bold text-xl cursor-pointer">
                  <CustomLink to="/" scroll={false}>
                    E<span className="text-blue-600">A</span>
                  </CustomLink>
                </h1>
              </div>
              <div className="ml-10 flex items-baseline space-x-4">
                <p>{data.title}</p>
              </div>
              <div>
                <p>Time left: {data.duration}</p>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className='p-5 text-center bg-slate-100'>
        <p className='m-5'>You can move between questions</p>
        <div className='bg-white p-5'>
          <p>You have {convertDuration(data.duration)} minutes</p>
        </div>
      </div>
    </div>
  );
};

export default Assessment;