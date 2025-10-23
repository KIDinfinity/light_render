import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { getBankAccountError, getPayoutAmountError } from '../../_function';
import { NAMESPACE } from 'process/PHCLM/ManualAssessment/activity.config';
import handleWarnMessageModal from '@/utils/commonMessage';
import delay from '@/utils/delay';

export default function* validateCertainTab({payload}: any, { select, put }: any) {
  yield put({
    type: 'formCommonController/handleValidating',
  });

  yield delay(0);

  const {paymentAllocation: {claimData}, formCommonController: {forms}, [NAMESPACE]: {claimEntities, claimProcessData}} = yield select((state: any) => state);

  const formIds = Object.keys(forms)
  const formIdsInTab: any[][] = [
    ['payeePaymentInfo'],
    ['payeePaymentAllocation'],
    ['payee.Basic','payeeUser','payeeUsText', 'payeeAddress'],
  ].map(arr => {
    return arr.reduce((acc, formIdInTab) => ([...formIds.filter(formId => lodash.startsWith(formId, formIdInTab)), ...acc]),[])
  })

  const tabErrors = yield Promise.all(
    formIdsInTab.map(ids => formUtils.validateFormsAndGetErrorsAsync({ forms: ids.map(i=>forms[i]), force: true }))
  );
  const bankAccountErrors: any[] = getBankAccountError(claimData);
  const payoutAmountError: any[] = getPayoutAmountError(claimData, claimEntities, claimProcessData);
  const errors = [...lodash.flattenDeep(tabErrors), ...bankAccountErrors, ...payoutAmountError];

  if(payload?.isSubmit && payoutAmountError.length>0){
    handleWarnMessageModal(
      payoutAmountError.map((e, idx)=>({content: e.message||e.content||e, messageCode: idx}))
    );
  }

  yield put({
    type: 'saveErrors',
    payload: {
      tabErrors,
      errors,
    },
  });

  yield put({
    type: 'formCommonController/handleUnValidating',
  });

  return errors;
}
