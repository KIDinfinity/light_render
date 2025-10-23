import { produce, original } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import changeBasicInfoFields from './changeBasicInfoFields';
import saveDiffCilentInfoList from './saveDiffCilentInfoList';
import bmi from '@/utils/bmi';

export default (state: any, action: any) => {
  const { changedFields, id } = action?.payload;

  const nextState = changeBasicInfoFields(state, {
    payload: {
      changedFields,
      id,
    },
  });

  let finalState = produce(nextState, (draftState) => {
    const clientIndex = lodash
      .chain(draftState)
      .get('businessData.policyList[0].clientInfoList')
      .findIndex((item: any) => item?.id === id)
      .value();

    if (
      changedFields?.beneficiaryType &&
      formUtils.queryValue(changedFields?.beneficiaryType) === 'TB'
    ) {
      lodash.set(draftState, `businessData.policyList[0].clientInfoList[${clientIndex}].share`, 0);
    }

    if (changedFields?.height) {
      const height = formUtils.queryValue(changedFields?.height);
      const weight = formUtils.queryValue(
        lodash.get(
          original(draftState),
          `businessData.policyList[0].clientInfoList[${clientIndex}].weight`,
          0
        )
      );
      if (lodash.isEmpty(+height) || lodash.isEmpty(+weight)) {
        lodash.set(draftState, `businessData.policyList[0].clientInfoList[${clientIndex}].bmi`, 0);
      }
      if (+height && +weight) {
        lodash.set(
          draftState,
          `businessData.policyList[0].clientInfoList[${clientIndex}].bmi`,
          bmi({ height, weight })
        );
      }
    } else if (changedFields?.weight) {
      const weight = formUtils.queryValue(changedFields?.weight);
      const height = formUtils.queryValue(
        lodash.get(
          original(draftState),
          `businessData.policyList[0].clientInfoList[${clientIndex}].height`,
          0
        )
      );
      if (lodash.isEmpty(+weight) || lodash.isEmpty(+height)) {
        lodash.set(draftState, `businessData.policyList[0].clientInfoList[${clientIndex}].bmi`, 0);
      }
      if (+height && +weight) {
        lodash.set(
          draftState,
          `businessData.policyList[0].clientInfoList[${clientIndex}].bmi`,
          bmi({ height, weight })
        );
      }
    }
  });
  finalState = saveDiffCilentInfoList(finalState, {
    payload: {
      preState: nextState,
      id,
    },
  });
  return { ...finalState };
};
