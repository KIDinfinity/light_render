import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../../activity.config';

export default function* (_: any, { select }: any) {
  const claimProcessData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.claimProcessData
  );
  const dataForSave: any = formUtils.formatFlattenValue(
    formUtils.cleanValidateData(claimProcessData)
  );
  return dataForSave;
}
