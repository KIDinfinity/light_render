import { produce } from 'immer';
import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import type { PayeeModal, ContactModal } from '../_dto/Models';
import { EContactType, EPaymentMethod } from '../_dto/Enums';
import { getTelNo } from '../_function';

export default (state: any, { payload }: any = {}) => {
  return produce(state, (draftState: any) => {
    const draft = draftState;
    const { changedFields, id: contactId, payeeId, countryCode } = payload;

    const { payeeList } = draft.paymentModal.datas;
    const editStatus = lodash.keys(changedFields).length === 1;
    draft.paymentModal.datas.payeeList = lodash
      .chain(payeeList)
      .compact()
      .map((payee: PayeeModal) => {
        const { payeeContactList, id } = payee;
        if (id === payeeId) {
          const payeeTemp = { ...payee };
          const payeeContacts = lodash
            .chain(payeeContactList)
            .compact()
            .map((payeeContact: ContactModal) => {
              if (payeeContact.id === contactId) {
                const payeeContactTemp = { ...payeeContact };
                if (lodash.has(changedFields, 'contactType') && editStatus) {
                  const isFasterPayment =
                    formUtils.queryValue(payee.paymentMethod) === EPaymentMethod.FasterPayment;
                  const isEmail =
                    formUtils.queryValue(changedFields.contactType) === EContactType.Email;

                  if (isFasterPayment) {
                    if (!isEmail) {
                      payeeContactTemp.email = formUtils.queryValue(payeeContactTemp.email);
                    }
                    if (
                      formUtils.queryValue(changedFields.contactType) === EContactType.MobilePhone
                    ) {
                      payeeContactTemp.telNo = getTelNo({
                        value: formUtils.queryValue(payeeContactTemp.telNo) || '',
                        contactType: formUtils.queryValue(changedFields.contactType),
                        paymentMethod: formUtils.queryValue(payee.paymentMethod),
                        countryCode,
                      });
                    }
                  }
                }

                return { ...payeeContactTemp, ...changedFields };
              }
              return payeeContact;
            })
            .value();
          return { ...payeeTemp, payeeContactList: payeeContacts };
        }
        return payee;
      })
      .value();
  });
};
