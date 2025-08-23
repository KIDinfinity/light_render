import type { FunctionComponent} from 'react';
import React, { useCallback } from 'react';
import { Form } from 'antd';
import { connect, useDispatch } from 'dva';
import lodash from 'lodash';
import { tenant, Region } from '@/components/Tenant';
import DataLayout from '@/components/DataLayout';
import {
  FormItemInput,
  FormItemSelect,
  FormItemCheckbox,
  FormItemDatePicker,
  FormItemCheckboxGroup,
} from 'basic/components/Form/FormItem';
import type { IFormRegistProps } from '@/components/FormRegistComponent';
import FormRegist from '@/components/FormRegistComponent';
import FormItemCurrency from 'basic/components/Form/FormItem/FormItemCurrency';
import { formUtils, Validator } from 'basic/components/Form';

import type { PayeeModal } from '../../../_dto/Models';
import { shallowEqual, getPaymentMethodIn, getPrintDestinationSelected } from '../../../_function';
import { VLD_000332, VLD_000426 } from '../../../_validators/fieldValidators';
import { EPaymentMethod, EPayByPolicyCurrency } from '../../../_dto/Enums';
import useInformationHook from './useInformationHook';
import useGetPrintDestinationSelectedDicts from './useGetPrintDestinationSelectedDicts';

import styles from './styles.less';
import { SubmissionChannel } from 'claim/enum';

export interface IInformation extends IFormRegistProps {
  payeeItem?: PayeeModal;
  taskNotEditable?: boolean;
  formId?: string;
  Dropdown_CLM_PaymentMethod?: any[];
  Gender?: any[];
  Dropdown_POL_IdentityType?: any[];
  Dropdown_CLM_PaymentType?: any[];
  validating?: boolean;
  claimData?: any;
  taskDetail?: any;
  taskNotEditablePermission?: any;
  currencies?: any;
  relatePolicyOwnerPayeeIds?: string[];
  Dropdown_CLM_subPaymentMethod?: any[];
  Dropdown_COM_CountryCode?: any;
  Label_CLM_printingDestination?: any[];
  submissionChannel: any;
}

