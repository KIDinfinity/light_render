import { NAMESPACE } from 'opus/NewBusiness/ManualUnderwriting/activity.config';
import { formUtils } from 'basic/components/Form';
import lodash from 'lodash';
import flatProductConfig from 'opus/NewBusiness/ManualUnderwriting/_utils/flatProductConfig';

export default function* (_: any, { select, put }: any) {
  const coverageList = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.modalData.processData?.coverageList
  );
  const planProductConfig = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.planProductConfig
  );
  const coreCodeList = lodash
    .chain(coverageList)
    .map((item) => formUtils.queryValue(item.coreCode))
    .value();

  const needSetDefaultPayTypeToCheque = lodash
    .chain(flatProductConfig({ planProductConfig }))
    .filter((configItem: any) => {
      return coreCodeList.includes(configItem.productCode);
    })
    .every((item: any) => item.maturityInd !== 'Y')
    .value();

  if (needSetDefaultPayTypeToCheque) {
    yield put({
      type: `${NAMESPACE}/setDefaultPayType`,
      payload: {
        defaultPayType: 'CHQ',
      },
    });
  }
}
