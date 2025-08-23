import { produce }  from 'immer';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';
import { relationshipWithInsuredForHK } from 'claim/enum';
import { PaymentMethod } from 'claim/pages/Enum';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import {
  saveDefaultPayee,
  getDefaultPayeeId,
  saveNormalizedPayee,
} from 'claim/pages/utils/getPayeeDefaultData';
import { getBeneficiaryName } from '../functions/getStrVal';
import { PAYEEITEM } from '@/utils/claimConstant';

const keysInsured = [
  'address',
  'clientId',
  'dateOfBirth',
  'email',
  'firstName',
  'gender',
  'identityNo',
  'identityType',
  'middleName',
  'phoneNo',
  'postCode',
  'surname',
];

const savePayee = (state: any, action: any) => {
  const { changedFields } = action.payload;
  const isEditStatus = lodash.keys(changedFields).length === 1;
  const payeeListMap = lodash.get(state, 'claimEntities.payeeListMap');
  let payeeId = getDefaultPayeeId(payeeListMap);
  const id = uuidv4();
  const nextState = produce(state, (draftState: any) => {
    if (!payeeId) {
      draftState.claimProcessData.payeeList = [...draftState.claimProcessData.payeeList, id];
      draftState.claimEntities.payeeListMap[id] = {
        ...PAYEEITEM,
        claimNo: draftState.claimProcessData.claimNo,
        id,
      };
      payeeId = id;
    }

    let payeeTemp = {
      ...draftState.claimEntities.payeeListMap[payeeId],
      ...changedFields,
    };

    if (lodash.size(changedFields) > 1) {
      draftState.claimEntities.payeeListMap[payeeId] = saveDefaultPayee(payeeTemp);
      return;
    }

    if (lodash.has(changedFields, 'payeeType')) {
      switch (changedFields.payeeType.value) {
        case relationshipWithInsuredForHK.self:
          payeeTemp = {
            ...payeeTemp,
            ...lodash.pick(draftState.claimProcessData.insured, keysInsured),
            organization: 0,
          };
          break;
        case relationshipWithInsuredForHK.policyOwner:
          payeeTemp = {
            ...payeeTemp,
            ...lodash.pick(draftState.claimProcessData.claimant, keysInsured),
            organization: 0,
          };
          break;
        default:
          payeeTemp = {
            organization: 0,
            ...changedFields,
          };
          break;
      }
    }

    if (isEditStatus && lodash.has(changedFields, 'bankCode')) {
      payeeTemp = {
        ...payeeTemp,
        branchCode: '',
      };
    }
    if (isEditStatus && lodash.has(changedFields, 'paymentMethod')) {
      const payee = draftState.claimEntities.payeeListMap[payeeId];
      if (changedFields.paymentMethod.value === PaymentMethod.DirectCredit) {
        payeeTemp = {
          ...payeeTemp,
          accountHolder: getBeneficiaryName(formUtils.queryValue(payee.firstName), formUtils.queryValue(payee.surname)),
        };
      }
      if (isEditStatus && changedFields.paymentMethod.value !== PaymentMethod.FasterPayment) {
        payeeTemp = {
          ...payeeTemp,
          contactType: formUtils.queryValue(payeeTemp?.contactType),
        };
      }
      if (
        changedFields.paymentMethod.value === PaymentMethod.ByCheck ||
        changedFields.paymentMethod.value !== PaymentMethod.DirectCredit
      ) {
        payeeTemp = {
          ...payeeTemp,
          bankCode: '',
          accountHolder: '',
          bankAccountNo: '',
          branchCode: '',
        };
      } else if (changedFields.paymentMethod.value === PaymentMethod.BankTransfer) {
        payeeTemp.accountHolder = `${formUtils.queryValue(payeeTemp.firstName)} ${formUtils.queryValue(
          payeeTemp.surname
        )}`;
      }

      if (formUtils.queryValue(changedFields.paymentMethod) !== PaymentMethod.ElevenCash) {
        payeeTemp.phoneNo = formUtils.queryValue(payeeTemp.phoneNo);
        payeeTemp.email = formUtils.queryValue(payeeTemp.email);
      }
    }
    if (lodash.has(changedFields, 'identityType') && !changedFields.identityType.value) {
      payeeTemp.identityNo = '';
    }

    if (
      !lodash.has(changedFields, 'paymentMethod') &&
      isEditStatus
    ) {
      if (
        (
          (lodash.has(changedFields, 'identityType') && changedFields?.identityType?.value !== 'I') ||
          lodash.has(changedFields, 'identityNo') && lodash.isEmpty(changedFields?.identityNo?.value)
        ) &&
        formUtils.queryValue(payeeTemp?.paymentMethod) === '03'
      ) {
        const MSG_000538 = {
          field: 'paymentMethod',
          message: formatMessageApi({ Label_COM_WarningMessage: 'MSG_000538' }),
        }
        if (lodash.isPlainObject(payeeTemp?.paymentMethod)) {
          payeeTemp.paymentMethod.errors = lodash.isArray(payeeTemp?.paymentMethod?.errors) ? payeeTemp.paymentMethod.errors.push(MSG_000538) : [MSG_000538]
        } else {
          payeeTemp.paymentMethod = {
            value: payeeTemp?.paymentMethod,
            errors: [MSG_000538]
          }
        }
      } else {
        payeeTemp.paymentMethod = formUtils.queryValue(payeeTemp?.paymentMethod);
      }
    }

    const newPayeeTemp = saveDefaultPayee(payeeTemp, changedFields);

    const result = saveNormalizedPayee(
      draftState.claimEntities.payeeListMap,
      newPayeeTemp,
      payeeId
    );

    draftState.claimProcessData.payeeList = result.payeeList;
    draftState.claimEntities.payeeListMap = result.payeeListMap;
  });

  return { ...nextState };
};

export default savePayee;