const Information: FunctionComponent<IInformation> = ({
  form,
  payeeItem,
  taskNotEditable,
  Gender,
  Dropdown_POL_IdentityType,
  Dropdown_CLM_PaymentMethod,
  claimData,
  currencies,
  relatePolicyOwnerPayeeIds,
  Dropdown_CLM_subPaymentMethod,
  Dropdown_COM_CountryCode,
  submissionChannel,
}) => {
  const dispatch = useDispatch();

  const isCorporation = !form.getFieldValue('organization');
  const paymentMethodVal = formUtils.queryValue(payeeItem?.paymentMethod);

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

  const { firstName: payeeFirstName, surname: payeeLastName } = payeeItem || {};
  const { firstName: insuredFirstName, surname: insuredLastName } = claimData?.insured || {};

  const { disabledConfig } = useInformationHook({ form });

  const countryCode =
    lodash
      .chain(Dropdown_COM_CountryCode)
      .find((el: any) => el.dictCode === tenant.region())
      .get('dictName')
      .value() || '';

  const handleDefaultPayment = (e: any) => {
    if (e?.target?.checked === 'Y') {
      dispatch({
        type: 'paymentAllocation/getDefaultPayment',
        payload: {
          id: payeeItem?.id,
          countryCode,
        },
      });
    }
  };
  const printDestinationSelectedDicts = useGetPrintDestinationSelectedDicts({ payeeItem });

  const organization = formUtils.queryValue(payeeItem!.organization);

  const getFieldRequired = useCallback(
    (field: string) => {
      const isGOPBillingCase =
        formUtils.queryValue(submissionChannel) === SubmissionChannel.GOPBilling;

      switch (field) {
        case 'firstName':
          return isGOPBillingCase ? !!organization : true;
        case 'surname':
          return isGOPBillingCase ? !organization : true;
        case 'identityType':
          return isGOPBillingCase ? !organization : false;
        case 'identityNo':
          return isGOPBillingCase ? !organization : false;
        case 'printDestinationSelected':
          return false;
        default:
          return false;
      }
    },
    [organization, submissionChannel]
  );

  const getFieldDisabled = useCallback(
    (field: string) => {
      if (taskNotEditable) {
        return true;
      }

      const isGOPBillingCase =
        formUtils.queryValue(submissionChannel) === SubmissionChannel.GOPBilling;

      switch (field) {
        case 'firstName':
          return isGOPBillingCase ? false : taskNotEditable;
        case 'surname':
          return isGOPBillingCase ? !!organization : taskNotEditable;
        case 'organization':
          return isGOPBillingCase ? false : taskNotEditable;
        case 'identityType':
          return isGOPBillingCase ? !!organization : taskNotEditable;
        case 'identityNo':
          return isGOPBillingCase ? !!organization : taskNotEditable;
        case 'gender':
          return isGOPBillingCase ? !!organization : taskNotEditable;
        case 'dateOfBirth':
          return isGOPBillingCase ? !!organization : taskNotEditable;
        case 'isDefaultPaymentMethod':
          return isGOPBillingCase ? !!organization : taskNotEditable;
        case 'printDestinationSelected':
          return isGOPBillingCase ? true : taskNotEditable;
        default:
          return taskNotEditable;
      }
    },
    [organization, submissionChannel, taskNotEditable]
  );

  return (
    <>
      <DataLayout className={styles.PayeeInformation} span={12}>
        <DataLayout span={12}>
          <FormItemInput
            form={form}
            disabled={getFieldDisabled('firstName')}
            required={getFieldRequired('firstName')}
            formName="firstName"
            maxLength={30}
            labelId="app.navigator.task-detail-of-data-capture.label.first-name"
            rules={[{ validator: VLD_000332(claimData.payeeList, payeeItem) }]}
          />
          <FormItemInput
            form={form}
            disabled={getFieldDisabled('surname')}
            required={getFieldRequired('surname')}
            formName="surname"
            maxLength={30}
            labelId="app.navigator.task-detail-of-data-capture.label.surname"
            rules={[{ validator: VLD_000332(claimData.payeeList, payeeItem) }]}
          />
        </DataLayout>
        <DataLayout span={12}>
          <FormItemSelect
            form={form}
            disabled={getFieldDisabled('identityType')}
            required={getFieldRequired('identityType')}
            formName="identityType"
            labelId="IdentityType"
            labelTypeCode="Label_BIZ_Individual"
            dicts={Dropdown_POL_IdentityType}
          />
          <FormItemInput
            form={form}
            disabled={getFieldDisabled('identityNo')}
            required={getFieldRequired('identityNo')}
            formName="identityNo"
            maxLength={20}
            labelId="IdentityNumber"
            labelTypeCode="Label_BIZ_Individual"
          />
        </DataLayout>
        <DataLayout span={18} colProps={{ span: 8 }}>
          <FormItemCheckbox
            form={form}
            disabled={getFieldDisabled('organization')}
            required={getFieldRequired('organization')}
            formName="organization"
            labelId="IsCorporation"
            labelTypeCode="Label_BIZ_Policy"
          />
          {isCorporation && (
            <FormItemSelect
              form={form}
              disabled={getFieldDisabled('gender')}
              required={getFieldRequired('gender')}
              formName="gender"
              labelId="Gender"
              labelTypeCode="Label_BIZ_Individual"
              dicts={Gender}
            />
          )}
          {isCorporation && (
            <FormItemDatePicker
              form={form}
              disabled={getFieldDisabled('dateOfBirth')}
              required={getFieldRequired('dateOfBirth')}
              formName="dateOfBirth"
              labelId="DOB"
              labelTypeCode="Label_BIZ_Individual"
            />
          )}
        </DataLayout>
        <DataLayout span={24} className={styles.container}>
          <DataLayout span={12} colProps={{ span: 12 }}>
            <FormItemCheckbox
              form={form}
              disabled={
                taskNotEditable ||
                getPaymentMethodIn({
                  paymentMethod: paymentMethodVal,
                })
              }
              formName="payByPolicyCurrency"
              labelId="ByPOLCurrency"
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
              hiddenDropDown={getPaymentMethodIn({
                paymentMethod: paymentMethodVal,
              })}
              onSuffixChange={changeInvoiceCurrency}
              currencyCode={payeeItem?.payoutCurrency}
              currencies={currencies}
              precision={precision}
            />
          </DataLayout>
          <DataLayout span={12} colProps={{ span: 18 }} className={styles.printDestinationSelected}>
            <FormItemCheckboxGroup
              form={form}
              dicts={printDestinationSelectedDicts}
              required={getFieldRequired('printDestinationSelected')}
              disabled={getFieldDisabled('printDestinationSelected')}
              formName="printDestinationSelected"
            />
          </DataLayout>
          <DataLayout span={12} colProps={{ span: 12 }}>
            <FormItemCheckbox
              form={form}
              disabled={getFieldDisabled('isDefaultPaymentMethod')}
              required={getFieldRequired('isDefaultPaymentMethod')}
              valueType="letter"
              formName="isDefaultPaymentMethod"
              labelId="isDefaultPaymentMethod"
              onChange={handleDefaultPayment}
            />
            <FormItemSelect
              form={form}
              disabled={taskNotEditable || disabledConfig.paymentMethod}
              formName="paymentMethod"
              labelId="PaymentMethod"
              dicts={Dropdown_CLM_PaymentMethod}
              rules={[
                { validator: VLD_000426(claimData.payeeList, relatePolicyOwnerPayeeIds) },
                {
                  validator: Validator.VLD_000676({
                    payeeFirstName,
                    payeeLastName,
                    insuredLastName,
                    insuredFirstName,
                  }),
                },
              ]}
              required
            />
          </DataLayout>
        </DataLayout>
        {paymentMethodVal === EPaymentMethod.SuppressCheque && (
          <FormItemSelect
            form={form}
            disabled={taskNotEditable || disabledConfig.subPaymentMethod}
            formName="subPaymentMethod"
            labelId="Sub Payment Method"
            dicts={Dropdown_CLM_subPaymentMethod}
            required
          />
        )}
      </DataLayout>
    </>
  );
};

