import { queryPageAtomConfig } from '@/services/miscPageAtomConfigControllerService';
import lodash from 'lodash';
import { tenant } from '@/components/Tenant';

function* getPreviewModePageAtomConfig(_: any, { select, call, put }: any) {
  const configs = yield select((state) => state.envoyController.previewModePageAtomConfig);
  if (lodash.isEmpty(configs)) {
    const region = tenant.region();
    const response = yield call(queryPageAtomConfig, {
      caseCategory: 'NB_PRE_CTG001',
      sectionId: 'PreviewClientInfo',
      regionCode: region,
    });

    if (response && response.success) {
      yield put({
        type: 'savePreviewModePageAtomConfig',
        payload: {
          previewModePageAtomConfig: response.resultData || [],
        },
      });
    }
  }
}

export default getPreviewModePageAtomConfig;
