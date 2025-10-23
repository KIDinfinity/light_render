import { produce } from 'immer';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';

const saveDrugsDetailList = (state: any, action: any) => {
  const { therapeuticDrugs } = action.payload;

  const nextState = produce(state, (draftState) => {
    const otherProcedureId = draftState.DrugsDetail.id;

    const therapeuticMonthList =
      draftState.claimEntities?.otherProcedureListMap?.[otherProcedureId]?.therapeuticMonthList ||
      [];

    draftState.claimEntities.otherProcedureListMap[otherProcedureId].therapeuticMonthList = lodash
      .chain(formUtils.cleanValidateData(therapeuticMonthList))
      .map((item) => ({
        ...item,
        therapeuticDrugs: lodash.uniq([
          ...(item.therapeuticDrugs || []),
          ...(therapeuticDrugs || []),
        ]),
      }))
      .value();
  });
  return { ...nextState };
};

export default saveDrugsDetailList;
