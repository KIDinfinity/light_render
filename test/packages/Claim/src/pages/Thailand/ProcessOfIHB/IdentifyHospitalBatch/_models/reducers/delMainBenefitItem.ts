import { produce } from 'immer';
import lodash from 'lodash';

const delMainBenefitItem = (state: any, { payload: { idx, itemIdx } }: any) => {
  const nextState = produce(state, (draftState: any) => {
    const mainBenefitList = lodash.get(
      draftState.claimProcessData,
      `invoiceInforData[${idx}].registration.incidentList[0].treatmentList[0].mainBenefitList`,
      []
    );
    lodash.remove(mainBenefitList, (_, selfIdx) => selfIdx === itemIdx);
    lodash.set(
      draftState.claimProcessData,
      `invoiceInforData[${idx}].registration.incidentList[0].treatmentList[0].mainBenefitList`,
      mainBenefitList
    );
  });
  return { ...nextState };
};

export default delMainBenefitItem;
