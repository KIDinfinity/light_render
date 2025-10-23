import type { PayProps, SagaProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import { transferCurrent } from 'configuration/pages/ConfigurationCenter/Utils/Transfer';
import {
  deleteBatch,
  deleteBatchAndPatch,
  deleteDataVersion,
} from '@/services/ccBusinessDataControllerService';

export default function* ({ payload }: PayProps, { call, select }: SagaProps) {
  const { rows = [], confirmDataPatch } = payload;
  const {
    currentMenu: { id: functionId, dataImageActive },
  } = yield select((state: any) => state.configurationMenu);

  const params = confirmDataPatch.success
    ? {
        patchContext: confirmDataPatch.resultData,
        qo: {
          functionId,
          records: dataImageActive ? rows.map((item: any) => transferCurrent(item)) : rows,
        },
      }
    : {
        functionId,
        records: dataImageActive ? rows.map((item: any) => transferCurrent(item)) : rows,
      };

  const api = confirmDataPatch.success ? deleteBatchAndPatch : deleteBatch;
  const response = yield call(dataImageActive ? deleteDataVersion : api, params);
  return response;
}
