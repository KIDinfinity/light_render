import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import cleanPosDetail from '../../Utils/cleanPosDetail';
import mutateFlag from '../../Utils/mutateFlag';

export default function* (_: any, { select }: any) {
  const businessData = yield select(
    (state: any) => state.GeneralPOSPHNotCFTController.claimProcessData?.businessData
  );


  const cleanData = mutateFlag(formUtils.cleanValidateData(businessData))
  cleanData.transactionTypes[0] = cleanPosDetail(cleanData.transactionTypes[0])
  const dataForSave: any = formUtils.formatFlattenValue(cleanData);

  const commonFields = [
    'mainCompanyCode', 'mainInsuredClientId', 'mainOwnerClientId', 'mainPayorClientId', 'mainPolicyId', 'sourceSystem'
  ]
  Object.assign(dataForSave, lodash.pick(dataForSave?.policyInfo, commonFields))

  if (!cleanData?.mainPolicyId) {
    return false;
  }

  return {
    ...dataForSave,
  };
}
