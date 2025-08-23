import lodash from 'lodash';
import { getPolicyInsuredData } from '@/services/integrationLifeAsiaInterfaceControllerService';
import { formUtils } from 'basic/components/Form';

export default function* (_: any, { call, put, select }: any) {
  const { claimProcessData } = yield select((state: any) => state.UnknownDocumentController);
  const { firstName: givenName, identityId, lastName: surName } = claimProcessData;
  const searchData = lodash.pickBy(
    formUtils.formatFlattenValue(
      formUtils.cleanValidateData({
        givenName,
        identityId,
        surName,
      })
    )
  );

  if (lodash.isEmpty(searchData)) {
    return;
  }

  const response = yield call(getPolicyInsuredData, searchData);
  if (response && response.success) {
    yield put({
      type: 'saveSearchResult',
      payload: {
        searchResult: response.resultData,
      },
    });
  }
}
