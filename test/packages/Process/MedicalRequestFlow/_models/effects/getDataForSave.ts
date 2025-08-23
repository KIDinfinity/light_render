import { NAMESPACE } from 'process/MedicalRequestFlow/activity.config';

export default function* (_: any, { select }: any) {
  const businessData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace?.businessData
  );
  return businessData;
}
