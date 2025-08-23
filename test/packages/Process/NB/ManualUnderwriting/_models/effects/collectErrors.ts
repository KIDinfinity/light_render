import { formUtils } from 'basic/components/Form';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default function* (_: any, { select }: any) {
  const businessData = yield select(({ [NAMESPACE]: modelnamespace }: any) => modelnamespace);
  const formErrors = formUtils.getErrorArray(businessData);

  return formErrors;
}
