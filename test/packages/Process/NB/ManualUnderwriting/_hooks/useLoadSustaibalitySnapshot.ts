import { useEffect } from 'react';
import { useDispatch, useSelector,  } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import { queryData } from '@/services/dcSnapshotService';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { safeParseUtil } from '@/utils/utils';
import judgeDisplaySustainabiliy from 'process/NB/ManualUnderwriting/utils/judgeDisplaySustainabiliy';

export const handleInitSustaibality = async ({ dispatch, businessNo, taskId }) => {
  const response = await queryData({
    businessNo,
    dataType: 'tempBusinessData',
    taskId,
  });
  const { resultData, success } = lodash.pick(response, ['success', 'resultData']);
  if (success) {
    const dataValue = lodash.get(resultData, 'dataValue');
    const businessData = safeParseUtil(dataValue);

    const possibleSusOptNames = lodash.get(businessData, 'possibleSusOptNames');
    if (lodash.isArray(possibleSusOptNames)) {
      dispatch({
        type: `${NAMESPACE}/savePossibleSusOptNames`,
        possibleSusOptNames,
      });
    }
    const sustainabilityData = judgeDisplaySustainabiliy({ businessData })
      ? { sustainabilityModalBtnVisible: true, businessData: businessData }
      : { sustainabilityModalBtnVisible: false, businessData: {} };
    dispatch({
      type: `${NAMESPACE}/setSustainabilityModalBtnVisable`,
      payload: {
        sustainabilityModalBtnVisible: sustainabilityData.sustainabilityModalBtnVisible,
      },
    });
    dispatch({
      type: `${NAMESPACE}/setSustainabilityCheckingData`,
      payload: {
        sustainabilityCheckingData: sustainabilityData.businessData,
      },
    });
  }
};

export default () => {
  const dispatch = useDispatch();

  const { businessNo, taskId } =
    useSelector(({ processTask }: any) => processTask?.getTask, shallowEqual) || {};

  useEffect(() => {
    (async () => {
      if (taskId && businessNo) {
        handleInitSustaibality({ businessNo, dispatch, taskId });
      }
    })();
  }, [taskId, businessNo]);
};
