import React from 'react';
import Exclusion from './components/Exclusion';
import Loading from './components/Loading';
import DPRemark from './components/DPRemark';

const Expander = ({ record }: any) => {
  return (
    <>
      {React.useMemo(() => {
        return (
          <>
            <Loading record={record} />
            <Exclusion record={record} />
            <DPRemark record={record} />
          </>
        );
      }, [record])}
    </>
  );
};

export default Expander;
