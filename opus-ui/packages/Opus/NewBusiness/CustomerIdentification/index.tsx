import React from 'react';
import { connect } from 'dva';
import setInsured360Hoc from 'bpm/components/Hoc/setInsured360Hoc';
import setClaimEditableHoc from 'claim/components/Hoc/setClaimEditableHoc';
import PageContainer from 'basic/components/Elements/PageContainer';
import Client from '../ManualUnderwriting/Pages/Client';
import useInitBusinessData from './_hooks/useInitBusinessData';
import EditMode from './_enum/EidtMode';
import useUpdateBusinessData from './_hooks/useUpdateBusinessData';

const CustomerIdentification = ({ businessData, taskDetail, needUpdate }: any) => {
  useInitBusinessData({ businessData, taskDetail });
  useUpdateBusinessData({ businessData, taskDetail, needUpdate });
  return (
    <PageContainer
      pageConfig={{ caseCategory: taskDetail?.caseCategory, activityKey: taskDetail?.activityKey }}
    >
      <Client editMode={EditMode.Plain} />
    </PageContainer>
  );
};

export default connect()(setClaimEditableHoc(setInsured360Hoc(CustomerIdentification)));
