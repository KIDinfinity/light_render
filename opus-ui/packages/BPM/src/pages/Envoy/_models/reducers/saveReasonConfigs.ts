import lodash from 'lodash';
import { produce } from 'immer';

interface IAction {
  payload: {
    reasonConfigs: any;
    envoyEditConfigs: any;
  };
}

export default function saveReasonConfigs(state: any, { payload }: IAction) {
  const envoyEditConfigs = payload?.envoyEditConfigs;
  const reasonConfigs = payload?.reasonConfigs;

  return produce(state, (draftState: any) => {
    const envoyEditConfigItem = lodash.find(envoyEditConfigs, { categoryCode: 'envoyEdit' });
    if (!lodash.isEmpty(envoyEditConfigItem)) {
      const newReasonConfigs = lodash.map(reasonConfigs, (item) => {
        const groupCode = envoyEditConfigItem?.limitJsonObj?.groupCode;
        const envoyEdit = envoyEditConfigItem?.limitJsonObj?.envoyEdit;
        if (envoyEdit === 'Y') {
          return {
            ...item,
            envoyEdit: groupCode
              ? lodash.includes(envoyEditConfigItem?.limitJsonObj?.groupCode, item.code)
              : true,
          };
        }
        if (envoyEdit === 'N') {
          return {
            ...item,
            envoyEdit: groupCode
              ? !lodash.includes(envoyEditConfigItem?.limitJsonObj?.groupCode, item.code)
              : false,
          };
        }
        return item;
      });
      draftState.envoyEditConfigs = envoyEditConfigs;
      draftState.reasonConfigs = newReasonConfigs;
      draftState.envoyEdit = lodash.some(newReasonConfigs, (item) => item?.envoyEdit);
      return;
    }

    draftState.reasonConfigs = lodash.get(payload, 'reasonConfigs', []);
  });
}
