import React, { useState } from 'react';
import { Button } from 'antd';
import { useSelector, useDispatch } from 'dva';
import lodash from 'lodash';

import { NAMESPACE } from 'opus/Pages/Process/Claim/NonOpusSupportedClaim/activity.config';

import { formatMessageApi } from '@/utils/dictFormatMessage';

import { formUtils } from 'basic/components/Form';

import { getTouch } from 'opus/Components/Touch';

import EmptyData from 'opus/Components/EmptyData/Default';

import Title from '../Title';
import Basic from './Basic';
import Rider from './Rider';

import styles from './index.less';

const Main = ({ data, editable }: any) => {
  const dispatch = useDispatch();

  const taskDetail = useSelector(({ processTask }: any) => processTask.getTask) || {};
  const taskNotEditable =
    useSelector(({ claimEditable }: any) => claimEditable?.taskNotEditable) || false;

  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    const errors = await dispatch({
      type: `${NAMESPACE}/claimEstimateValidate`,
    });

    if (lodash.isEmpty(errors)) {
      setLoading(true);
      const dataForSubmit = await dispatch({
        type: `${NAMESPACE}/getDataForSubmit`,
      });

      const params = {
        caseNo: taskDetail?.processInstanceId,

        ...lodash.pick(taskDetail, [
          'taskId',
          'processInstanceId',
          'caseCategory',
          'businessNo',
          'assignee',
        ]),
        activityKey: taskDetail?.taskDefKey,
        operationType: 'claimEstimate',
        businessData: {
          ...formUtils.formatFlattenValue(formUtils.cleanValidateData(dataForSubmit)),
        },
      };

      const response: any = await getTouch({ params });
      if (
        !!response &&
        lodash.isPlainObject(response?.businessData) &&
        lodash.isPlainObject(
          response?.businessData?.nonSupportClaimEstimation?.claimEstimationResult
        ) &&
        lodash.isArray(
          response?.businessData?.nonSupportClaimEstimation?.claimEstimationResult
            ?.claimEstimationResultDetailList
        )
      ) {
        // TODO:这里需要加claimEstimationResultDetailList非空判断
        dispatch({
          type: `${NAMESPACE}/claimEstimateResultRidersUpdate`,
          payload: {
            list:
              response?.businessData?.nonSupportClaimEstimation?.claimEstimationResult
                ?.claimEstimationResultDetailList || [],
          },
        });
      }
      setLoading(false);
    }
  };
  const ridersList = data?.claimEstimationResultDetailList || [];

  return (
    <div className={styles.resultWrap}>
      <Title title={formatMessageApi({ Label_CLM_Opus: 'claimEstimationResults' })} />
      <Basic item={data} editable={editable} />

      {!taskNotEditable && (
        <Button
          loading={loading}
          className={styles.buttonWrap}
          onClick={() => {
            handleClick();
          }}
        >
          {formatMessageApi({ Label_CLM_Opus: 'quickClaimEstimate' })}
        </Button>
      )}

      <Rider list={ridersList} editable={editable} />

      {lodash.isEmpty(ridersList) && (
        <div className={styles.emptyWrap}>
          <EmptyData />
        </div>
      )}
    </div>
  );
};

export default Main;
