import { NAMESPACE } from '../../activity.config';

export default function* getHasTimeError(_, { select }) {
  const hasTimeError = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.hasTimeError
  ) || false;

  return hasTimeError;
}
