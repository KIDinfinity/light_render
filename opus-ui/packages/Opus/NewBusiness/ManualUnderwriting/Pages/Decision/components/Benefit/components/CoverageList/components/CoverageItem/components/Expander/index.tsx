import React from 'react';
import Exclusion from './components/Exclusion/index';
import Loading from './components/Loading/index';

const Expander = ({ record }: any) => {
  return (
    <>
      {React.useMemo(() => {
        return (
          <>
            <Loading record={record} />
            <Exclusion record={record} />
          </>
        );
      }, [record])}
    </>
  );
};

export default Expander;
