import { useState, useEffect } from 'react';
import { useSelector } from 'dva';
import useMCSubscribeConversation from 'navigator/pages/Messager/MCSubscribe/useMCSubscribeConversation';
import { checkHasUnreadInfo } from '@/services/bpmInfoControllerService';
import { checkHasUnreadReasonGroup } from '@/services/envoyReasonInfoControllerService';

export default ({ taskDetail }: any) => {
  const [chatNotify, setChatNotify] = useState(false);
  const [infoNotify, setInfoNotify] = useState(false);
  const [envoyNotify, setEnvoyNotify] = useState(false);

  useMCSubscribeConversation();
  const messagerTotal = useSelector((state: any) => state.converseController.messagerTotal);
  const isCallAllCategoryInformation = useSelector(
    (state: any) => state.navigatorInformationController.isCallAllCategoryInformation
  );
  const isCallFindReasonInfo = useSelector(
    (state: any) => state.envoyController.isCallFindReasonInfo
  );

  useEffect(() => {
    setChatNotify(messagerTotal > 0);
  }, [messagerTotal]);

  useEffect(() => {
    const check = async () => {
      if (taskDetail) {
        const response = await checkHasUnreadInfo({
          caseNo: taskDetail.processInstanceId,
          activityCode: taskDetail.taskDefKey,
          linkToList: [{ linkToKey: 'case', linkToValue: taskDetail.processInstanceId }],
        });
        setInfoNotify(response?.resultData === true);
      }
    };
    check();
  }, [taskDetail, isCallAllCategoryInformation]);

  useEffect(() => {
    const check = async () => {
      if (taskDetail) {
        const response = await checkHasUnreadReasonGroup({
          caseNo: taskDetail.processInstanceId,
          activityKey: taskDetail.taskDefKey,
        });
        setEnvoyNotify(response?.resultData === true);
      }
    };
    check();
  }, [taskDetail, isCallFindReasonInfo]);

  return {
    chatNotify,
    infoNotify,
    envoyNotify,
  };
};
