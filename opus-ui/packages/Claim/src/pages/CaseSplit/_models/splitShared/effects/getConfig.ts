import { produce } from 'immer';
import { findByRegion } from '@/services/navigatorModuleConfigControllerService';
import { get } from 'lodash';
import { ConfigModuleName, ConfigSubModuleName } from '../../dto';

export default function* (action: any, { select, call, put }: any) {
  const config = yield select((state: any) => state.caseSplitController.config);
  const res = yield call(findByRegion);

  if (get(res, 'success')) {
    const newConfig = produce(config, (draft: any) => {
      res.resultData.forEach(({ module: modulename, submodule }: any) => {
        const configModuleName = ConfigModuleName[modulename];
        if (configModuleName) {
          draft[configModuleName] = draft[configModuleName] || {};

          submodule.forEach(({ isDefault, isOption, region, submodule: submodulename }: any) => {
            const configSubModuleName = ConfigSubModuleName[submodulename];
            if (configSubModuleName) {
              draft[configModuleName][configSubModuleName] = {
                isDefault: !!isDefault,
                isOption: !!isOption,
              };
              draft.region = region;
            }
          });
        }
      });
    });

    yield put({ type: 'setConfig', payload: { config: newConfig } });
  }
}
