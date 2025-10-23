import lodash from 'lodash';
import type AtomCode from 'enum/AtomCode';
import type AtomGroupCode from 'enum/AtomGroupCode';
import type Region from 'enum/Region';
import { queryAtomConfigV2, queryAtomConfigUI } from '@/services/miscAtomConfigControllerService';
import { SS, SSKey } from '@/utils/cache';
import { getNewNBUI } from 'process/Utils';
import isOpus from '@/utils/isOpus';

interface IParams {
  payload: {
    atomCode?: AtomCode;
    atomGroupCode: AtomGroupCode;
    taskDetail: any;
  };
}

export default function* ({ payload }: IParams, { put, call }: any) {
  const region: Region = SS.getItem(SSKey.CONFIGS)?.region;
  const { atomCode, atomGroupCode, taskDetail = {} } = payload || {};
  const opusSite = isOpus();
  const url = (() => {
    if (opusSite) {
      return queryAtomConfigV2;
    }
    return getNewNBUI(taskDetail) ? queryAtomConfigUI : queryAtomConfigV2;
  })();
  const response = yield call(url, {
    region: opusSite ? `${region}_OPUS` : region,
    atomCode,
    atomGroupCode,
  });
  const group = lodash.get(response, 'resultData', []);

  yield put({
    type: 'setAtomGroup',
    payload: {
      group,
      atomGroupCode,
    },
  });
}
