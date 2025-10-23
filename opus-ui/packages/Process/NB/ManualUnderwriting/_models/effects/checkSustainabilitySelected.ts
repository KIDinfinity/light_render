import lodash from 'lodash';
import { NAMESPACE } from 'process/NB/ManualUnderwriting/activity.config';

export default function* (_: any, { select }: any) {
  const businessData = yield select(({ [NAMESPACE]: modelnamespace }: any) => modelnamespace);

  return lodash
    .chain(businessData)
    .get('sustainabilityOptions')
    .every((item: any) => item?.applied !== 'Y')
    .value();
}
