import React from 'react';

export interface IStartBtn extends React.ComponentPropsWithoutRef<'button'> {

}

const StartBtn: React.FC<IStartBtn> = ({ className, ...buttonProps }) => {
  return (
    <button className="px-10 py-2 text-2xl border-blue-600 border rounded-md hover:text-white hover:shadow-[inset_13rem_0_0_0] hover:shadow-blue-600 duration-[400ms,700ms] transition-[color,box-shadow]">
      Start Now
    </button>
  );
};

export default StartBtn;
