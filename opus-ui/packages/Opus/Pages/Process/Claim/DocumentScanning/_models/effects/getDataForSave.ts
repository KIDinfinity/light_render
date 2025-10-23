import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from '../../activity.config';

export default function* (_: any, { select }: any) {
  const { claimProcessData, type } = yield select(
    ({ [NAMESPACE]: modelnamespace }: any) =>
      formUtils.cleanValidateData(modelnamespace?.businessData) || {}
  );
  return {
    type,
    claimProcessData,
  };
}
