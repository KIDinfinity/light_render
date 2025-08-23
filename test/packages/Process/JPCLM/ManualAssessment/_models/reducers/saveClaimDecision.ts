import { produce }  from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { settlementDecision } from 'claim/pages/Enum';
import { eClaimDecision } from 'claim/enum/claimDecision';

const saveClaimDecision = (state: any, action: any) => {
  const { changedFields } = action.payload;

  const nextState = produce(state, (draftState: any) => {
    draftState.claimProcessData.claimDecision = {
      ...(draftState.claimProcessData.claimDecision || {}),
      ...changedFields,
    };

    const { assessmentDecision } = draftState.claimProcessData.claimDecision;
    const assessDecicion = formUtils.queryValue(assessmentDecision);

    const dataMap = {
      [eClaimDecision.approve]: [settlementDecision['01']],
      [eClaimDecision.deny]: [settlementDecision['03']],
      [eClaimDecision.exgratia]: [
        settlementDecision['02'],
        settlementDecision['04'],
        settlementDecision['06'],
      ],
    };

    draftState.claimEntities.claimPayableListMap = lodash.reduce(
      draftState.claimEntities.claimPayableListMap,
      (collect: any, item: any, key: string) => {
        const payableTemp = { ...item };
        const { settlementDecision } = payableTemp;
        if (lodash.includes(dataMap[assessDecicion], formUtils.queryValue(settlementDecision))) {
          lodash.set(payableTemp, 'settlementDecision', formUtils.queryValue(settlementDecision));
        }

        lodash.set(collect, key, payableTemp);

        return collect;
      },
      {}
    );
  });
  return { ...nextState };
};

export default saveClaimDecision;
