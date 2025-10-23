import lodash from 'lodash';
import { getCfgOccupationInfo } from '@/services/owbNbCfgControllerService';

import Dictionary from 'basic/enum/Dictionary';

const occupationFilterTypeCodes = [
  Dictionary.Dropdown_IND_Occupation,
  Dictionary.Dropdown_IND_NatureofBusiness,
  Dictionary.Dropdown_IND_PositionHeld,
];

export default function* (_: any, { call, put }: any): Generator<any, void, any> {
  const response = yield call(getCfgOccupationInfo, occupationFilterTypeCodes);

      const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
      if (success) {
      yield put({
        type: `setOccupationFullList`,
        payload: {
          occupationFullList: resultData,
        },
      });
    }
}
