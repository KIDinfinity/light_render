import type { FunctionComponent} from 'react';
import React, { useEffect } from 'react';
import { Form } from 'antd';
import { connect, useDispatch } from 'dva';
import lodash from 'lodash';
import DataLayout from '@/components/DataLayout';
import {
  FormItemInput,
  FormItemSelect,
  FormItemSelectPlus,
  FormItemCheckbox,
} from 'basic/components/Form/FormItem';
import { SwitchEnum } from 'claim/pages/utils/claim';
import type { IFormRegistProps } from '@/components/FormRegistComponent';
import FormRegist from '@/components/FormRegistComponent';
import { SeachCustom } from 'claim/pages/utils/claimUtils';
import { formUtils } from 'basic/components/Form';
import { withContextData } from '@/components/_store';
import { searchByCodes, searchByBranchCodes } from '@/services/miscStandardBankControllerService';
import { tenant } from '@/components/Tenant';
import { isPremiumAccount } from 'claim/enum/isPremiumAccount';
import { deleteWarning, SectionID } from '@/components/sectionWarning/index';
import Panel from '../../../_components/Panel';
import type { BankAccountModal, PayeeModal } from '../../../_dto/Models';
import { EPaymentMethod } from '../../../_dto/Enums';
import { shallowEqual } from '../../../_function';
import { VLD_000333 } from '../../../_validators/fieldValidators';

import styles from './styles.less';

const seachCustom = new SeachCustom();
const { handleBank, handleBankBranch } = seachCustom;

export interface IBankAccount extends IFormRegistProps {
  bankAccountItem?: BankAccountModal;
  taskNotEditable?: boolean;
  manualAdd?: boolean;
  payeeId?: string;
  withData?: any;
  validating?: boolean;
  Dropdown_CLM_TransferAccount?: any[];
  Dropdown_CLM_Account?: any[];
  payeeBankAccountList: BankAccountModal[];
}

