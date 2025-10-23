import { NAMESPACE } from '../../activity.config';
import { VLD_000351 } from 'claim/pages/validators/sectionValidators';

export default function* validateRegisterPayable({ payload }: any, { select }: any) {
  const claimEntities = yield select(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace.claimEntities
  );

  return payload.isMajor && VLD_000351(claimEntities?.incidentListMap) ;
}

