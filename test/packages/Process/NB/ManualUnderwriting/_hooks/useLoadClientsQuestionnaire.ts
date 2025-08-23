import { useEffect } from 'react';
import { useDispatch } from 'dva';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default ({ businessNo, caseCategory }: any) => {
  const dispatch = useDispatch();
  useEffect(() => {
    async function a() {
      const useOld = await dispatch({
        type: `${NAMESPACE}/checkQuestionnaireSwitch`,
        payload: {
          businessNo,
          caseCategory,
        },
      });
      if (useOld) {
        await dispatch({
          type: `${NAMESPACE}/getClientsQuestionnaire`,
          payload: {
            businessNo,
          },
        });
      }
    }
    a();
  }, [businessNo]);
};
