import { NAMESPACE } from '../../../activity.config';
import changeIsInterestMHITClientItem from 'process/NewBusiness/ManualUnderwriting/_utils/changeIsInterestMHITClientItem';

export default function* ({ payload }: any, { call, put, select }: any) {
  const modalData = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.modalData
  ) || {};

  const entities = yield select(({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.entities);

  const isInterestMHITValueChangedClientItem = changeIsInterestMHITClientItem({
    entities,
    modalData,
  });

  return isInterestMHITValueChangedClientItem;
}
