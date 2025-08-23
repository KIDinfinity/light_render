import { produce }  from 'immer';
import lodash from 'lodash';
import {v4 as uuidv4 } from 'uuid';
import { formUtils } from 'basic/components/Form';
import { relationshipWithInsuredForHK } from 'claim/enum';
import { PaymentMethod } from 'claim/pages/Enum';
import { IsDefault } from 'claim/enum';
import {
  getDefault,
} from 'claim/pages/utils/getPayeeDefaultData';

import { PAYEEITEM } from '@/utils/claimConstant';
import getTelNo from '../functions/getTelNo';
import { SwitchEnum } from 'claim/pages/utils/claim';


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
  let { payeeId } = action.payload;
  const nextState = produce(state, (draftState: any) => {
    if (!payeeId) {
      const id = uuidv4();
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
        payeeTemp.payeeContactList = lodash
          .chain(getDefault(payeeTemp.payeeContactList))
          .filter((item: any) => !!item?.id)
          .uniqBy('id')
          .map((contact: any) => {
            if (contact?.isDefault === IsDefault.YES) {
              return {
                email: payeeTemp?.email,
                contactType: payeeTemp?.contactType,
                address: payeeTemp?.address,
                address2: payeeTemp?.address2,
                sms: payeeTemp?.sms,
                telNo: payeeTemp?.phoneNo || contact.telNo,
                postCode: payeeTemp?.postCode
              }
            }

            return contact;
          })
          .compact()
          .value();
      draftState.claimEntities.payeeListMap[payeeId] = payeeTemp;
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
        case relationshipWithInsuredForHK.beneficiary:
          if(draftState.beneficiariesInfo.length >= 1) {
            draftState.beneficiaryPopUp = true;
            draftState.fillInPayeeId = payeeId;
          }
        default:
          payeeTemp = {
            ...lodash.omit(payeeTemp, keysInsured),
            organization: 0,
            ...changedFields,
          };
          break;
      }

      if(payeeTemp.clientId) {
        payeeTemp.payeeBankAccountList = draftState.c360PolicyInfo.clientBankAccountList
          .filter(bankAccount => bankAccount?.clientId === payeeTemp?.clientId)
          .map(obj => ({...obj, manualAdd: SwitchEnum.NO, id: uuidv4(), isNewBankAccount: SwitchEnum.NO}))

      } else {
        payeeTemp.payeeBankAccountList = []
      }
    }

    if (isEditStatus && lodash.has(changedFields, 'bankCode')) {
      payeeTemp = {
        ...payeeTemp,
        branchCode: '',
      };
    }
    if (isEditStatus && lodash.has(changedFields, 'paymentMethod')) {
      if (
        changedFields.paymentMethod.value !== PaymentMethod.bankCount
      ) {
        payeeTemp.payeeBankAccountList = payeeTemp.payeeBankAccountList.map(account => ({
          ...account,
          isSelect: false,
          isDefault: false
        }))
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
        payeeContactList: payeeTemp.payeeContactList?.map((el: any) => {
          return {
            ...el,
            telNo: getTelNo({
              value: formUtils.queryValue(el.telNo) || '',
              contactType: contactType || formUtils.queryValue(el.contactType),
              paymentMethod,
              countryCode,
            }),
          };
        }) || [],
      };
    }

    payeeTemp.payeeContactList = lodash
      .chain(getDefault(payeeTemp.payeeContactList))
      .filter((item: any) => !!item?.id)
      .uniqBy('id')
      .map((contact: any) => {
        if (contact?.isDefault === IsDefault.YES) {
          return {
            email: payeeTemp?.email,
            contactType: payeeTemp?.contactType,
            address: payeeTemp?.address,
            address2: payeeTemp?.address2,
            sms: payeeTemp?.sms,
            telNo: payeeTemp?.phoneNo || contact.telNo,
            postCode: payeeTemp?.postCode
          }
        }

        return contact;
      })
      .compact()
      .value();
    draftState.claimEntities.payeeListMap[payeeId] = payeeTemp;
  });

  return { ...nextState };
};

export default savePayee;
