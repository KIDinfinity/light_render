import React, { useEffect } from 'react';
import { useDispatch } from 'dva';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import bpm, { BPM } from 'bpm/pages/OWBEntrance';
import EntryErrorsUpdate from './Entry.ErrorsUpdate';
import actionConfig from './action.config';
import { NAMESPACE } from './activity.config';
import FEXApproval from './index';
import NamespaceProvider from 'basic/components/NamespaceProvider';
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

  return (
    <NamespaceProvider namespace={NAMESPACE}>
      <BPM>
        <BPM.Header>
          <BPM.HeaderTitle>
            {formatMessageApi({
              activity: taskDetail.taskDefKey,
            })}
          </BPM.HeaderTitle>
          <OverdueTime overdueTime={overdueTime} />
        </BPM.Header>
        {businessData && <FEXApproval taskDetail={taskDetail} businessData={businessData} />}
        <EntryErrorsUpdate />
      </BPM>
    </NamespaceProvider>
  );
};

export default Entry;
