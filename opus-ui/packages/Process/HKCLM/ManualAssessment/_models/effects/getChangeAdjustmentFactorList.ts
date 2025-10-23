import { NAMESPACE } from '../../activity.config';

export default function* getChangeAdjustmentFactorList({ payload }: any, { select }: any) {
  const changeAdjustmentFactorList = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.changeAdjustmentFactorList
  );

  return changeAdjustmentFactorList;
}
