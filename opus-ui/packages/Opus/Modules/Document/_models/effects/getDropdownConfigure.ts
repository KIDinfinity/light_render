import lodash from 'lodash';
import { serialize as objectToFormData } from 'object-to-formdata';
import { listDocConfigsByRegion } from '@/services/docConfigControllerService';
import { tenant, Region } from '@/components/Tenant';

/**
 * 从task detail中获取case information
 */
export default function* getDropdownConfigure(_: any, { call, put }: any) {
  const region = tenant.region();

  const response = yield call(
    listDocConfigsByRegion,
    objectToFormData({ region: tenant.isENG() ? Region.BS : region })
  );
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success && resultData) {
    yield put({
      type: 'saveDropdownConfigure',
      payload: {
        dropdownConfigure: resultData || [],
      },
    });
  }
}
