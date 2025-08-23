import lodash from 'lodash';
import { identityV2 } from '@/services/c360PartyInfoControllerService';
import { identifyPolicyNoRelCaseNo } from '@/services/docViewControllerService';
import { tenant, Region } from '@/components/Tenant';
import { BusinessCode } from 'claim/enum/BusinessCode';
import { formUtils } from 'basic/components/Form';
import { handleMessageModal } from '@/utils/commonMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { relationshipWithInsuredForHK } from 'claim/enum';
import { HKCustomerType, PolicySource } from 'claim/pages/Enum';

export default function* ({ payload }: any, { select, put, call }: any) {
  const { searchInsuredObj } = yield select((state: any) => ({
    // policyNo: state.documentScanningController?.claimProcessData?.indexInformation?.policyNo || '',
    searchInsuredObj: state.documentScanningController.searchInsuredObj,
  }));
  const insuredObj: any = formUtils.formatFlattenValue(
    formUtils.cleanValidateData(searchInsuredObj)
  );

  const { policyNo } = payload;

  if (lodash.isEmpty(policyNo)) return;

  const policyId = formUtils.queryValue(policyNo);

  const commonParams = {
    regionCode: tenant.remoteRegion(),
    businessCode: BusinessCode.claim,
    policySource: PolicySource.individual,
    customerType: HKCustomerType.CUS001,
  };
  const params: any = {
    policyIdList: [insuredObj.policyId],
    ...commonParams,
    ...insuredObj,
    policyId,
  };

  const service = tenant.region() === Region.PH ? identifyPolicyNoRelCaseNo : identityV2;
  const serviceParams = tenant.region() === Region.PH ? { policyNo: policyId } : params;
  const response: any = yield call(service, serviceParams);

  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (tenant.region() === Region.PH) {
    if (!success) {
      yield put({
        type: 'documentScanningController/saveInformation',
        payload: {
          changedFields: {
            policyNo: '',
          },
        },
      });
      handleMessageModal(response?.promptMessages || []);
    }
  } else {
    if (
      lodash.isPlainObject(resultData) &&
      success &&
      !lodash.isEmpty(resultData) &&
      lodash.isArray(resultData?.partyInfoList) &&
      !lodash.isEmpty(resultData?.partyInfoList)
    ) {
      if (resultData?.partyInfoList.length === 1) {
        const {
          clientId,
          dateOfBirth,
          status,
          firstName,
          surname,
        } = resultData?.partyInfoList?.[0];
        yield put({
          type: 'savePolicyInfo',
          payload: {
            insured: {
              policyNo: formUtils.queryValue(policyNo),
              insuredId: clientId,
              currentState: status,
              firstName,
              surname,
              dateOfBirth,
            },
            claimant: {
              relationshipWithInsured: relationshipWithInsuredForHK.policyOwner,
            },
            payeeList: [
              {
                relationshipWithInsured: relationshipWithInsuredForHK.policyOwner,
              },
            ],
          },
        });
      } else {
        yield put({
          type: 'saveShowInsuredList',
          payload: {
            showInsuredList: true,
          },
        });
        yield put({
          type: 'saveInsuredList',
          payload: {
            insuredList: resultData?.partyInfoList,
          },
        });
      }
      yield put({
        type: 'saveSearchInsuredInfo',
        payload: {
          changedFields: {
            policyId: formUtils.queryValue(policyNo),
          },
        },
      });
    } else {
      handleMessageModal([
        {
          content: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000058' }, policyId),
        },
      ]);
      yield put({
        type: 'savePolicyInfo',
      });
    }
  }
}
