import { produce } from 'immer';
import lodash from 'lodash';
import { MainBenefitType } from '../../Enum';

const addMainBenefitItem = (state: any, { payload: { idx } }: any) => {
  const nextState = produce(state, (draftState: any) => {
    let mainBenefitList = lodash.get(
      draftState.claimProcessData,
      `invoiceInforData[${idx}].registration.incidentList[0].treatmentList[0].mainBenefitList`,
      []
    );
    if (!lodash.isArray(mainBenefitList)) {
      mainBenefitList = [];
    }
    if (lodash.isEmpty(mainBenefitList)) {
      draftState.claimProcessData.mainBenefitItem.mainBenefit = MainBenefitType.OPD;
    } else {
      draftState.claimProcessData.mainBenefitItem.mainBenefit = '';
    }
    mainBenefitList.push(draftState.claimProcessData.mainBenefitItem);
    lodash.set(
      draftState.claimProcessData,
      `invoiceInforData[${idx}].registration.incidentList[0].treatmentList[0].mainBenefitList`,
      mainBenefitList
    );
  });
  return { ...nextState };
};

export default addMainBenefitItem;
