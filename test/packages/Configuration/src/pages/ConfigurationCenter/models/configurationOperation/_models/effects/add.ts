import type { PayProps, SagaProps } from 'configuration/pages/ConfigurationCenter/Utils/Typings';
import { add, addAndPatch, addDataVersion } from '@/services/ccBusinessDataControllerService';

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
  const api = confirmDataPatch.success ? addAndPatch : add;
  const response = yield call(currentMenu.dataImageActive ? addDataVersion : api, params);
  return response;
}
