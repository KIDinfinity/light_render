import lodash from 'lodash';
import { NAMESPACE } from '../../activity.config';
import { identityV2 } from '@/services/c360PartyInfoControllerService';
import { tenant } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import { BusinessCode } from 'claim/enum/BusinessCode';
import { HKCustomerType, PolicySource } from 'claim/pages/Enum';
import { handleWarnMessageModal } from '@/utils/commonMessage';
import { formatMessageApi } from '@/utils/dictFormatMessage';
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
  const { policyIdList, forceFetch } = payload;

  const companyCode = yield select(({ processTask }: any) => processTask.getTask?.companyCode);

  const chequeCategory = yield select(
    ({ [NAMESPACE]: modelnamepsace }: any) =>
      modelnamepsace?.businessData?.chequeCase.chequeCategory
  );
  if (
    companyCode === 'Assurance' &&
    formUtils.queryValue(chequeCategory) === 'CDS' &&
    !forceFetch
  ) {
    return;
  }

  const response = yield call(identityV2, {
    regionCode: tenant.remoteRegion(),
    businessCode: BusinessCode.claim,
    policySource: PolicySource.individual,
    customerType: HKCustomerType.CUS001,
    companyCode,
    policyIdList,
  });

  if (
    lodash.isPlainObject(response) &&
    response.success &&
    lodash.isPlainObject(response.resultData)
  ) {
    const partyInfoItem = lodash.chain(response.resultData.partyInfoList).compact().first().value();
    const newPolicyId = partyInfoItem?.newPolicyId || '';
    if (!!newPolicyId && newPolicyId !== policyIdList[0]) {
      showMessage({ newPolicyId });
      yield put({
        type: 'updateBusinessData',
        payload: {
          changedFields: {
            policyNo: newPolicyId,
          },
        },
      });
    }
    if (lodash.size(response.resultData?.partyInfoList) > 1) {
      yield put({
        type: 'saveSearchList',
        payload: {
          searchList: response.resultData?.partyInfoList,
        },
      });
    } else {
      const partyInfoItem =
        lodash
          .chain(response.resultData?.partyInfoList || [])
          .compact()
          .first()
          .value() || {};
      yield put({
        type: 'updateInsuredName',
        payload: {
          partyInfoItem,
        },
      });
    }
  }
}
