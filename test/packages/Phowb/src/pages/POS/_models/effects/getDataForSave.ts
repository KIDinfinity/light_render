import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* (_: any, { select }: any) {
  const claimProcessData = yield select(
    (state: any) => state.phowbDataCaptureController.claimProcessData
  );

  const dataForSave: any = formUtils.formatFlattenValue(formUtils.cleanValidateData(claimProcessData));
  if (
    lodash.isEmpty(dataForSave) ||
    lodash.isEmpty(dataForSave?.posDataDetail) ||
    lodash.isEmpty(dataForSave?.posDataDetail?.posRequestInformation)
  ) {
    return false;
  }

  return {
    ...dataForSave,
  };
}
