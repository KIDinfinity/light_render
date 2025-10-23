import type { PayProps, SagaProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import {
  update,
  updateAndPatch,
  updateDataVersion,
} from '@/services/ccBusinessDataControllerService';

export default function* ({ payload }: PayProps, { call, select }: SagaProps) {
  const { confirmDataPatch, result } = payload;
  const { currentMenu, parentVersionNo } = yield select((state: any) => ({
    ...state.configurationCenter,
    ...state.configurationMenu,
  }));
  const params =
    !currentMenu.dataImageActive && confirmDataPatch.success
      ? {
          patchContext: confirmDataPatch.resultData,
          qo: {
            functionId: currentMenu.id,
            parentVersionNo,
            record: result,
          },
        }
      : {
          functionId: currentMenu.id,
          parentVersionNo,
          record: result,
        };
  const api = confirmDataPatch.success ? updateAndPatch : update;
  const response = yield call(currentMenu.dataImageActive ? updateDataVersion : api, params);
  return response;
}
