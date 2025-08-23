import { NAMESPACE } from '../../activity.config';
import lodash from 'lodash';
import { formatMessageApi } from '@/utils/dictFormatMessage';

export default function* validateRegisterPayable(_: any, { select }: any) {
  let errors: any = [];
  const { claimPayableListMap } = yield select(
    ({ [NAMESPACE]: modelNamespace }: any) => modelNamespace.claimEntities || {}
  );

  const hasEmptyClaimModule =
    lodash
      .chain(lodash.values(claimPayableListMap) || [])
      .reduce((isEmpty: Boolean, { claimModule }: any) => {
        return !!isEmpty ? isEmpty : !claimModule;
      }, false)
      .value() || false;

  if (!!hasEmptyClaimModule) {
    errors = [
      ...errors,
      { code: 'VLD_000351', content: formatMessageApi({ Label_COM_WarningMessage: 'MSG_001340' }) },
    ];
  }
  return errors;
}
