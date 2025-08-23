import { useCallback, useMemo } from 'react';
import { useSelector,  useDispatch } from 'dva';
import { shallowEqual } from 'react-redux';
import lodash from 'lodash';
import useGetBatchSendEnvoyOptions from 'bpm/pages/Envoy/hooks/useGetBatchSendEnvoyOptions';
import { batchActivateReasonGroup } from '@/services/navigatorEnvoyControllerService';
import { handleErrorMessageIgnoreXErrorNotice } from '@/utils/commonMessage';
import { transferToJson, argToVal } from 'bpm/pages/Envoy/_utils/dataTransferFn';
import { ETaskStatus } from 'bpm/pages/Envoy/enum';
import bpm from 'bpm/pages/OWBEntrance';
import usePublishEnvoyChange from '@mc/hooks/usePublishEnvoyChange';

export default ({ setLoading, setError }: any) => {
  const options = useGetBatchSendEnvoyOptions();
  const batchEnvoySelected = useSelector(
    (state: any) => state.envoyController.batchEnvoySelected,
    shallowEqual
  );
  const taskStatus = useSelector((state: any) => state.envoyController.taskStatus, shallowEqual);
  const dispatch = useDispatch();
  const handlerEnvoySended = usePublishEnvoyChange();
  const data = useMemo(() => {
    return lodash
      .chain(options)
      .cloneDeep()
      .filter((item: any) => {
        return batchEnvoySelected.includes(item?.id);
      })
      .map((item: any) => {
        return {
          ...item,
          reasonDetails: lodash
            .chain(item)
            .get('reasonDetails', [])
            .map((reason: any) => {
              const reasonReminders = lodash.get(reason, 'reasonReminders', []);
              const reasonJson = transferToJson({
                ...reason,
                reasonReminders: lodash.map(reasonReminders, (reminder: any) => {
                  const reminderJson = transferToJson(reminder);
                  return {
                    ...reminderJson,
                    channelDataList: argToVal(reminderJson.channelDataList),
                  };
                }),
              });
              return {
                ...reasonJson,
                channelDataList: argToVal(reasonJson.channelDataList),
              };
            })
            .value(),
        };
      })
      .value();
  }, [options, batchEnvoySelected]);
  return useCallback(async () => {
    setLoading(true);
    const validators = lodash.map(data, (reasonGroup) => {
      // eslint-disable-next-line
      return new Promise(async (resolve) => {
        const result = await dispatch({
          type: 'envoyController/validateEnvoy',
          payload: {
            reasonGroup,
          },
        });
        resolve(result);
      });
    });
    const validateResults = await Promise.all(validators);
    if (lodash.includes(validateResults, true)) {
      setLoading(false);
      setError(true);
      return false;
    }
    setError(false);
    await bpm.buttonAction('save', { syncData: true });
    const response = await batchActivateReasonGroup(data);
    const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
    if (success) {
      dispatch({
        type: 'envoyController/handleBatchEnvoySelect',
        payload: {
          batchEnvoySelected: [],
        },
      });
      await dispatch({
        type: 'envoyController/getEnvoyInfo',
      });
      if (taskStatus === ETaskStatus.TODO) {
        bpm.reload();
      }
      handlerEnvoySended(resultData);
    } else {
      handleErrorMessageIgnoreXErrorNotice(response);
    }
    setLoading(false);
  }, [data]);
};
