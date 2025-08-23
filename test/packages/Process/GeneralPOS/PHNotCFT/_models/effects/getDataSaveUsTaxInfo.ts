import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';

export default function* (_: any, { select }: any) {
  const usTaxInformation = yield select(
    (state: any) => state.GeneralPOSPHNotCFTController?.claimProcessData?.businessData?.transactionTypes?.[0]?.usTaxInformation
  );
  const { inquiryBusinessNo } = yield select((state: any) => state.processTask.getTask);

  const result = formUtils.formatFlattenValue(formUtils.cleanValidateData(usTaxInformation));
  if (lodash.isEmpty(result)) {
    return false;
  }
  return { usTaxInformation, posNo: inquiryBusinessNo };
}
