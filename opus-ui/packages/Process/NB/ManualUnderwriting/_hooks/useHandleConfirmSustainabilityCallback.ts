import lodash from 'lodash';
import { useCallback } from 'react';
import { EOptionType } from 'basic/enum/EOptionType';
import { saveSnashot } from 'basic/utils/SnapshotTool';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';

import logButton from '@/components/AuditLog/API/logButton';
import { formatMessageApi } from '@/utils/dictFormatMessage';

import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';
import { handleErrorMessageIgnoreXErrorNotice } from '@/utils/commonMessage';
import { sustainabilityConfirm } from '@/services/owbNbProposalControllerService';
import useGetSustainabilityCheckingSelectedResult from 'process/NB/ManualUnderwriting/_hooks/useGetSustainabilityCheckingSelectedResult';
import useHandleCloseSustainabilityCaseModalVisible from 'process/NB/ManualUnderwriting/_hooks/useHandleCloseSustainabilityCaseModalVisible';
import useGetSustainabilityCheckingData from 'process/NB/ManualUnderwriting/_hooks/useGetSustainabilityCheckingData';
import bpm from 'bpm/pages/OWBEntrance';

export default () => {
  const selectedData = useGetSustainabilityCheckingSelectedResult();
  const dispatch = useDispatch();
  const handleClose = useHandleCloseSustainabilityCaseModalVisible();
  const taskDetail = useSelector(({ processTask }: any) => processTask.getTask, shallowEqual);
  const checkingData = useGetSustainabilityCheckingData();
  return useCallback(async () => {
    const response = await sustainabilityConfirm(selectedData);

    const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

    if (success) {
      dispatch({
        type: `${NAMESPACE}/saveBizData`,
        payload: {
          businessData: resultData?.businessData,
        },
      });
      dispatch({
        type: `${NAMESPACE}/saveProposalFlags`,
        payload: {
          ...lodash.pick(resultData?.businessData, [
            'needPremRecal',
            'newSiRequired',
            'needResendCol',
          ]),
        },
      });
      logButton({
        caseNo: taskDetail?.processInstanceId,
        activityKey: formatMessageApi({ Label_BPM_Button: 'Sustainability Options' }),
        buttonCode: 'save',
        isAuto: false,
        dispatch,
      });
      await saveSnashot({
        taskDetail,
        dataForSubmit: checkingData,
        dataType: 'tempBusinessData',
        optionType: EOptionType.Save,
      });
      bpm.buttonAction('save');
    }
    if (!success) {
      handleErrorMessageIgnoreXErrorNotice(response);
    }
    handleClose();
  }, [selectedData, handleClose, taskDetail, checkingData]);
};
