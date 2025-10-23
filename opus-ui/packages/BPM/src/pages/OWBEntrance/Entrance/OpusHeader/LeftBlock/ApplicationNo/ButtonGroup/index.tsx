import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import Context from 'bpm/pages/OWBEntrance/Context/context';
import { LS, LSKey } from '@/utils/cache';
import FavoriteButton from './FavoriteButton';
import UrgentButton from './UrgentButton';
import CustomerButton from './CustomerButton';
import ResuranceButton from './ReinsuranceButton';
import { addCaseLabel, deleteCaseLabel } from '@/services/bpmCaseLabelService';
import { findBizProcess } from '@/services/bpmBusinessProcessService';
import { tenant } from '@/components/Tenant';
import lodash from 'lodash';

import styles from './index.less';

const ButtonGroup = () => {
  const {
    state: {
      taskDetail: { assignee, taskStatus, taskId, caseNo, inquiryBusinessNo },
    },
  } = useContext(Context);
  const { userId, businessCode } = LS.getItem(LSKey.CURRENTUSER) || {};
  const [caseLabelList, setCaseLabelList] = useState([]);

  const showGroup = useMemo(
    () => userId === assignee && taskStatus === 'todo',
    [userId, assignee, taskStatus]
  );

  const showUrgent = businessCode === 'BIZ001';
  const showCustomer = tenant?.isJP();
  const showReinsurance = tenant?.isJP();

  const customerHighlighted = lodash.some(
    caseLabelList,
    (item: any) => item.labelCode === 'contactCustomer' && item.labelValue === 'Y'
  );
  const reinsurancehighlighted = lodash.some(
    caseLabelList,
    (item: any) => item.labelCode === 'contactReinsurance' && item.labelValue === 'Y'
  );

  const getCaseLabelList = useCallback(async () => {
    if (!caseNo) {
      return;
    }

    const caseDetailResponse = await findBizProcess(
      {
        processInstanceId: caseNo,
      },
      { localCache: false }
    );
    if (
      lodash.isPlainObject(caseDetailResponse) &&
      caseDetailResponse?.success &&
      lodash.isPlainObject(caseDetailResponse?.resultData)
    ) {
      const labelList = lodash.get(caseDetailResponse, 'resultData.indicator.caseLabelList');

      setCaseLabelList(labelList);
    }
  }, [caseNo]);

  const onToggle = useCallback(
    async (labelCode: string, on: boolean) => {
      if (on) {
        await addCaseLabel({ caseNo, inquiryBusinessNo, labelCode, labelValue: 'Y' });
      } else {
        await deleteCaseLabel({ caseNo, labelCode });
      }

      getCaseLabelList();
    },
    [caseNo, getCaseLabelList, inquiryBusinessNo]
  );

  useEffect(() => {
    getCaseLabelList();
  }, [getCaseLabelList]);

  return (
    <>
      {!!showGroup && (
        <div className={styles.buttonGroup}>
          <FavoriteButton newShow={showGroup} userId={userId} taskId={taskId} />
          {showUrgent && <UrgentButton taskId={taskId} />}
          {showCustomer && (
            <CustomerButton
              highlighted={customerHighlighted}
              onToggle={() => onToggle('contactCustomer', !customerHighlighted)}
            />
          )}
          {showReinsurance && (
            <ResuranceButton
              highlighted={reinsurancehighlighted}
              onToggle={() => onToggle('contactReinsurance', !reinsurancehighlighted)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default ButtonGroup;
