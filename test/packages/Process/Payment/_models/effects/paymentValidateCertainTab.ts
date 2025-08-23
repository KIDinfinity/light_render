import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import { getBankAccountError, getPayoutAmountError, getPayeeListError } from '../_function';
import handleWarnMessageModal from '@/utils/commonMessage';
import delay from '@/utils/delay';

export default function* validateCertainTab(
  { payload }: any,
  { select, put }: any
): Generator<any, any, any> {
  const { NAMESPACE } = payload;

  yield put({
    type: 'formCommonController/handleValidating',
  });

  yield delay(0);

  const claimData = yield select(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.paymentModal?.datas
  ) || {};
  const forms = yield select(({ formCommonController }: any) => formCommonController?.forms) || {};

  const claimEntities = yield select(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.claimEntities
  ) || {};
  const claimProcessData = yield select(
    ({ [NAMESPACE]: modelnamespace }: any) => modelnamespace?.claimProcessData
  ) || {};

  const formIds = Object.keys(forms);
  const formIdsInTab: any[][] = [
    ['payeePaymentInfo'],
    ['payeePaymentAllocation'],
    ['payee.Basic', 'payeeUser', 'payeeUsText', 'payeeAddress'],
  ].map((arr) => {
    return arr.reduce(
      (acc, formIdInTab) => [
        ...formIds.filter((formId) => lodash.startsWith(formId, formIdInTab)),
        ...acc,
      ],
      []
    );
  });

  const tabErrors = yield Promise.all(
    formIdsInTab.map((ids) =>
      formUtils.validateFormsAndGetErrorsAsync({ forms: ids.map((i) => forms[i]), force: true })
    )
  );
  const payeeListErrors: any[] = payload?.isSubmit ? getPayeeListError(claimData) : [];
  const bankAccountErrors: any[] = getBankAccountError(claimData);
  const payoutAmountError: any[] = getPayoutAmountError(claimData, claimEntities, claimProcessData);
  const errors = lodash.concat(
    lodash.flattenDeep(tabErrors),
    bankAccountErrors,
    payeeListErrors,
    payoutAmountError
  );

  // [...lodash.flattenDeep(tabErrors), ...bankAccountErrors, ...payoutAmountError];

  const popupErr = payeeListErrors.length > 0 ? payeeListErrors : payoutAmountError;

  if (popupErr.length > 0) {
    handleWarnMessageModal(
      popupErr.map((e, idx) => ({
        content: e.message || e.content || e,
        messageCode: idx,
      }))
    );
  }

  yield put({
    type: 'paymentSaveError',
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