const BankAccountItem: FunctionComponent<IBankAccount> = ({
  form,
  taskNotEditable,
  bankAccountItem,
  withData,
  Dropdown_CLM_Account,
  Dropdown_CLM_TransferAccount,
  payeeBankAccountList,
}) => {
  const dispatch = useDispatch();
  const bankCode = form.getFieldValue('bankCode');
  const branchCode = form.getFieldValue('branchCode');
  const bankNameO = form.getFieldValue('bankName');
  const branchNameO = form.getFieldValue('branchName');
  const payeeItem = lodash.get(withData, 'payeeItem', {});
  const { paymentMethod, id: payeeId }: PayeeModal = payeeItem;
  const paymentMethodVal = formUtils.queryValue(paymentMethod);
  const isPremiumAccountY = bankAccountItem?.isPremiumAccount === isPremiumAccount.Yes;

  const manualAdd =
    lodash.isString(bankAccountItem?.manualAdd) && bankAccountItem?.manualAdd === SwitchEnum.YES;

  const isPostBank = paymentMethodVal === EPaymentMethod.PostBank;

  const isBank =
    paymentMethodVal === EPaymentMethod.BankTransfer ||
    paymentMethodVal === EPaymentMethod.PremiumAccount;

  const sectionRef: any = React.createRef();

  const handleClose = (bankAccountId?: string) => {
    deleteWarning({
      sectionRef,
      sectionID: SectionID.BankAccount,
    }).then(() => {
      dispatch({
        type: 'paymentAllocation/deleteBankAccount',
        payload: {
          payeeId,
          bankAccountId,
        },
      });
    });
  };

  useEffect(() => {
    const regionCode = tenant.region();
    if (bankCode && !bankNameO) {
      const responseBank = searchByCodes([bankCode], null);
      responseBank?.then?.((bank) => {
        const bankName = lodash.find(bank?.resultData, { bankCode, regionCode })?.bankName;

        dispatch({
          type: 'paymentAllocation/saveBankAccount',
          payload: {
            changedFields: { bankName, bankCode },
            id: bankAccountItem?.id,
            payeeId,
            seachCustom,
          },
        });
      });
    }

    if (branchCode && !branchNameO) {
      const responseBranch = searchByBranchCodes([branchCode], null);
      responseBranch?.then?.((branch) => {
        const branchName = lodash.find(branch?.resultData, { branchCode, regionCode })?.branchName;

        dispatch({
          type: 'paymentAllocation/saveBankAccount',
          payload: {
            changedFields: { branchName, branchCode },
            id: bankAccountItem?.id,
            payeeId,
            seachCustom,
          },
        });
      });
    }
  }, []);

  return (
    <>
      {(isPostBank || isBank) && (
        <Panel.BackColor
          className={styles.BankAccountItem}
          onClose={() => handleClose(bankAccountItem?.id)}
          closable={!taskNotEditable && manualAdd}
          ref={sectionRef}
        >
          <DataLayout className={styles.Policy} rowProps={{ gutter: 2 }}>
            {(isBank || isPostBank) && (
              <DataLayout.DataWrap span={1}>
                <FormItemCheckbox
                  form={form}
                  disabled={taskNotEditable}
                  formName="isSelect"
                  required={manualAdd}
                />
              </DataLayout.DataWrap>
            )}
            {isBank && (
              <DataLayout.DataWrap span={23}>
                <DataLayout className={styles.Policy} span={12}>
                  <FormItemInput
                    form={form}
                    disabled={taskNotEditable || isPremiumAccountY}
                    formName="accountHolder"
                    labelId="Accountholder"
                    labelTypeCode="Label_BIZ_Individual"
                    required={manualAdd}
                  />
                  <FormItemInput
                    form={form}
                    disabled={taskNotEditable || isPremiumAccountY}
                    formName="bankAccountNo"
                    labelId="BankAccountNo"
                    labelTypeCode="Label_BIZ_Individual"
                    required={manualAdd}
                    rules={[{ validator: VLD_000333(payeeBankAccountList, bankAccountItem) }]}
                  />
                </DataLayout>
                <DataLayout span={12}>
                  <FormItemSelectPlus
                    form={form}
                    disabled={taskNotEditable || isPremiumAccountY}
                    formName="bankCode"
                    searchName="bank"
                    optionShowType="value"
                    searchCustom={handleBank}
                    labelId="BankCode"
                    labelTypeCode="Label_BIZ_Individual"
                    required={manualAdd}
                  />
                  <FormItemSelectPlus
                    form={form}
                    disabled={taskNotEditable || isPremiumAccountY}
                    formName="bankName"
                    searchName="bank"
                    optionShowType="name"
                    searchCustom={handleBank}
                    labelId="BankName"
                    labelTypeCode="Label_BIZ_Individual"
                    saveName
                    required={manualAdd}
                  />
                </DataLayout>
                <DataLayout span={12}>
                  <FormItemSelectPlus
                    form={form}
                    disabled={taskNotEditable || isPremiumAccountY}
                    formName="branchCode"
                    searchName="bankBranch"
                    optionShowType="value"
                    extraData={bankCode}
                    searchCustom={(postData: any) => handleBankBranch(postData, bankCode)}
                    labelId="BranchCode"
                    labelTypeCode="Label_BIZ_Individual"
                    required={manualAdd}
                  />
                  <FormItemSelectPlus
                    form={form}
                    disabled={taskNotEditable || isPremiumAccountY}
                    formName="branchName"
                    searchName="bankBranch"
                    optionShowType="name"
                    extraData={bankCode}
                    searchCustom={(postData: any) => handleBankBranch(postData, bankCode)}
                    labelId="BranchName"
                    labelTypeCode="Label_BIZ_Individual"
                    saveName
                    required={manualAdd}
                  />
                </DataLayout>
                <DataLayout span={12}>
                  <FormItemSelect
                    form={form}
                    disabled={taskNotEditable || isPremiumAccountY}
                    formName="accountType"
                    labelId="TransferAccount"
                    dicts={Dropdown_CLM_TransferAccount}
                  />
                  <FormItemSelect
                    form={form}
                    disabled={taskNotEditable || isPremiumAccountY}
                    formName="accountingSubject"
                    labelId="Accounting"
                    dicts={Dropdown_CLM_Account}
                  />
                </DataLayout>
              </DataLayout.DataWrap>
            )}
            {isPostBank && (
              <DataLayout.DataWrap span={23}>
                <DataLayout className={styles.Policy} span={12}>
                  <FormItemInput
                    form={form}
                    disabled={taskNotEditable || isPremiumAccountY}
                    formName="accountHolder"
                    labelId="Accountholder"
                    labelTypeCode="Label_BIZ_Individual"
                    required={manualAdd}
                  />
                  <DataLayout span={12}>
                    <FormItemSelect
                      form={form}
                      disabled={taskNotEditable || isPremiumAccountY}
                      formName="accountType"
                      labelId="TransferAccount"
                      dicts={Dropdown_CLM_TransferAccount}
                    />
                    <FormItemSelect
                      form={form}
                      disabled={taskNotEditable || isPremiumAccountY}
                      formName="accountingSubject"
                      labelId="Account"
                      dicts={Dropdown_CLM_Account}
                    />
                  </DataLayout>
                  <DataLayout span={12}>
                    <FormItemInput
                      form={form}
                      disabled={taskNotEditable || isPremiumAccountY}
                      formName="passbookCode"
                      labelId="PostbankID"
                      required={manualAdd || isPostBank}
                    />
                    <FormItemInput
                      form={form}
                      disabled={taskNotEditable || isPremiumAccountY}
                      formName="passbookNo"
                      labelId="PostbankNo"
                      required={manualAdd || isPostBank}
                    />
                  </DataLayout>
                </DataLayout>
              </DataLayout.DataWrap>
            )}
          </DataLayout>
        </Panel.BackColor>
      )}
    </>
  );
};

const FormWrap = Form.create<IBankAccount>({
  mapPropsToFields(props) {
    const { bankAccountItem } = props;

    return formUtils.mapObjectToFields(bankAccountItem, {
      isSelect: (value: any) => !!value,
    });
  },
  onFieldsChange(props, changedFields) {
    const { dispatch, bankAccountItem, withData, validating } = props;
    const payeeId = lodash.get(withData, 'payeeItem.id', '');

    if (lodash.isFunction(dispatch) && formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'paymentAllocation/saveEntry',
            target: 'saveBankAccount',
            payload: {
              changedFields,
              id: bankAccountItem?.id,
              payeeId,
              seachCustom,
            },
          });
        });
      } else {
        dispatch({
          type: 'paymentAllocation/saveFormData',
          target: 'saveBankAccount',
          payload: {
            changedFields,
            id: bankAccountItem?.id,
            payeeId,
            seachCustom,
          },
        });
      }
    }
  },
})(FormRegist({ nameSpace: 'paymentAllocation' })(React.memo(BankAccountItem, shallowEqual)));

export default connect(({ claimEditable, formCommonController, dictionaryController }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  validating: formCommonController.validating,
  Dropdown_CLM_TransferAccount: dictionaryController.Dropdown_CLM_TransferAccount,
  Dropdown_CLM_Account: dictionaryController.Dropdown_CLM_Account,
}))(withContextData(FormWrap));
