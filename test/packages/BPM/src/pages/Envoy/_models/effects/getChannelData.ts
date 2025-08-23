import lodash from 'lodash';
import envoyReasonConfigControllerService from '@/services/envoyReasonConfigControllerService';
import type { TData } from 'bpm/pages/Envoy/type';
// import setArgInContent from 'bpm/pages/Envoy/_utils/setArgInContent';
import getChannelDataList from 'bpm/pages/Envoy/_utils/getChannelDataList';

interface IAction {
  payload: {
    reasonCode: string;
    role?: string;
    arg: any;
    channelData: any[];
    type: TData;
  };
}

export default function* ({ payload }: IAction, { select, call, put }) {
  const { reasonCode, role, channelData, type } = payload;
  const caseCategory = yield select((state: any) => state.envoyController.caseCategory);
  let caseReasonConfigs = yield select((state: any) => state.envoyController.caseReasonConfigs);
  let newChannelData;

  if (role) {
    let curCaseReasonConfigs = lodash.get(caseReasonConfigs, caseCategory);
    if (!curCaseReasonConfigs) {
      const response = yield call(envoyReasonConfigControllerService.listConfigs, {
        caseCategory,
      });
      const resultData = lodash.get(response, 'resultData');
      if (lodash.isPlainObject(response) && response.success && lodash.isArray(resultData)) {
        yield put.resolve({
          type: 'saveCaseReasonConfigs',
          payload: {
            caseCategory,
            caseReasonConfigs: resultData,
          },
        });
        caseReasonConfigs = yield select((state: any) => state.envoyController.caseReasonConfigs);
        curCaseReasonConfigs = lodash.get(caseReasonConfigs, caseCategory);
      }
    }
    const reasonConfigs = lodash
      .chain(curCaseReasonConfigs)
      .find({
        reasonCode,
      })
      .value();
    const configsMap = {
      reason: reasonConfigs,
      reminder: lodash.get(reasonConfigs, 'reminderConfigs[0]'),
    };
    newChannelData = getChannelDataList(configsMap[type], role);
  } else {
    newChannelData = lodash.cloneDeep(channelData);
  }
  // for (let channelIdx = 0; channelIdx < newChannelData?.length; channelIdx += 1) {
  //   const content = lodash.get(newChannelData, `[${channelIdx}].content`, '');
  //   lodash.set(
  //     newChannelData,
  //     `[${channelIdx}].content`,
  //     setArgInContent({
  //       arg,
  //       content,
  //     })
  //   );
  // }
  return newChannelData;
}
