import { NAMESPACE } from '../../activity.config';
import { VLD_000365 } from '../../validators';

export default function* validateSubmitPayable({}, { select }: any) {
  const claimEntities = yield select(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace.claimEntities
  );
  return VLD_000365(claimEntities);
}
