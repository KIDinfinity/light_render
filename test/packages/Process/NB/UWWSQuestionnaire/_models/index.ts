import lodash from 'lodash';
import { produce }  from 'immer';
import { getUWMEReturnUrlRequestParams } from '@/services/owbNbProposalControllerService';

export default {
  state: {
    UWMERequestParams: {},
  },

  effects: {
    *getUWMEReturnUrlRequestParams({ payload }: any, { call, put }: any) {
      const MUSubmitData = lodash.get(payload, 'MUSubmitData', '');
      const response = yield call(getUWMEReturnUrlRequestParams, {
        ...lodash.get(MUSubmitData, 'businessData', {}),
        reCalculateFlag: null,
      });
      if (response?.success) {
        yield put({
          type: 'saveUWMERequestParams',
          payload: {
            UWMERequestParams: response?.resultData || {},
          },
        });
      }
      return response;
    },
  },

  reducers: {
    saveUWMERequestParams(state: any, action: any) {
      const UWMERequestParams = lodash.get(action, 'payload.UWMERequestParams', {});
      const nextState = produce(state, (draftState: any) => {
        lodash.set(draftState, 'UWMERequestParams', UWMERequestParams);
      });
      return {
        ...nextState,
      };
    },
  },
};
