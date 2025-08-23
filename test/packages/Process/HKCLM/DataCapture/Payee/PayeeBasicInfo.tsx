import React, { PureComponent } from 'react';
import lodash from 'lodash';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { Form } from 'antd';
import { Validator, formUtils } from 'basic/components/Form';
import type { FormComponentProps } from 'antd/es/form';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemCheckbox from 'basic/components/Form/FormItem/FormItemCheckbox';
import { FormItemSelectPlus } from 'basic/components/Form/FormItem';
import { SeachCustom } from 'claim/pages/utils/claimUtils';
import type { IDictionary } from '@/dtos/dicts';
import { getPayeeDefaultData, getDefaultPayeeId } from 'claim/pages/utils/getPayeeDefaultData';
import { PaymentMethod, ContactType } from 'claim/pages/Enum';
import { SubmissionChannel, relationshipWithInsuredForHK } from 'claim/enum';
import usePayeeInfoHook from './usePayeeInfoHook';
import { NAMESPACE } from '../activity.config';
import { payeeLayout } from '../FormLayout.json';

const FORMID = 'payee';
interface IProps extends FormComponentProps {
  registeForm: Function;
  unRegisterForm: Function;
  dispatch: Dispatch<any>;
  dictsOfPaymentMethod: IDictionary[];
  dictsOfIdentityType: IDictionary[];
  bankDropdown: IDictionary[];
  dictsOfRelationship: IDictionary[];
  Dropdown_POL_ContactNoType?: any[];
  countryCode: string;
  dictsOfSubPaymentMethod: IDictionary[];
  taskNotEditable: any;
  payee: any;
  dictsOrgIdentityType: any;
  submissionChannel: string;
  payeeId: any;
  insured: any;
}

const seachCustom: any = new SeachCustom();
const { handleBank, handleBankBranch } = seachCustom;

