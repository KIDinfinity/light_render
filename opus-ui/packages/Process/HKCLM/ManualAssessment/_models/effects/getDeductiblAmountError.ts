import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';
import { formUtils } from 'basic/components/Form';

export default function* getDeductiblAmountError(_: any, { select }: any) {
  const serviceItemPayableListMap = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimEntities.serviceItemPayableListMap
  ) || {};

  return (
    lodash
      .chain(lodash.values(serviceItemPayableListMap) || [])
      .reduce((hasChanegAmount: any, item: any) => {
        const { manualAdd, isReAssess, deductibleAmount } = item || {};

        return manualAdd === 'Y' && !isReAssess && !!formUtils.queryValue(deductibleAmount)
          ? true
          : hasChanegAmount;
      }, false)
      .value() || false
  );
}
