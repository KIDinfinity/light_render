import { produce }  from 'immer';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';
import { relationshipWithInsuredForHK } from 'claim/enum';
import { PaymentMethod } from 'claim/pages/Enum';
import {
  saveDefaultPayee,
  getDefaultPayeeId,
  saveNormalizedPayee,
} from 'claim/pages/utils/getPayeeDefaultData';
import { getBeneficiaryName } from '../functions/getStrVal';
import { PAYEEITEM } from '@/utils/claimConstant';
import getTelNo from '../functions/getTelNo';

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
  const { changedFields, countryCode } = action.payload;
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
          accountHolder: getBeneficiaryName(
            formUtils.queryValue(payee.surname),
            formUtils.queryValue(payee.firstName)
          ),
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
        payeeTemp.accountHolder = `${formUtils.queryValue(
          payeeTemp.surname
        )} ${formUtils.queryValue(payeeTemp.firstName)}`;
      }

      if (formUtils.queryValue(changedFields.paymentMethod) !== PaymentMethod.ElevenCash) {
        payeeTemp.phoneNo = formUtils.queryValue(payeeTemp.phoneNo);
        payeeTemp.email = formUtils.queryValue(payeeTemp.email);
      }
    }
    if (lodash.has(changedFields, 'identityType') && !changedFields.identityType.value) {
      payeeTemp.identityNo = '';
    }

    const { contactType, paymentMethod } = formUtils.cleanValidateData(payeeTemp);
    if (isEditStatus && lodash.size(changedFields) === 1 && lodash.has(changedFields, 'phoneNo')) {
      payeeTemp = {
        ...payeeTemp,
        phoneNo: {
          ...payeeTemp.phoneNo,
          value: getTelNo({
            value: formUtils.queryValue(changedFields.phoneNo) || '',
            contactType:
              contactType || formUtils.queryValue(payeeTemp.payeeContactList[0]?.contactType),
            paymentMethod,
            countryCode,
          }),
        },
      };
    }

    if (
      isEditStatus &&
      lodash.size(changedFields) === 1 &&
      (lodash.has(changedFields, 'contactType') || lodash.has(changedFields, 'paymentMethod'))
    ) {
      payeeTemp = {
        ...payeeTemp,
        payeeContactList: payeeTemp.payeeContactList.map((el: any) => {
          return {
            ...el,
            telNo: getTelNo({
              value: formUtils.queryValue(el.telNo) || '',
              contactType: contactType || formUtils.queryValue(el.contactType),
              paymentMethod,
              countryCode,
            }),
          };
        }),
      };
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
