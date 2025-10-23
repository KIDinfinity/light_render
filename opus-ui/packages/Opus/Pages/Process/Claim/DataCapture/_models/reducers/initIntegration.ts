import { produce } from 'immer';
import { includes, map, isEmpty } from 'lodash';
import { formUtils } from 'basic/components/Form';

const initIntegration = (state: any, action: any) => {
  const { incidentId } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    let klipCaseInfoList =
      draftState.claimEntities?.incidentListMap?.[incidentId]?.klipCaseInfoList;
    const treatmentListMap = draftState.claimEntities?.treatmentListMap;
    const procedureListMap = draftState.claimEntities?.procedureListMap;
    const claimTypeArray = formUtils.queryValue(
      draftState.claimEntities?.incidentListMap?.[incidentId]?.claimTypeArray
    );
    klipCaseInfoList = map(klipCaseInfoList, (item) => {
      return {
        ...item,
        interestFlag:
          isEmpty(formUtils.queryValue(item.interestFlag)) && !includes(claimTypeArray, 'WOP')
            ? 'Y'
            : item.interestFlag,
      };
    });
    draftState.integration[incidentId] = {
      klipCaseInfoList,
      procedureListMap,
      treatmentListMap,
      claimTypeArray,
    };
  });
  return { ...nextState };
};

export default initIntegration;
