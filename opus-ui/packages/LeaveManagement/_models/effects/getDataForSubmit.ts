import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* (_: any, { select }: any) {
  let businessData = yield select((state: any) => state.leaveManagement.businessData);

  businessData = formUtils.formatFlattenValue(formUtils.cleanValidateData(businessData));

  businessData = {
    ...businessData,
    details: lodash
      .chain(businessData.details)
      .map((item: any) => lodash.omit(item, ['allTime']))
      .value(),
  };

  return businessData;
}