class PayeeInfo extends PureComponent<IProps> {
  registeForm = () => {
    const { dispatch, form } = this.props;

    dispatch({
      type: 'formCommonController/registerForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  componentDidMount = () => {
    this.registeForm();
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidUpdate(prevProps: Readonly<IProps>): void {
    const { dispatch, payee, countryCode, submissionChannel } = this.props;
    if (
      (formUtils.queryValue(prevProps.countryCode) !== formUtils.queryValue(countryCode) ||
        formUtils.queryValue(prevProps.submissionChannel) !==
          formUtils.queryValue(submissionChannel)) &&
      payee &&
      countryCode &&
      submissionChannel &&
      (lodash.isEmpty(formUtils.queryValue(payee.payeeType)) ||
        lodash.isEmpty(formUtils.queryValue(payee.organization)))
    ) {
      dispatch({
        type: `${NAMESPACE}/savePayee`,
        payload: {
          changedFields: {
            organization:
              submissionChannel === SubmissionChannel.GOPBilling &&
              lodash.isEmpty(formUtils.queryValue(payee.organization))
                ? 1
                : payee.organization,
            payeeType:
              submissionChannel === SubmissionChannel.GOPBilling &&
              lodash.isEmpty(formUtils.queryValue(payee.payeeType))
                ? relationshipWithInsuredForHK.medicalProvider
                : payee.payeeType,
          },
          countryCode,
        },
      });
    }
  }

  unRegisterForm = () => {
    const { dispatch, form } = this.props;

    dispatch({
      type: 'formCommonController/unRegisterForm',
      payload: {
        form,
        formId: FORMID,
      },
    });
  };

  componentWillUnmount = () => {
    this.unRegisterForm();
  };

  handleDelete = () => {
    const { dispatch, payeeId } = this.props;

    dispatch({
      type: `${NAMESPACE}/removePayeeItem`,
      payload: {
        payeeId,
      },
    });
  };

  getFieldRequired = (field: string) => {
    const { submissionChannel, payee } = this.props;
    const organization = formUtils.queryValue(payee!.organization);
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
      default:
        return false;
    }
  };

  getFieldDisabled = (field: string) => {
    if (this.props.taskNotEditable) {
      return true;
    }
    const { payee, submissionChannel, taskNotEditable } = this.props;
    const ispayeeSelf =
      formUtils.queryValue(payee.payeeType) === relationshipWithInsuredForHK.self ||
      formUtils.queryValue(payee.payeeType) === relationshipWithInsuredForHK.policyOwner;

    const isGOPBillingCase =
      formUtils.queryValue(submissionChannel) === SubmissionChannel.GOPBilling;

    const organization = formUtils.queryValue(payee!.organization);

    switch (field) {
      case 'firstName':
        return isGOPBillingCase ? false : ispayeeSelf;
      case 'surname':
        return isGOPBillingCase ? !!organization : ispayeeSelf;
      case 'organization':
        return isGOPBillingCase ? false : ispayeeSelf;
      case 'identityType':
        return isGOPBillingCase ? !!organization : ispayeeSelf;
      case 'identityNo':
        return isGOPBillingCase ? !!organization : ispayeeSelf;
      default:
        return taskNotEditable;
    }
  };

  render() {
    const {
      form,
      dictsOfPaymentMethod,
      dictsOfIdentityType,
      dictsOrgIdentityType,
      dictsOfRelationship,
      taskNotEditable,
      payee,
      Dropdown_POL_ContactNoType,
      insured,
      dictsOfSubPaymentMethod,
      dispatch,
      countryCode,
    } = this.props;
    const bankCode = form.getFieldValue('bankCode');
    const paymentMethodVal = form.getFieldValue('paymentMethod');
    const contactTypeVal = form.getFieldValue('contactType');

    const isPaymentMethodBank = paymentMethodVal === PaymentMethod.BankTransfer;
    const isPaymentMethodSevenEleven = paymentMethodVal === PaymentMethod.ElevenCash;
    const isPaymentMethodFasterPayment = paymentMethodVal === PaymentMethod.FasterPayment;
    const isPaymentMethodDirectCredit = paymentMethodVal === PaymentMethod.DirectCredit;
    const isPaymentMethodSuppressCheque = paymentMethodVal === PaymentMethod.SuppressCheque;
    const isOrganization = form.getFieldValue('organization');
    const isContactTypeFPSID = contactTypeVal === ContactType.FPSID;
    const isContactTypeMobilePhone = contactTypeVal === ContactType.MobilePhone;
    const isContactTypeEmail = contactTypeVal === ContactType.Email;

    const VLD_000345 =
      isPaymentMethodFasterPayment && (isContactTypeFPSID || isContactTypeMobilePhone);
    const VLD_000346 = isPaymentMethodFasterPayment && isContactTypeEmail;

    const { firstName: payeeFirstName, surname: payeeLastName } = payee || {};
    const { firstName: insuredFirstName, surname: insuredLastName } = insured || {};

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { disabledConfig } = usePayeeInfoHook({ form });

    const handleDefaultPayment = (e: any) => {
      if (e?.target?.checked === 'Y') {
        dispatch({
          type: `${NAMESPACE}/getDefaultPayment`,
          payload: {
            id: payee?.id,
            countryCode,
          },
        });
      }
    };

    return (
      <Form layout="vertical">
        <FormLayout json={payeeLayout}>
          <FormItemSelect
            form={form}
            disabled
            required
            formName="payeeType"
            labelId="app.navigator.task-detail-of-data-capture.label.payee-type"
            dicts={dictsOfRelationship}
          />
          <FormItemInput
            form={form}
            disabled={this.getFieldDisabled('firstName')}
            required={this.getFieldRequired('firstName')}
            formName="firstName"
            maxLength={30}
            labelId="app.navigator.task-detail-of-data-capture.label.first-name"
          />
          <FormItemInput
            form={form}
            disabled={this.getFieldDisabled('surname')}
            required={this.getFieldRequired('surname')}
            formName="surname"
            maxLength={30}
            labelId="app.navigator.task-detail-of-data-capture.label.surname"
          />
          <FormItemCheckbox
            form={form}
            disabled={this.getFieldDisabled('organization')}
            formName="organization"
            labelId="app.navigator.task-detail-of-data-capture.label.is-corporation"
          />
          <FormItemSelect
            form={form}
            disabled={this.getFieldDisabled('identityType')}
            required={this.getFieldRequired('identityType')}
            formName="identityType"
            labelId="app.usermanagement.basicInfo.label.id-entity-type"
            dicts={isOrganization ? dictsOrgIdentityType : dictsOfIdentityType}
          />
          <FormItemInput
            form={form}
            disabled={this.getFieldDisabled('identityNo')}
            required={this.getFieldRequired('identityNo')}
            formName="identityNo"
            maxLength={20}
            labelId="app.navigator.task-detail-of-data-capture.label.identity-no"
          />
          <FormItemSelect
            form={form}
            required={isPaymentMethodFasterPayment}
            disabled={taskNotEditable || disabledConfig.contactType}
            formName="contactType"
            labelId="ContactType"
            labelTypeCode="Label_BIZ_Policy"
            dicts={Dropdown_POL_ContactNoType}
          />
          <FormItemInput
            form={form}
            required={isPaymentMethodSevenEleven || VLD_000345}
            disabled={taskNotEditable || disabledConfig.phoneNo}
            formName="phoneNo"
            labelId="PhoneNoAndFPSID"
            labelTypeCode="Label_BIZ_Individual"
            rules={[
              {
                validator: Validator.VLD_000664({ paymentMethodVal, contactTypeVal }),
              },
            ]}
          />
          <FormItemInput
            form={form}
            required={VLD_000346}
            disabled={taskNotEditable || disabledConfig.email}
            formName="email"
            maxLength={60}
            rules={[
              {
                type: 'email',
                message: 'The email address you supplied is invalid.',
              },
            ]}
            labelId="app.navigator.task-detail-of-data-capture.label.email"
          />
          <FormItemCheckbox
            form={form}
            disabled={taskNotEditable}
            valueType="letter"
            formName="isDefaultPaymentMethod"
            labelId="isDefaultPaymentMethod"
            onChange={handleDefaultPayment}
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable || disabledConfig.paymentMethod}
            required
            formName="paymentMethod"
            labelId="app.navigator.task-detail-of-data-capture.label.payment-method"
            dicts={dictsOfPaymentMethod}
            rules={[
              {
                validator: Validator.VLD_000676({
                  payeeFirstName,
                  payeeLastName,
                  insuredLastName,
                  insuredFirstName,
                }),
              },
            ]}
          />

          <FormItemSelectPlus
            form={form}
            disabled={
              taskNotEditable ||
              (!isPaymentMethodBank && !isPaymentMethodDirectCredit) ||
              disabledConfig.bankCode
            }
            required={isPaymentMethodBank || isPaymentMethodDirectCredit}
            formName="bankCode"
            labelId="app.navigator.task-detail-of-data-capture.label.bank-code"
            optionShowType="both"
            searchName="bank"
            searchCustom={handleBank}
          />

          <FormItemSelectPlus
            form={form}
            required={isPaymentMethodBank || isPaymentMethodDirectCredit}
            disabled={taskNotEditable || !isPaymentMethodDirectCredit || disabledConfig.branchCode}
            formName="branchCode"
            searchName="bankBranch"
            optionShowType="both"
            searchCustom={(postData: any) => handleBankBranch(postData, bankCode)}
            extraData={bankCode}
            labelId="BranchCode"
            labelTypeCode="Label_BIZ_Individual"
          />
          <FormItemInput
            form={form}
            disabled={
              taskNotEditable ||
              (!isPaymentMethodBank && !isPaymentMethodDirectCredit) ||
              disabledConfig.accountHolder
            }
            required={isPaymentMethodBank || isPaymentMethodDirectCredit}
            formName="accountHolder"
            maxLength={140}
            labelId="Accountholder"
            labelTypeCode="Label_BIZ_Individual"
          />
          <FormItemInput
            form={form}
            disabled={
              taskNotEditable ||
              (!isPaymentMethodBank && !isPaymentMethodDirectCredit) ||
              disabledConfig.bankAccountNo
            }
            required={isPaymentMethodBank || isPaymentMethodDirectCredit}
            formName="bankAccountNo"
            maxLength={9}
            labelId="app.navigator.task-detail-of-data-capture.label.bank-account-no"
            rules={[
              {
                validator: Validator.VLD_000002(6, 9),
              },
            ]}
          />
          {isPaymentMethodSuppressCheque && (
            <FormItemSelect
              form={form}
              disabled={taskNotEditable || disabledConfig.subPaymentMethod}
              required
              formName="subPaymentMethod"
              labelId="Sub Payment Method"
              dicts={dictsOfSubPaymentMethod}
            />
          )}
        </FormLayout>
      </Form>
    );
  }
}

export default connect((state: any) => {
  const { dictionaryController, [NAMESPACE]: modelnamepsace, claimEditable } = state;
  const payeeListMap = lodash.get(modelnamepsace, 'claimEntities.payeeListMap');
  const payeeId = getDefaultPayeeId(payeeListMap);

  const submissionChannel = lodash.get(modelnamepsace, 'claimProcessData.submissionChannel');
  const payee = lodash.get(modelnamepsace, `claimEntities.payeeListMap[${payeeId}]`);

  return {
    dictsOfIdentityType: dictionaryController.IdentityType,
    dictsOrgIdentityType: dictionaryController.OrganizationIdentityType,
    dictsOfPaymentMethod: dictionaryController.Dropdown_CLM_PaymentMethod,
    dictsOfRelationship: dictionaryController.Dropdown_POL_RelationshipWithInsured,
    bankDropdown: lodash.get(dictionaryController, 'bankDropdown.list'),
    taskNotEditable: claimEditable.taskNotEditable,
    payee,
    payeeId: payeeId,
    Dropdown_POL_ContactNoType: dictionaryController.Dropdown_POL_ContactNoType,
    insured: modelnamepsace.claimProcessData?.insured,
    dictsOfSubPaymentMethod: dictionaryController.Dropdown_CLM_subPaymentMethod,
    submissionChannel,
  };
})(
  Form.create<any>({
    onFieldsChange(props, changedFields) {
      const { dispatch, countryCode } = props;
      if (lodash.has(changedFields, 'organization')) {
        changedFields.organization.value = formUtils.queryValue(changedFields.organization) ? 1 : 0;
      }
      if (formUtils.shouldUpdateState(changedFields)) {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'savePayee',
          payload: {
            changedFields,
            countryCode,
            seachCustom,
          },
        });
      }
    },
    mapPropsToFields(props: any) {
      const { payee } = props;
      const payeeData = getPayeeDefaultData(payee);
      return formUtils.mapObjectToFields(payeeData, {
        payeeType: (value: string | object) => value,
        firstName: (value: string | object) => value,
        surname: (value: string | object) => value,
        organization: (value: number | boolean) => value === 1 || value === true,
        identityType: (value: string | object) => value,
        identityNo: (value: string | object) => value,
        phoneNo: (value: string | object) => value,
        paymentMethod: (value: string | object) => value,
        bankCode: (value: string | object) => value,
        accountHolder: (value: string | object) => value,
        bankAccountNo: (value: string | object) => value,
        email: (value: string | object) => value,
        contactType: (value: string | object) => value,
        branchCode: (value: string | object) => value,
        subPaymentMethod: (value: string | object) => value,
      });
    },
  })(PayeeInfo)
);
