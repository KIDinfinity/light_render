import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';
import { Modal } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { identityV2 } from '@/services/c360PartyInfoControllerService';
import { policyNoCapsil } from '@/services/dcCapsilPolicyConversionService';
import { tenant } from '@/components/Tenant';
import { BusinessCode } from 'claim/enum/BusinessCode';
import { formUtils } from 'basic/components/Form';
import { HKCustomerType, PolicySource } from 'claim/pages/Enum';
import { handleWarnMessageModal } from '@/utils/commonMessage';

const showMessage = ({ newPolicyId }: any) => {
  handleWarnMessageModal(
    [
      {
        content: formatMessageApi(
          {
            Label_COM_WarningMessage: 'MSG_000927',
          },
          newPolicyId
        ),
      },
    ],
    {
      okFn: () => {},
      hideCancelButton: true,
      hiddenExtraText: true,
    }
  );
};

export default function* ({ payload }: any, { call, put, select }: any) {
  const { searchByPolicyId } = payload;
  const searchInsuredObj = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) => modelnamepsace.searchInsuredObj
  );

  const { caseCategory, companyCode } = yield select(
    ({ processTask }: any) => processTask?.getTask
  ) || {};

  const insuredObj: any = formUtils.formatFlattenValue(
    formUtils.cleanValidateData(searchInsuredObj)
  );
  const policyId = lodash.trim(insuredObj?.policyId);
  const commonParams = {
    regionCode: tenant.remoteRegion(),
    businessCode: BusinessCode.claim,
    policySource: PolicySource.individual,
    customerType: HKCustomerType.CUS001,
  };
  const params: any = {
    policyIdList: [policyId],
    ...commonParams,
    ...insuredObj,
    policyId,

    ...(caseCategory === 'BP_CLM_CTG009' ? { companyCode: companyCode || 'Assurance' } : {}),
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

  const response = yield call(identityV2, params);

  yield put({
    type: 'saveSnapshot',
  });
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);

  if (success && !lodash.isEmpty(resultData)) {
    const partyInfoList = lodash.chain(resultData.partyInfoList).compact().first().value();
    const newPolicyId = partyInfoList?.newPolicyId || '';

    if (!!newPolicyId && newPolicyId !== policyId) {
      showMessage({ newPolicyId });

      yield put({
        type: 'saveInsured',
        payload: {
          changedFields: {
            policyId: newPolicyId,
          },
        },
      });
    }
    if (lodash.size(resultData.partyInfoList) > 1 || !searchByPolicyId) {
      yield put({
        type: 'savePartyListInfo',
        payload: {
          insuredList: resultData.partyInfoList,
        },
      });
      yield put({
        type: `updateShowSearchModal`,
        payload: {
          showSearchModel: true,
        },
      });
    } else {
      yield put({
        type: 'savePartyListInfo',
        payload: {
          policyOwnerList: partyInfoList?.policyResultList,
        },
      });
      const result = yield put.resolve({
        type: 'getC360Data',
        payload: {
          insuredInfo: {
            policyId: !lodash.isEmpty(newPolicyId)
              ? newPolicyId
              : lodash.first(partyInfoList.policyIdList),
            insuredId: partyInfoList.clientId,
          },
        },
      });
      const combineClaimantInfo = lodash
        .chain(result?.clientInfoList)
        .find((item) => {
          const clientId = lodash.find(
            result?.policyOwnerList,
            (item) => item?.policyId === policyId
          )?.clientId;
          return item?.clientId === clientId;
        })
        .value();

      if (result) {
        yield put({
          type: 'saveSelectInsuredInfo',
          payload: {
            selectColumns: partyInfoList,
            skipPolicyNo: searchByPolicyId,
            combineClaimantInfo,
          },
        });
      } else {
        yield put({
          type: 'cleanSubmitParam',
          payload: {
            policyNo: !lodash.isEmpty(newPolicyId) ? newPolicyId : policyId,
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
  } else if (!success) {
    yield put({
      type: 'cleanSubmitParam',
      payload: {
        policyNo: policyId,
        searchByPolicyId,
      },
    });
  }
}
