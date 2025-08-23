import { useEffect } from 'react';
import lodash from 'lodash';
import { useDispatch, useSelector } from 'dva';
import { shallowEqual } from 'react-redux';
import { NAMESPACE } from 'process/NewBusiness/ManualUnderwriting/activity.config';

export default ({ businessData }: any) => {
  const dispatch = useDispatch();
  const originDataVoiceRecord = useSelector(
    ({ [NAMESPACE]: modelNamespace }: any) =>
      lodash.get(modelNamespace.businessData, 'policyList[0].voiceRecord'),
    shallowEqual
  );

  const applicationNo = lodash.get(businessData, 'applicationNo', '');
  const agentList = lodash.get(businessData, 'agentList', []);
  const { agentNo } = lodash.find(agentList, (item: any) => item?.agentType === 'P') || {};
  const voiceRecord = lodash.get(businessData, 'policyList[0].voiceRecord', {});
  useEffect(() => {
    const composeVoiceRecord = {
      ...(originDataVoiceRecord || voiceRecord),
      agentNo,
      applicationNo,
    };

    dispatch({
      type: `${NAMESPACE}/setVoiceRecord`,
      payload: {
        voiceRecord: composeVoiceRecord,
      },
    });
  }, [agentNo, applicationNo, dispatch, originDataVoiceRecord, voiceRecord]);
};
