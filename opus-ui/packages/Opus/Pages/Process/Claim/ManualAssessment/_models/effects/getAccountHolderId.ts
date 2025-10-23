import lodash from 'lodash';

import { accountRegister } from '@/services/claimOmneService';
import { handleMessageModal } from '@/utils/commonMessage';
import { SeachCustom } from 'claim/pages/utils/claimUtils';
import { formUtils } from 'basic/components/Form';

const seachCustom = new SeachCustom();

export default function* ({ payload }: any, { select }: any) {
  const { dispatch, payeeId, itemId } = payload;
  const forms = yield select((state: any) => state.formCommonController.forms);
  const insured = yield select((state: any) => state.opusClaimAssessment.claimProcessData.insured);

  const { policyId } = lodash.pick(insured, ['policyId']);
  const payeeForms = lodash.pickBy(forms, (_, key) => lodash.startsWith(key, 'paymentAllocation-'));

  if (payeeForms) {
    yield Promise.all(
      Object.values(payeeForms).map((item) => {
        return item
          .validateFields(
            [
              'accountHolder',
              'accountHolderClientId',
              'accountType',
              'bankAccountNo',
              'bankCode',
              'bankType',
              'bizClientId',
              'branchCode',
              'passbookCode',
              'passbookNo',
              'paymentMethod',
            ],
            { force: true }
          )
          .then((result) => result);
      })
    )
      .then(async (allResults) => {
        let combined: any = {};

        allResults.map((res) => {
          combined = {
            ...combined,
            ...res,
          };
        });

        const {
          accountHolder,
          accountHolderClientId,
          accountType,
          bankAccountNo,
          bankCode,
          bankType,
          bizClientId,
          branchCode,
          passbookCode,
          passbookNo,
        } = combined;

        const registerResponse = await accountRegister({
          businessData: {
            policyId: formUtils.queryValue(policyId),
            accountHolder,
            accountHolderClientId,
            accountType,
            bankAccountNo,
            bankCode,
            bankType,
            bizClientId,
            branchCode,
            passbookCode,
            passbookNo,
          },
        });

        if (registerResponse.success) {
          const { accountHolderClientId: accountHolderId, accountHolder: reqAccountHolder } =
            registerResponse.resultData;

          dispatch({
            type: 'opusClaimAssessment/saveFormData',
            target: 'saveBankAccount',
            payload: {
              changedFields: {
                accountHolderClientId: accountHolderId,
                accountHolder: reqAccountHolder,
              },
              id: itemId,
              payeeId,
              seachCustom,
            },
          });
        } else {
          handleMessageModal(registerResponse.promptMessages, {
            cancelButtonProps: {
              style: {
                display: 'none',
              },
            },
          });
        }
      })
      .catch((err: any) => {
        console.log(err);
      });
  }
}
