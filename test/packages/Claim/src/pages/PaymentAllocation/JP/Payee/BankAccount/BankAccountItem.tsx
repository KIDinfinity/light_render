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

import { withContextData } from '@/components/_store';
import { Validator, formUtils } from 'basic/components/Form';
import { SeachCustom } from 'claim/pages/utils/claimUtils';
import Panel from '../../../_components/Panel';
import type { BankAccountModal, PayeeModal } from '../../../_dto/Models';
import { EPaymentMethod, BankType } from '../../../_dto/Enums';
import { shallowEqual } from '../../../_function';

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
  Dropdown_CLM_AccountType?: any[];
  Dropdown_CLM_BankType?: any[];
  Dropdown_COM_YN?: any[];
  Dropdown_POL_BankDesc?: any[];
  payeeBankAccountList: BankAccountModal[];
  isPrem: any;
  incidentListMap: any;
  claimDecision: any;
}

const BankAccountItem: FunctionComponent<IBankAccount> = ({
  form,
  taskNotEditable,
  bankAccountItem,
  withData,
  Dropdown_CLM_AccountType,
  Dropdown_CLM_BankType,
  Dropdown_COM_YN,
  Dropdown_POL_BankDesc,
  claimDecision,
  incidentListMap,
}) => {
  const { bankCodeCache } = bankAccountItem;
  const dispatch = useDispatch();
  const bankCode = form.getFieldValue('bankCode');
  const payeeItem = lodash.get(withData, 'payeeItem', {});
  useEffect(() => {
    const bankName = form.getFieldValue('bankName');
    const branchCode = form.getFieldValue('branchCode');
    const branchName = form.getFieldValue('branchName');
    if (bankName && branchName) return;
    dispatch({
      type: 'paymentAllocation/searchName',
      payload: {
        bankCode,
        branchCode,
        id: bankAccountItem?.id,
        payeeId: payeeItem?.id,
        seachCustom,
      },
    });
  }, []);
  const bankType = form.getFieldValue('bankType');
  const { paymentMethod, id: payeeId }: PayeeModal = payeeItem;
  const paymentMethodVal = formUtils.queryValue(paymentMethod);
  const isPostBank = paymentMethodVal === EPaymentMethod.PostBank;
  const isBank = paymentMethodVal === EPaymentMethod.BankTransfer;
  const isPrem = paymentMethodVal === EPaymentMethod.PremiumAccount;
  const isOther = paymentMethodVal === EPaymentMethod.Other;
  const requiredDCA = lodash.includes(
    [EPaymentMethod.BankTransfer, EPaymentMethod.DirectCredit],
    paymentMethodVal
  );
  const isBankTypeBank = bankType === BankType.Bank;
  const isBankTypePostalBank = bankType === BankType.PostalBank;

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

  const accountRequired = requiredDCA && !isPrem;

  return (
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
        <DataLayout.DataWrap className={styles.Policy} span={23}>
          <DataLayout rowProps={{ justify: 'start' }}>
            <FormItemInput
              form={form}
              required
              disabled={taskNotEditable || isPrem}
              formName="accountHolder"
              labelId="Accountholder"
              labelTypeCode="Label_BIZ_Individual"
              span={isPostBank ? 24 : 16}
              rules={[Validator.VLD_000558()]}
            />
            {(isOther || isBank || (isPrem && bankCodeCache !== '9900')) && (
              <FormItemInput
                form={form}
                required={isBank}
                disabled={taskNotEditable || isPrem}
                formName="bankAccountNo"
                labelId="BankAccountNo"
                labelTypeCode="Label_BIZ_Individual"
                rules={[Validator.VLD_000592(isPrem), Validator.VLD_000593(7, isPrem)]}
              />
            )}
            {(isOther || isBank || isPrem) && (
              <FormItemSelect
                dicts={Dropdown_CLM_BankType}
                disabled={taskNotEditable || isPrem}
                form={form}
                formName="bankType"
                labelId="BankType"
                labelTypeCode="Label_BIZ_Individual"
                required
              />
            )}
            {(isOther || isBank || (isPrem && bankCodeCache !== '9900')) && (
              <FormItemSelectPlus
                form={form}
                required={isBank}
                disabled={taskNotEditable || isPrem}
                formName="bankCode"
                searchName="bank"
                optionShowType="both"
                searchCustom={handleBank}
                labelId="BankCode"
                labelTypeCode="Label_BIZ_Individual"
                selectCallbackExProp="bankName"
              />
            )}
            {(isOther || isBank || (isPrem && bankCodeCache !== '9900')) && (
              <FormItemSelectPlus
                form={form}
                required={isBank}
                disabled={taskNotEditable || isPrem}
                formName="bankName"
                searchName="bank"
                optionShowType="name"
                searchCustom={handleBank}
                labelId="BankName"
                labelTypeCode="Label_BIZ_Individual"
                saveName
              />
            )}
            {(isOther || isBank || (isPrem && bankCodeCache !== '9900')) && (
              <FormItemSelectPlus
                form={form}
                required={isBank}
                disabled={taskNotEditable || isPrem}
                formName="branchCode"
                searchName="bankBranchJp"
                optionShowType="both"
                searchCustom={(postData: any) => handleBankBranch(postData)}
                labelId="BranchCode"
                labelTypeCode="Label_BIZ_Individual"
                extraData={bankCode}
                selectCallbackExProp="branchName"
              />
            )}
            {(isOther || isBank || (isPrem && bankCodeCache !== '9900')) && (
              <FormItemSelectPlus
                form={form}
                required={isBank}
                disabled={taskNotEditable || isPrem}
                formName="branchName"
                searchName="bankBranch"
                optionShowType="name"
                searchCustom={(postData: any) => handleBankBranch(postData)}
                extraData={bankCode}
                labelId="BranchName"
                labelTypeCode="Label_BIZ_Individual"
                saveName
              />
            )}
            {isPostBank && (
              <FormItemSelect
                dicts={Dropdown_CLM_BankType}
                disabled={taskNotEditable || isPrem}
                form={form}
                formName="bankType"
                labelId="BankType"
                labelTypeCode="Label_BIZ_Individual"
                required={accountRequired}
              />
            )}
            {(isOther || isPostBank || (isPrem && bankCodeCache === '9900')) && (
              <FormItemInput
                form={form}
                disabled={taskNotEditable || isPrem}
                formName="passbookCode"
                labelId="PostbankID"
                required={!isOther && (manualAdd || isPostBank || isBankTypePostalBank)}
                rules={[Validator.VLD_000592(isPrem), Validator.VLD_000593(5, isPrem)]}
              />
            )}
            {(isOther || isPostBank || (isPrem && bankCodeCache === '9900')) && (
              <FormItemInput
                form={form}
                disabled={taskNotEditable || isPrem}
                formName="passbookNo"
                labelId="PostbankNo"
                required={!isOther && (manualAdd || isPostBank || isBankTypePostalBank)}
                rules={[Validator.VLD_000592(isPrem), Validator.VLD_000593(8, isPrem)]}
              />
            )}
            {!isPostBank && (
              <FormItemSelect
                form={form}
                disabled={taskNotEditable || isPrem}
                formName="accountType"
                labelId="AccountType"
                dicts={Dropdown_CLM_AccountType}
                required={manualAdd || isBank || isBankTypeBank}
              />
            )}
            <FormItemSelect
              dicts={Dropdown_COM_YN}
              disabled={taskNotEditable}
              form={form}
              formName="isNewBankAccount"
              labelId="isNewBankAct"
              rules={[
                Validator.VLD_000882(
                  Object.values(incidentListMap).findIndex((i: any) => i.claimType === 'WOP') > -1,
                  claimDecision.payoutAmount === 0
                ),
              ]}
            />
            <FormItemInput
              form={form}
              disabled={taskNotEditable}
              formName="accountHolderClientId"
              labelId="accountHolderID"
            />
            <FormItemSelect
              dicts={Dropdown_POL_BankDesc}
              disabled={taskNotEditable}
              form={form}
              formName="bankDesc"
              labelId="bankDesc"
            />
          </DataLayout>
        </DataLayout.DataWrap>
      </DataLayout>
    </Panel.BackColor>
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

export default connect(
  ({ claimEditable, formCommonController, dictionaryController, JPCLMOfClaimAssessment }: any) => ({
    incidentListMap: JPCLMOfClaimAssessment.claimEntities.incidentListMap,
    claimDecision: lodash.get(JPCLMOfClaimAssessment, 'claimProcessData.claimDecision'),
    taskNotEditable: claimEditable.taskNotEditable,
    validating: formCommonController.validating,
    Dropdown_CLM_AccountType: dictionaryController.Dropdown_CLM_AccountType,
    Dropdown_CLM_BankType: dictionaryController.Dropdown_CLM_BankType,
    Dropdown_COM_YN: dictionaryController.Dropdown_COM_YN,
    Dropdown_POL_BankDesc: dictionaryController.Dropdown_POL_BankDesc,
  })
)(withContextData(FormWrap));
