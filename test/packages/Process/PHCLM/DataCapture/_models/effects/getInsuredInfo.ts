import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';
import { Modal } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { identityV3 } from '@/services/c360PartyInfoControllerService';
import { policyNoCapsil } from '@/services/dcCapsilPolicyConversionService';
import { tenant } from '@/components/Tenant';
import { BusinessCode } from 'claim/enum/BusinessCode';
import { formUtils } from 'basic/components/Form';
import { HKCustomerType, PolicySource } from 'claim/pages/Enum';
import { LS, LSKey } from '@/utils/cache';

export default function* ({ payload }: any, { call, put, select }: any) {
  const { searchByPolicyId } = payload;
  const searchInsuredObj = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.searchInsuredObj
  );

  const insuredObj: any = formUtils.formatFlattenValue(
    formUtils.cleanValidateData(searchInsuredObj)
  );
  const policyId = lodash.trim(insuredObj?.policyId);
  const commonParams = {
    regionCode: tenant.remoteRegion(),
    businessCode: BusinessCode.claim,
    partySource: PolicySource.individual,
    customerType: HKCustomerType.CUS001,
  };
  const userInfo = LS.getItem(LSKey.CURRENTUSER);
  const params: any = {
    policyIdList: [policyId],
    ...commonParams,
    ...insuredObj,
    policyId,
    companyCode: userInfo?.companyCode?.[0],
  };

  const policyNoResponse: any = yield call(policyNoCapsil, { policyNo: policyId });
  const { success: policyNoSuccess, resultData: policyNoResultData } = policyNoResponse;
  if (policyNoSuccess && policyNoResultData && policyNoResultData !== policyId) {
    Modal.error({
      content: formatMessageApi({ Label_COM_WarningMessage: 'MSB_000555' }, policyNoResultData),
      okText: formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.receivedModalCancel' }),
    });
    return;
  }

  const response = yield call(identityV3, params);
  yield put({
    type: 'saveSnapshot',
  });
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success && !lodash.isEmpty(resultData?.policyInfoList)) {
    // 多条
    if (lodash.size(resultData.policyInfoList) > 1 || !searchByPolicyId) {
      yield put({
        type: 'savePartyListInfo',
        payload: {
          insuredList: resultData.policyInfoList,
        },
      });
      yield put({
        type: `updateShowSearchModal`,
        payload: {
          showSearchModel: true,
        },
      });
    } else {
      // 一条
      yield put({
        type: 'savePartyListInfo',
        payload: {
          policyOwnerList: resultData?.policyInfoList,
        },
      });
      yield put({
        type: 'saveBusinessProcess',
        payload: {
          selectColumns: resultData.policyInfoList?.[0] || {},
        },
      });

      const result = yield put.resolve({
        type: 'getC360Data',
        payload: {
          policySource: resultData?.policyInfoList[0].policySource,
          insuredInfo: {
            policyId: resultData?.policyInfoList[0].policyId,
            memberNo: resultData?.policyInfoList[0].memberNo,
            insuredId: resultData?.policyInfoList[0].insuredClientInfo?.clientId,
            ...lodash.pick(resultData?.policyInfoList[0].insuredClientInfo, [
              'firstName',
              'middleName',
              'surname',
              'dateOfBirth',
              'gender',
            ]),
          },
        },
      });

      if (!result) {
        yield put({
          type: 'cleanSubmitParam',
          payload: {
            policyNo: policyId,
            searchByPolicyId,
          },
        });
      }
      yield put({
        type: `updateShowSearchModal`,
        payload: {
          showSearchModel: false,
        },
      });
    }
  } else if (lodash.isEmpty(resultData) || lodash.isEmpty(resultData?.policyInfoList)) {
    yield put({
      type: 'cleanSubmitParam',
      payload: {
        policyNo: policyId,
        searchByPolicyId,
      },
    });
  }
}
