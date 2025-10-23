import React, { useEffect } from 'react';
import { useDispatch } from 'dva';
import bpm, { OpusBPM } from 'bpm/pages/OWBEntrance';
import EntryErrorsUpdate from './Entry.ErrorsUpdate';
import { NAMESPACE } from '../ManualUnderwriting/activity.config';
import QualityControl from './index';
import NamespaceProvider from 'basic/components/NamespaceProvider';
import useGetActionButtonConfig from './useGetActionButtonConfig';
import convert_businessDataBEToFE from 'opus/Utils/convert_businessDataBEToFE';
import { tenant } from '@/components/Tenant';

const Entry = ({ taskDetail, businessData }: any) => {
  const NewBusiness = convert_businessDataBEToFE({ requestData: businessData }, tenant.region());

  const actionConfig = useGetActionButtonConfig();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/setCurrencyEditable`,
      payload: {
        currencyEditable: false,
      },
    });
    dispatch({
      type: `${NAMESPACE}/getAuditLogExists`,
      payload: {
        processInstanceId: taskDetail?.processInstanceId,
        inquiryBusinessNo: taskDetail?.inquiryBusinessNo,
        taskId: taskDetail?.taskId,
        platformCode: 'opus',
      },
    });
    dispatch({
      type: `${NAMESPACE}/getWarnNotices`,
      payload: { taskDetail },
    });
  }, []);

  bpm.setActionConfig(actionConfig);
  bpm.setClaimDataSelector((state: any) => state.manualUnderwriting);

  return (
    <NamespaceProvider namespace={NAMESPACE}>
      <OpusBPM>
        <OpusBPM.Header />
        {NewBusiness && <QualityControl taskDetail={taskDetail} businessData={NewBusiness} />}
        <EntryErrorsUpdate />
      </OpusBPM>
    </NamespaceProvider>
  );
};

export default Entry;
