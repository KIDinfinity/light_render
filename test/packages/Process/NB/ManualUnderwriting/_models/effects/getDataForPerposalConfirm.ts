import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import requestHandleType from 'bpm/enum/requestHandleType';
import { NAMESPACE } from '../../activity.config';

export default function* (_: any, { select }: any) {
  const businessData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.businessData
  );

  const finalBusinessData: any = formUtils.formatFlattenValue(
    formUtils.cleanValidateData(businessData)
  );

  if (lodash.isEmpty(finalBusinessData)) {
    return requestHandleType.break;
  }
  return finalBusinessData;
}
