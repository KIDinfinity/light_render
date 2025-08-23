import { formUtils } from 'basic/components/Form';
import map from 'lodash/map';

export default function* (_: any, { select }: any) {
  const { claimProcessData, type } = yield select(
    ({ batchDocumentScanningController }) => batchDocumentScanningController
  );

  const result = map(claimProcessData, (data) => formUtils.cleanValidateData(data));
  return {
    type,
    claimProcessData: result,
  };
}