const FormWrap = Form.create<IInformation>({
  mapPropsToFields(props) {
    const { payeeItem, Label_CLM_printingDestination } = props;
    return formUtils.mapObjectToFields(
      {
        ...payeeItem,
        printDestinationSelected: getPrintDestinationSelected({
          payeeItem,
          Label_CLM_printingDestination,
        }),
      },
      {
        organization: (value: string | object) => !!value,
        paidOut: (value: string | object) => !!value,
        payByPolicyCurrency: (value: string | object) => value === EPayByPolicyCurrency.Yes,
      }
    );
  },
  onFieldsChange(props, changedFields) {
    const { dispatch, payeeItem, validating }: any = props;
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
  ({
    claimEditable,
    formCommonController,
    dictionaryController,
    paymentAllocation,
    processTask,
  }: any) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    validating: formCommonController.validating,
    Dropdown_CLM_PaymentMethod: dictionaryController.Dropdown_CLM_PaymentMethod,
    Gender: dictionaryController.Gender,
    Dropdown_POL_IdentityType: dictionaryController.Dropdown_POL_IdentityType,
    Dropdown_CLM_PaymentType: dictionaryController.Dropdown_CLM_PaymentType,
    claimData: paymentAllocation.claimData,
    currencies: paymentAllocation.currencies,
    relatePolicyOwnerPayeeIds: paymentAllocation.relatePolicyOwnerPayeeIds,
    Dropdown_CLM_subPaymentMethod: dictionaryController.Dropdown_CLM_subPaymentMethod,
    Dropdown_COM_CountryCode: dictionaryController.Dropdown_COM_CountryCode,
    Label_CLM_printingDestination: dictionaryController.Label_CLM_printingDestination,
    submissionChannel: lodash.get(processTask, 'getTask.submissionChannel'),
  })
)(FormWrap);
