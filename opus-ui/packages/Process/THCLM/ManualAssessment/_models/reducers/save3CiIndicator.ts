import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default (state: any, { payload }: any) =>
  produce(state, (draftState: any) => {
    const { diagnosis3CiIndicatorMap, diagnosisIdList } = payload;

    lodash.forEach(diagnosisIdList, (id: any) => {
      const item = draftState?.claimEntities?.diagnosisListMap?.[id];
      draftState.claimEntities.diagnosisListMap[id].ci3 = !!diagnosis3CiIndicatorMap?.[
        formUtils.queryValue(item?.diagnosisCode)
      ];
    });
  });
