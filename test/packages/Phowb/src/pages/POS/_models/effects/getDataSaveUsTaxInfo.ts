import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* (_: any, { select }: any) {
  const claimProcessData = yield select(
    (state: any) => state.phowbDataCaptureController?.claimProcessData
  );
  const { inquiryBusinessNo } = yield select((state: any) => state.processTask.getTask);

  const result = formUtils.formatFlattenValue(formUtils.cleanValidateData(claimProcessData));
  if (
    lodash.isEmpty(result) ||
    lodash.isEmpty(result?.posDataDetail) ||
    lodash.isEmpty(result?.posDataDetail?.usTaxDeclarations)
  ) {
    return false;
  }
  const { usTaxDeclarations = {} } = result?.posDataDetail;
  return { usTaxDeclarations, posNo: inquiryBusinessNo };
}
