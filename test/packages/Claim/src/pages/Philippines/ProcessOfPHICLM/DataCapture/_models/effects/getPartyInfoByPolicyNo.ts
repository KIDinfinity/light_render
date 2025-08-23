import lodash from 'lodash';
import { Modal } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { identityV2 } from '@/services/c360PartyInfoControllerService';
import { tenant } from '@/components/Tenant';
import { BusinessCode } from 'claim/enum/BusinessCode';

export default function* ({ payload }: any, { call, put }: any) {
  const { policyNoList, customerType } = payload;
  const commonParams = {
    regionCode: tenant.remoteRegion(),
    businessCode: BusinessCode.claim,
  };
  const params = {
    policyIdList: policyNoList,
    policyId: policyNoList[0],
    customerType,
    ...commonParams,
  };
  const response = yield call(identityV2, params);

  yield put({
    type: 'saveSnapshot',
  });

  if (lodash.isPlainObject(response) && response.success && !lodash.isEmpty(response.resultData)) {
    yield put({
      type: 'saveInsuredListInfo',
      payload: {
        insuredList: response.resultData,
      },
    });
    yield put({
      type: `updateShowModalStatus`,
      payload: {
        showModalStatus: true,
      },
    });
  } else if (lodash.isEmpty(response.resultData)) {
    Modal.error({
      content: formatMessageApi(
        { Label_COM_WarningMessage: 'ERR_000060' },
        params?.policyIdList[0]
      ),
      okText: formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.receivedModalCancel' }),
    });
    yield put({
      type: 'cleanSubmitParam',
      payload: {
        policyNo: policyNoList[0],
      },
    });
  }
}
