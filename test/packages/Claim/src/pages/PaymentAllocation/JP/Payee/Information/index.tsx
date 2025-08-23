import type { FunctionComponent} from 'react';
import React from 'react';
import { Form } from 'antd';
import { connect } from 'dva';
import lodash from 'lodash';
import DataLayout from '@/components/DataLayout';
import {
  FormItemInput,
  FormItemSelect,
  FormItemCheckbox,
  FormItemDatePicker,
} from 'basic/components/Form/FormItem';
import FormItemCurrency from 'basic/components/Form/FormItem/FormItemCurrency';
import type { IFormRegistProps } from '@/components/FormRegistComponent';
import FormRegist from '@/components/FormRegistComponent';

import type { PayeeModal } from '../../../_dto/Models';
import { shallowEqual } from '../../../_function';
import { VLD_000332, VLD_000426 } from '../../../_validators/fieldValidators';
import { Validator, formUtils } from 'basic/components/Form';
import { EPayByPolicyCurrency, EPaymentMethod } from '../../../_dto/Enums';

import styles from './styles.less';

export interface IInformation extends IFormRegistProps {
  payeeItem?: PayeeModal;
  taskNotEditable?: boolean;
  formId?: string;
  Dropdown_CLM_PaymentMethod?: any[];
  Gender?: any[];
  Dropdown_POL_IdentityType?: any[];
  Dropdown_CLM_PaymentMode?: any[];
  validating?: boolean;
  claimData?: any;
  taskDetail?: any;
  taskNotEditablePermission?: any;
  currencies?: any;
  relatePolicyOwnerPayeeIds?: string[];
  Dropdown_CLM_TransferAccount?: string[];
}

const Information: FunctionComponent<IInformation> = ({
  form,
  payeeItem,
  taskNotEditable,
  Dropdown_CLM_PaymentMethod,
  claimData,
  relatePolicyOwnerPayeeIds,
  currencies,
  Dropdown_CLM_TransferAccount,
  Dropdown_CLM_PaymentMode,
}) => {
  const isPrem = form.getFieldValue('paymentMethod') === EPaymentMethod.PremiumAccount;

  const premiumPaymentMethod = lodash.get(payeeItem, 'payeeContactList[0].premiumPaymentMethod');

  return (
    <>
      <DataLayout className={styles.PayeeInformation} span={12}>
        <DataLayout span={12}>
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            required
            formName="firstName"
            maxLength={30}
            labelId="app.navigator.task-detail-of-data-capture.label.first-name"
            rules={[{ validator: VLD_000332(claimData.payeeList, payeeItem) }]}
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            required
            formName="surname"
            maxLength={30}
            labelId="app.navigator.task-detail-of-data-capture.label.surname"
            rules={[{ validator: VLD_000332(claimData.payeeList, payeeItem) }]}
          />
        </DataLayout>
        <DataLayout span={12}>
          <FormItemCheckbox
            form={form}
            disabled={taskNotEditable}
            formName="organization"
            labelId="IsCorporation"
            labelTypeCode="Label_BIZ_Policy"
            span={1}
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            formName="bizClientId"
            maxLength={30}
            span={8}
            labelId="lifeJClientId"
          />
          <FormItemCurrency
            form={form}
            disabled
            formName="payoutAmount"
            labelId="PayoutAmount"
            labelTypeCode="Label_BIZ_Claim"
            suffixEditable
            hiddenPrefix
            hiddenDropDown
            currencyCode={payeeItem?.payoutCurrency}
            currencies={currencies}
            precision={0}
            // span={4}
          />
        </DataLayout>
        <DataLayout span={24} colProps={{ span: 6 }} rowProps={{ justify: 'start' }}>
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            formName="paymentMethod"
            labelId="PaymentMethod"
            dicts={Dropdown_CLM_PaymentMethod}
            rules={[
              { validator: VLD_000426(claimData.payeeList, relatePolicyOwnerPayeeIds) },
              {
                validator: Validator.VLD_000604(premiumPaymentMethod),
              },
            ]}
            required
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            formName="paymentType"
            labelId="PaymentType"
            dicts={Dropdown_CLM_PaymentMode}
            required
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable || isPrem}
            formName="transferAccount"
            labelId="TransferAccount"
            dicts={Dropdown_CLM_TransferAccount}
            required
          />
          <FormItemDatePicker
            form={form}
            disabled={taskNotEditable}
            formName="scheduledDate"
            labelId="Scheduleddate"
            disabledDate={(date: any) => {
              const startDate = new Date('1900-01-01T00:00:00').getTime();
              return date.valueOf() < startDate;
            }}
          />
        </DataLayout>
      </DataLayout>
    </>
  );
};

const FormWrap = Form.create<IInformation>({
  mapPropsToFields(props) {
    const { payeeItem } = props;
    return formUtils.mapObjectToFields(payeeItem, {
      organization: (value: string | object) => !!value,
      paidOut: (value: string | object) => !!value,
      payByPolicyCurrency: (value: string | object) => value === EPayByPolicyCurrency.Yes,
    });
  },
  onFieldsChange(props, changedFields) {
    const { dispatch, payeeItem, validating } = props;
    const changedFieldsTemp = { ...changedFields };
    if (lodash.isFunction(dispatch) && formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'paymentAllocation/saveEntry',
            target: 'savePayeeInfo',
            payload: {
              changedFields: {
                ...changedFieldsTemp,
              },
              id: payeeItem?.id,
            },
          });
        });
      } else {
        dispatch({
          type: 'paymentAllocation/saveFormData',
          target: 'savePayeeInfo',
          payload: {
            changedFields: {
              ...changedFieldsTemp,
            },
            id: payeeItem?.id,
          },
        });
      }
    }
  },
})(FormRegist({ nameSpace: 'paymentAllocation' })(React.memo(Information, shallowEqual)));

export default connect(
  ({ claimEditable, formCommonController, dictionaryController, paymentAllocation }: any) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    validating: formCommonController.validating,
    Dropdown_CLM_PaymentMethod: dictionaryController.Dropdown_CLM_PaymentMethod,
    Gender: dictionaryController.Gender,
    Dropdown_POL_IdentityType: dictionaryController.Dropdown_POL_IdentityType,
    Dropdown_CLM_PaymentType: dictionaryController.Dropdown_CLM_PaymentType,
    claimData: paymentAllocation.claimData,
    currencies: paymentAllocation.currencies,
    relatePolicyOwnerPayeeIds: paymentAllocation.relatePolicyOwnerPayeeIds,
    Dropdown_CLM_TransferAccount: dictionaryController.Dropdown_CLM_TransferAccount,
    Dropdown_CLM_PaymentMode: dictionaryController.Dropdown_CLM_PaymentMode,
  })
)(FormWrap);
