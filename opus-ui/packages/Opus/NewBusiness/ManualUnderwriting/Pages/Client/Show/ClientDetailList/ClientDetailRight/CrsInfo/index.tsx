import React from 'react';
import Section from './Section';
import FinancialSection from './FinancialSection';
import { useShowCrsInfo } from 'opus/NewBusiness/ManualUnderwriting/_hooks';

export default (props: any) => {
  const { clientId } = props;

  const isShow = useShowCrsInfo(clientId, 'show');

  return (
    <>
      {isShow && (
        <>
          <Section {...props} />
          <FinancialSection clientId={clientId} />
        </>
      )}
    </>
  );
};
