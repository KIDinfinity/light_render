import type { FunctionComponent } from 'react';
import React from 'react';
import { Form } from 'antd';
import { connect, useDispatch, useSelector } from 'dva';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import DataLayout from '@/components/DataLayout';
import {
  FormItemInput,
  FormItemSelect,
  FormItemCheckbox,
  FormItemDatePicker,
} from 'basic/components/Form/FormItem';
import type { IFormRegistProps } from '@/components/FormRegistComponent';
import FormRegist from '@/components/FormRegistComponent';
import FormItemCurrency from 'basic/components/Form/FormItem/FormItemCurrency';
import { Validator, formUtils } from 'basic/components/Form';

import type { PayeeModal } from '../../../_dto/Models';
import { shallowEqual, getPayeeSourceSystem } from '../../../_function';
import { VLD_000332, VLD_000426 } from '../../../_validators/fieldValidators';
import { EPaymentMethod, EPayByPolicyCurrency, EPolicySource } from '../../../_dto/Enums';

import styles from './styles.less';

export interface IInformation extends IFormRegistProps {
  payeeItem?: PayeeModal;
  taskNotEditable?: boolean;
  formId?: string;
  Dropdown_CLM_PaymentMethod?: any[];
  Dropdown_CLM_PaymentMethod_General?: any[];
  Dropdown_CLM_PaymentMethod_Reimbursement?: any[];
  Gender?: any[];
  IdentityType?: any[];
  Dropdown_CLM_PaymentType?: any[];
  validating?: boolean;
  claimData?: any;
  taskDetail?: any;
  taskNotEditablePermission?: any;
  currencies?: any;
  relatePolicyOwnerPayeeIds?: string[];
}

const Information: FunctionComponent<IInformation> = ({
  form,
  payeeItem,
  taskNotEditable,
  Gender,
  IdentityType,
  Dropdown_CLM_PaymentMethod,
  Dropdown_CLM_PaymentMethod_General,
  Dropdown_CLM_PaymentMethod_Reimbursement,
  claimData,
  currencies,
  relatePolicyOwnerPayeeIds,
}) => {
  const paymentMethodDictsConfig = {
    IDAC: Dropdown_CLM_PaymentMethod_Reimbursement,
    TH_GC_CTG01: Dropdown_CLM_PaymentMethod_Reimbursement,
    TH_GC_CTG04: Dropdown_CLM_PaymentMethod_Reimbursement,
    TH_GC_CTG02: Dropdown_CLM_PaymentMethod_Reimbursement,
    TH_GC_CTG06: Dropdown_CLM_PaymentMethod_Reimbursement,
    TH_GC_CTG07: Dropdown_CLM_PaymentMethod_Reimbursement,
    TH_CLM_CTG001: Dropdown_CLM_PaymentMethod_General,
    TH_CLM_CTG002: Dropdown_CLM_PaymentMethod_General,
    TH_CLM_CTG003: Dropdown_CLM_PaymentMethod_General,
  };

  const dispatch = useDispatch();
  const isCorporation = !form.getFieldValue('organization');
  const paymentMethodVal = formUtils.queryValue(payeeItem?.paymentMethod);
  const isElevenCash = EPaymentMethod.ElevenCash === paymentMethodVal;
  const DropdownPaymentMethod = lodash.includes(
    Object.keys(paymentMethodDictsConfig),
    claimData?.caseCategory
  )
    ? paymentMethodDictsConfig?.[claimData?.caseCategory]
    : Dropdown_CLM_PaymentMethod;
  const policyBenefitList = useSelector(
    ({ paymentAllocation }: any) => paymentAllocation.claimData.policyBenefitList
  );

  const newDropdown_CLM_PaymentMethod =
    getPayeeSourceSystem(policyBenefitList, payeeItem) === EPolicySource.IL
      ? DropdownPaymentMethod
      : lodash.filter(DropdownPaymentMethod, (item: any) => {
          return item.dictCode !== EPaymentMethod.Draft;
        });

  const changeInvoiceCurrency = (selectCurrency: any) => {
    dispatch({
      type: 'paymentAllocation/savePayeeInfo',
      payload: {
        changedFields: {
          payoutCurrency: selectCurrency?.currencyCode,
        },
        id: payeeItem?.id,
      },
    });
  };
  const precision = tenant.region({
    [Region.JP]: 0,
    notMatch: undefined,
  });

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
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            formName="identityType"
            labelId="IdentityType"
            labelTypeCode="Label_BIZ_Individual"
            dicts={IdentityType}
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable}
            formName="identityNo"
            maxLength={20}
            labelId="IdentityNumber"
            labelTypeCode="Label_BIZ_Individual"
          />
        </DataLayout>
        <DataLayout span={18} colProps={{ span: 8 }}>
          <FormItemCheckbox
            form={form}
            disabled={taskNotEditable}
            formName="organization"
            labelId="IsCorporation"
            labelTypeCode="Label_BIZ_Policy"
          />
          {isCorporation && (
            <FormItemSelect
              form={form}
              disabled={taskNotEditable}
              formName="gender"
              labelId="Gender"
              labelTypeCode="Label_BIZ_Individual"
              dicts={Gender}
            />
          )}
          {isCorporation && (
            <FormItemDatePicker
              form={form}
              disabled={taskNotEditable}
              formName="dateOfBirth"
              labelId="DOB"
              labelTypeCode="Label_BIZ_Individual"
            />
          )}
        </DataLayout>
        <DataLayout span={18} colProps={{ span: 8 }}>
          <FormItemCheckbox
            form={form}
            disabled={taskNotEditable}
            formName="payByPolicyCurrency"
            labelId="ByPOLCurrency"
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            formName="paymentMethod"
            labelId="PaymentMethod"
            dicts={newDropdown_CLM_PaymentMethod}
            existCodes={['05', '06']}
            rules={[
              { validator: VLD_000426(claimData.payeeList, relatePolicyOwnerPayeeIds) },
              Validator.VLD_000612(form),
            ]}
            required
          />
          <FormItemCurrency
            form={form}
            required
            disabled={taskNotEditable}
            formName="payoutAmount"
            labelId="PayoutAmount"
            labelTypeCode="Label_BIZ_Claim"
            suffixEditable={!taskNotEditable}
            hiddenPrefix
            hiddenDropDown={isElevenCash}
            onSuffixChange={changeInvoiceCurrency}
            currencyCode={formUtils.queryValue(payeeItem?.payoutCurrency)}
            currencies={currencies}
            span={8}
            precision={precision}
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
    Dropdown_CLM_PaymentMethod_General: dictionaryController.Dropdown_CLM_PaymentMethod_General,
    Dropdown_CLM_PaymentMethod_Reimbursement:
      dictionaryController.Dropdown_CLM_PaymentMethod_Reimbursement,
    Gender: dictionaryController.Gender,
    IdentityType: dictionaryController.IdentityType,
    Dropdown_CLM_PaymentType: dictionaryController.Dropdown_CLM_PaymentType,
    claimData: paymentAllocation.claimData,
    currencies: paymentAllocation.currencies,
    relatePolicyOwnerPayeeIds: paymentAllocation.relatePolicyOwnerPayeeIds,
  })
)(FormWrap);
