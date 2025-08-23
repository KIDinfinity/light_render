import lodash from 'lodash';
import { Modal } from 'antd';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { identityV2 } from '@/services/c360PartyInfoControllerService';
import { tenant } from '@/components/Tenant';
import { BusinessCode } from 'claim/enum/BusinessCode';
import { formUtils } from 'basic/components/Form';
import { HKCustomerType, PolicySource } from 'claim/pages/Enum';

export default function* ({ payload }: any, { call, put, select }: any) {
  const { searchByPolicyId } = payload;
  const { searchInsuredObj, caseCategory, businessNo, taskDetail } = yield select((state: any) => ({
    searchInsuredObj: state.JPCLMOfDataCapture.searchInsuredObj,
    caseCategory: state?.JPCLMOfDataCapture?.claimProcessData?.caseCategory,
    businessNo: state?.JPCLMOfDataCapture?.claimProcessData?.businessNo,
    taskDetail: state.processTask.getTask,
  }));
  const insuredObj: any = formUtils.formatFlattenValue(
    formUtils.cleanValidateData(searchInsuredObj)
  );
  const { policyId } = insuredObj;
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
  };
  // 注释这里是因为要清除数据
  // if (lodash.isEmpty(lodash.trim(policyId))) {
  //   yield put({
  //     type: 'policyListUpdate',
  //     payload: { policyList: [] },
  //   });
  //   return;
  // }
  const response = yield call(identityV2, params);

  yield put({
    type: 'saveSnapshot',
  });
  const { success, resultData } = lodash.pick(response, ['success', 'resultData']);
  if (success && !lodash.isEmpty(resultData)) {
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
      const partyInfoList = lodash.chain(resultData.partyInfoList).compact().first().value();
      const policyList = partyInfoList.policyIdList;

      yield put({
        type: 'savePartyListInfo',
        payload: {
          policyOwnerList: partyInfoList?.policyResultList,
        },
      });
      yield put({
        type: 'saveBusinessProcess',
        payload: {
          selectColumns: partyInfoList,
        },
      });
      yield put({
        type: 'saveSelectInsuredInfo',
        payload: {
          selectColumns: partyInfoList,
          skipPolicyNo: searchByPolicyId,
          taskDetail,
        },
      });
      yield put({
        type: 'getC360Data',
      });
      yield put({
        type: `updateShowSearchModal`,
        payload: {
          showSearchModel: false,
        },
      });
    }
  } else if (lodash.isEmpty(resultData)) {
    yield put({
      type: 'policyListUpdate',
      payload: { policyList: [] },
    });
    if (searchByPolicyId) {
      Modal.error({
        content: formatMessageApi({ Label_COM_WarningMessage: 'ERR_000060' }, params?.policyId),
        okText: formatMessageApi({ Label_BIZ_Claim: 'venus_claim.label.receivedModalCancel' }),
      });
    }
    yield put({
      type: 'cleanSubmitParam',
      payload: {
        policyNo: policyId,
        searchByPolicyId,
      },
    });
    yield put({
      type: 'insured360/saveTaskInfo',
      payload: {
        taskDetail: {
          caseNo: '',
          customerType: '',
          caseCategory,
          businessNo,
        },
      },
    });
  }
}
