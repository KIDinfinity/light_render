import lodash from 'lodash';
import type AtomCode from 'enum/AtomCode';
import type AtomGroupCode from 'enum/AtomGroupCode';
import type Region from 'enum/Region';
import { queryAtomConfigV2 } from '@/services/miscAtomConfigControllerService';
import { SS, SSKey } from '@/utils/cache';

interface IParams {
  payload: {
    atomCode?: AtomCode;
    atomGroupCode: AtomGroupCode;
  };
}

export default function* ({ payload }: IParams, { put, call }: any) {
  const region: Region = SS.getItem(SSKey.CONFIGS)?.region;
  const { atomCode, atomGroupCode } = lodash.pick(payload, ['atomCode', 'atomGroupCode']);
  const response = yield call(queryAtomConfigV2, {
    region,
    atomCode,
    atomGroupCode,
  });
  const atomData = lodash.get(response, 'resultData', []);
  yield put({
    type: 'setSingleAtom',
    payload: {
      atomData,
      atomGroupCode,
      atomCode,
    },
  });
}
