import { NAMESPACE } from 'process/GeneralPOS/BaseProduct/activity.config';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';

export default function* validateFieldsBefore(_: any, { select, put }: any) {
  const showReAssess: Object = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.showReAssess
  );
  const cftFlag: Object = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.processData?.cftFlag
  );
  const transactionTypesMap = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities?.transactionTypesMap
  );

  const transactionTypeCodes = lodash
    .values(transactionTypesMap)
    .map((item) => formUtils.queryValue(item?.transactionTypeCode));

  return {
    errorMsg: showReAssess?.warnMessage,
    result: !(cftFlag ?? true)
      ? false
      : tenant.region({
          [Region.PH]: transactionTypeCodes.includes('SRV024')
            ? showReAssess?.show && showReAssess.change
            : false,
          notMatch: showReAssess?.show && showReAssess.change,
        }),
  };
}
