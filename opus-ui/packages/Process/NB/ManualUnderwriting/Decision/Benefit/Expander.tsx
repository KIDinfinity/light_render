import React from 'react';
import Exclusion from './Exclusion';
import Loading from './Loading';
import DPRemark from './DPRemark';

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
