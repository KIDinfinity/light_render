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
import { handleWarnMessageModal } from '@/utils/commonMessage';

const identifyPolicyNoRelCaseNoRegions = [Region.PH, Region.VN, Region.MY];

const showMessage = ({ newPolicyNo, oldPolicyNo }: any) => {
  if (!!newPolicyNo && newPolicyNo !== oldPolicyNo) {
    handleWarnMessageModal(
      [
        {
          content: formatMessageApi(
            {
              Label_COM_WarningMessage: 'MSG_000927',
            },
            newPolicyNo
          ),
        },
      ],
      {
        okFn: () => {},
        hideCancelButton: true,
        hiddenExtraText: true,
      }
    );
  }
};

export default function* ({ payload }: any, { select, put, call }: any) {
  const data = yield select((state: any) => state.batchDocumentScanningController);
  const companyCode = yield select(({ processTask }: any) => processTask?.getTask?.companyCode);

  const searchInsuredObj = data?.searchInsuredObj;

  const insuredObj: any = formUtils.formatFlattenValue(
    formUtils.cleanValidateData(searchInsuredObj)
  );

  const { sectionIndex, policyNo, popupSearch } = payload;

  if (lodash.isEmpty(policyNo)) return;

  const policyId = formUtils.queryValue(policyNo);

  const commonParams = {
    regionCode: tenant.remoteRegion(),
    businessCode: BusinessCode.claim,
    policySource: PolicySource.individual,
    customerType: HKCustomerType.CUS001,
  };
  const params: any = {
    policyIdList: [''],
    ...commonParams,
    ...insuredObj,
    policyId,
    companyCode,
  };

  const currentRegion = tenant.region();
  const useIdentifyPolicyNoRelCaseNo =
    lodash.includes(identifyPolicyNoRelCaseNoRegions, currentRegion) &&
    data.type === 'PendingDocument';
  const service = useIdentifyPolicyNoRelCaseNo ? identifyPolicyNoRelCaseNo : identityV2;
  const serviceParams = useIdentifyPolicyNoRelCaseNo ? { policyNo: policyId } : params;
  const response: any = yield call(service, serviceParams);

  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (useIdentifyPolicyNoRelCaseNo) {
    if (!success) {
      yield put({
        type: 'saveInformation',
        payload: {
          sectionIndex,
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
      const firstNewPolicyId = resultData?.partyInfoList[0]?.newPolicyId || '';
      showMessage({
        newPolicyNo: firstNewPolicyId,
        oldPolicyNo: policyId,
      });

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
            sectionIndex,
            insured: {
              policyNo: !lodash.isEmpty(firstNewPolicyId) ? firstNewPolicyId : policyId,
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
            showInsuredList: popupSearch !== false && true,
          },
        });
        yield put({
          type: 'saveInsuredList',
          payload: {
            insuredSectionIndex: sectionIndex,
            insuredList: resultData?.partyInfoList,
          },
        });
      }

      if (!lodash.isEmpty(firstNewPolicyId)) {
        yield put({
          type: 'saveInformation',
          payload: {
            sectionIndex,
            changedFields: {
              policyNo: firstNewPolicyId,
            },
          },
        });
      }

      yield put({
        type: 'saveSearchInsuredInfo',
        payload: {
          changedFields: {
            policyId: !lodash.isEmpty(firstNewPolicyId) ? firstNewPolicyId : policyNo,
          },
        },
      });

      // claimProcessData;
    } else {
      yield put({
        type: 'savePolicyInfo',
      });
    }
  }
}
