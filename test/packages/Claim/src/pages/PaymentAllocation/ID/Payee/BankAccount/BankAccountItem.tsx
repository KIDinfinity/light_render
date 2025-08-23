import type { FunctionComponent} from 'react';
import React, { useEffect, useState } from 'react';
import { Form, Input, Icon } from 'antd';
import { connect, useDispatch } from 'dva';
import lodash from 'lodash';
import DataLayout from '@/components/DataLayout';
import {
  FormItemInput,
  FormItemSelectPlus,
  FormItemCheckbox,
  FormItemAutoComplete,
} from 'basic/components/Form/FormItem';
import { SwitchEnum } from 'claim/pages/utils/claim';
import type { IFormRegistProps } from '@/components/FormRegistComponent';
import FormRegist from '@/components/FormRegistComponent';

import { withContextData } from '@/components/_store';
import { formUtils } from 'basic/components/Form';
import { SeachCustom } from 'claim/pages/utils/claimUtils';
import { isPremiumAccount } from 'claim/enum/isPremiumAccount';
import Panel from '../../../_components/Panel';
import type { BankAccountModal, PayeeModal } from '../../../_dto/Models';
import { EPaymentMethod } from '../../../_dto/Enums';
import { shallowEqual, handleBankAccount } from '../../../_function';

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
  bankAccountList?: any[];
  index?: number;
}

const BankAccountItem: FunctionComponent<IBankAccount> = ({
  form,
  taskNotEditable,
  bankAccountItem,
  withData,
  Dropdown_CLM_Account,
  Dropdown_CLM_TransferAccount,
  bankAccountList,
  index,
}) => {
  const dispatch = useDispatch();
  const [dataSource, setDataSource] = useState([]);
  const bankCodeVal = form.getFieldValue('bankCode');
  const payeeItem = lodash.get(withData, 'payeeItem', {});
  useEffect(() => {
    const bankName = form.getFieldValue('bankName');
    const branchCode = form.getFieldValue('branchCode');
    const branchName = form.getFieldValue('branchName');
    if (bankName && branchName) return;
    dispatch({
      type: 'paymentAllocation/searchName',
      payload: {
        bankCode: bankCodeVal,
        branchCode,
        id: bankAccountItem?.id,
        payeeId: payeeItem?.id,
        seachCustom,
      },
    });
  }, []);

  const { paymentMethod, id: payeeId, clientId }: PayeeModal = payeeItem;
  const paymentMethodVal = formUtils.queryValue(paymentMethod);
  const isPremiumAccountY = bankAccountItem?.isPremiumAccount === isPremiumAccount.Yes;
  const isSelect = formUtils.queryValue(bankAccountItem?.isSelect);

  const requiredDCA = lodash.includes(
    [EPaymentMethod.BankTransfer, EPaymentMethod.DirectCredit],
    paymentMethodVal
  );

  const manualAdd =
    lodash.isString(bankAccountItem?.manualAdd) && bankAccountItem?.manualAdd === SwitchEnum.YES;

  const handleClose = (bankAccountId?: string) => {
    dispatch({
      type: 'paymentAllocation/deleteBankAccount',
      payload: {
        payeeId,
        bankAccountId,
      },
    });
  };

  useEffect(() => {
    const mapBankAccoutList: any = clientId ? bankAccountList?.[clientId] : [];

    const bankAccountNoList = handleBankAccount.getBankAccountNoList({
      clientId,
      mapBankAccoutList,
    });
    setDataSource(bankAccountNoList as any);
  }, [clientId]);

  const accountRequired = isSelect && requiredDCA && !isPremiumAccountY;

  return (
    <>
      <Panel.BackColor
        className={styles.BankAccountItem}
        onClose={() => handleClose(bankAccountItem?.id)}
        closable={!taskNotEditable && manualAdd}
      >
        <DataLayout className={styles.Policy} rowProps={{ gutter: 2 }}>
          <DataLayout.DataWrap span={1}>
            <FormItemCheckbox
              form={form}
              disabled={taskNotEditable}
              formName="isSelect"
              required={manualAdd}
            />
          </DataLayout.DataWrap>
          <DataLayout.DataWrap span={23}>
            <DataLayout className={styles.Policy} span={12}>
              <FormItemInput
                form={form}
                required={accountRequired}
                disabled={taskNotEditable || isPremiumAccountY}
                formName="accountHolder"
                labelId="Accountholder"
                labelTypeCode="Label_BIZ_Individual"
              />
              <FormItemAutoComplete
                form={form}
                required={accountRequired}
                disabled={taskNotEditable || isPremiumAccountY}
                formName="bankAccountNo"
                labelId="BankAccountNo"
                labelTypeCode="Label_BIZ_Individual"
                allowClear
                dataSource={dataSource}
                onSearch={() => dataSource}
                // onSelect={handleAccountNo}
              >
                <Input
                  maxLength={10}
                  suffix={<Icon className={styles.chequeRemarkListIcon} type="down" />}
                />
              </FormItemAutoComplete>
              <DataLayout span={12}>
                <FormItemSelectPlus
                  form={form}
                  required={accountRequired}
                  disabled={taskNotEditable || isPremiumAccountY}
                  formName="bankCode"
                  searchName="bank"
                  optionShowType="both"
                  searchCustom={handleBank}
                  labelId="BankCode"
                  labelTypeCode="Label_BIZ_Individual"
                />
                <FormItemSelectPlus
                  form={form}
                  required={accountRequired}
                  disabled={taskNotEditable || isPremiumAccountY}
                  formName="bankName"
                  searchName="bank"
                  optionShowType="name"
                  searchCustom={handleBank}
                  labelId="BankName"
                  labelTypeCode="Label_BIZ_Individual"
                  saveName
                />
              </DataLayout>
            </DataLayout>
          </DataLayout.DataWrap>
        </DataLayout>
      </Panel.BackColor>
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
    const clientId = lodash.get(withData, 'payeeItem.clientId');
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
              clientId,
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
            clientId,
          },
        });
      }
    }
  },
})(FormRegist({ nameSpace: 'paymentAllocation' })(React.memo(BankAccountItem, shallowEqual)));

export default connect(
  ({ claimEditable, formCommonController, dictionaryController, paymentAllocation }: any) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    validating: formCommonController.validating,
    Dropdown_CLM_TransferAccount: dictionaryController.Dropdown_CLM_TransferAccount,
    Dropdown_CLM_Account: dictionaryController.Dropdown_CLM_Account,
    bankAccountList: paymentAllocation.bankAccountList,
  })
)(withContextData(FormWrap));
