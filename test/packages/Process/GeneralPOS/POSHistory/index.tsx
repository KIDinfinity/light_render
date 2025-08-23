import React from 'react';
import CaseTaskDetail from 'navigator/components/CaseTaskDetail';
import { tenant } from '@/components/Tenant';
import PHNotCFTInface from './PHNotCFTInface'
import PHCFTDecision from './PHCFTDecision'
import lodash from 'lodash'
import { useParams } from 'umi';

const History = (props: any) => {
  const params = useParams();
  const caseCategory = params?.caseCategory;
  const PHNotCFT=lodash.includes(['PH_POS_CTG002', 'PH_POS_CTG001'],caseCategory)
  return (
    <>
      {
        PHNotCFT && tenant.region() === 'PH' ? <PHNotCFTInface {...props} /> : <PHCFTDecision  {...props}/>
      }
    </>
  );
};

export default (props) => (
  <CaseTaskDetail.Consumer>
    <History {...props} />
  </CaseTaskDetail.Consumer>
);
