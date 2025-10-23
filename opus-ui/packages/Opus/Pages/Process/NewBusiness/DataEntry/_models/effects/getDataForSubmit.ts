import lodash from 'lodash';
import { copyAddressFun } from '../../utils/addressReducerFactory';
import { NAMESPACE } from '../../activity.config';
import { formUtils } from 'basic/components/Form';

export default function* getDataForSubmit({ payload }: any, { select }) {
  const processData = yield select((state) => state[NAMESPACE].processData);

  return copyAddressFun(formUtils.cleanValidateData(processData));
}
