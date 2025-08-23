import React, { useEffect } from 'react';
import { useDispatch } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import bpm, { BPM } from 'bpm/pages/OWBEntrance';
import EntryErrorsUpdate from './Entry.ErrorsUpdate';
import actionConfig from './action.config';
import ManualUnderwriting from '../ManualUnderwriting';
import { NAMESPACE } from '../ManualUnderwriting/activity.config';
import useGetOverDueTime from 'navigator/components/CaseTaskDetail/hooks/useGetOverDueTime';
import OverdueTime from 'bpm/pages/OWBEntrance/Header/OverdueTime';

const Entry = ({ taskDetail, businessData }: any) => {
  const dispatch = useDispatch();
  const overdueTime = useGetOverDueTime();
  useEffect(() => {
    dispatch({
      type: `${NAMESPACE}/setCurrencyEditable`,
      payload: {
        currencyEditable: false,
      },
    });
  }, []);

  bpm.setActionConfig(actionConfig);
  bpm.setClaimDataSelector((state: any) => state.manualUnderwriting);

  return (
    <BPM>
      <BPM.Header>
        <BPM.HeaderTitle>
          {formatMessageApi({
            activity: taskDetail.taskDefKey,
          })}
        </BPM.HeaderTitle>
        <OverdueTime overdueTime={overdueTime} />
      </BPM.Header>
      {businessData && <ManualUnderwriting taskDetail={taskDetail} businessData={businessData} />}
      <EntryErrorsUpdate />
    </BPM>
  );
};

export default Entry;
