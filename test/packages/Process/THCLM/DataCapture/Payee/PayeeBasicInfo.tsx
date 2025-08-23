import React, { PureComponent } from 'react';
import { NAMESPACE } from '../activity.config';

import { connect } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import { Validator, formUtils } from 'basic/components/Form';

import FormLayout from 'basic/components/Form/FormLayout';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemCheckbox from 'basic/components/Form/FormItem/FormItemCheckbox';
import { FormItemSelectPlus } from 'basic/components/Form/FormItem';
import { SeachCustom } from 'claim/pages/utils/claimUtils';
import { getPayeeDefaultData, getDefaultPayeeId } from 'claim/pages/utils/getPayeeDefaultData';
import { PaymentMethod, ContactType } from 'claim/pages/Enum';
import { relationshipWithInsuredForHK } from 'claim/enum';
import { payeeLayout } from '../FormLayout.json';

const FORMID = 'payee';

const seachCustom: any = new SeachCustom();
const { handleBank, handleBankBranch } = seachCustom;

@connect(
  ({
    dictionaryController,
    [NAMESPACE]: modelnamepsace,
    formCommonController,
    claimEditable,
  }: any) => {
    const payeeListMap = lodash.get(modelnamepsace, 'claimEntities.payeeListMap');
    const payeeId = getDefaultPayeeId(payeeListMap);

    return {
      dictsOfIdentityType: dictionaryController.IdentityType,
      dictsOrgIdentityType: dictionaryController.OrganizationIdentityType,
      dictsOfPaymentMethod: dictionaryController.Dropdown_CLM_PaymentMethod_General,
      dictsOfRelationship: dictionaryController.Dropdown_POL_RelationshipWithInsured,
      bankDropdown: lodash.get(dictionaryController, 'bankDropdown.list'),
      payee: lodash.get(modelnamepsace, `claimEntities.payeeListMap[${payeeId}]`),
      validating: formCommonController.validating,
      taskNotEditable: claimEditable.taskNotEditable,
      payeeId,
      Dropdown_POL_ContactNoType: dictionaryController.Dropdown_POL_ContactNoType,
    };
  }
)
// @ts-ignore
@Form.create<any>({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating } = props;
    const finalChangedFields = changedFields;
    if (lodash.has(changedFields, 'organization')) {
      finalChangedFields.organization = changedFields.organization.value ? 1 : 0;
    }

    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: `${NAMESPACE}/saveEntry`,
            target: 'savePayee',
            payload: {
              changedFields,
              seachCustom,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: `${NAMESPACE}/saveFormData`,
          target: 'savePayee',
          payload: {
            changedFields,
            seachCustom,
          },
        });
      }
    }
  },
  mapPropsToFields(props: any) {
    const { payee } = props;
    const mapDefaultPayee = getPayeeDefaultData(payee);

    return formUtils.mapObjectToFields(mapDefaultPayee, {
      payeeType: (value: string | object) => value,
      firstName: (value: string | object) => value,
      surname: (value: string | object) => value,
      organization: (value: number) => value === 1,
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
    });
  },
})
class PayeeInfo extends PureComponent<any> {
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

  render() {
    const {
      form,
      dictsOfPaymentMethod,
      dictsOfIdentityType,
      dictsOrgIdentityType,
      dictsOfRelationship,
      taskNotEditable,
      Dropdown_POL_ContactNoType,
    } = this.props;
    const bankCode = form.getFieldValue('bankCode');
    const ispayeeSelf =
      form.getFieldValue('payeeType') === relationshipWithInsuredForHK.self ||
      form.getFieldValue('payeeType') === relationshipWithInsuredForHK.policyOwner;
    const isPaymentMethodBank = form.getFieldValue('paymentMethod') === PaymentMethod.BankTransfer;
    const isPaymentMethodSevenEleven =
      form.getFieldValue('paymentMethod') === PaymentMethod.ElevenCash;
    const isPaymentMethodFasterPayment =
      form.getFieldValue('paymentMethod') === PaymentMethod.FasterPayment;
    const isPaymentMethodDirectCredit =
      form.getFieldValue('paymentMethod') === PaymentMethod.DirectCredit;
    const isOrganization = form.getFieldValue('organization');
    const isContactTypeFPSID = form.getFieldValue('contactType') === ContactType.FPSID;
    const isContactTypeMobilePhone = form.getFieldValue('contactType') === ContactType.MobilePhone;
    const isContactTypeEmail = form.getFieldValue('contactType') === ContactType.Email;

    const VLD_000345 =
      isPaymentMethodFasterPayment && (isContactTypeFPSID || isContactTypeMobilePhone);
    const VLD_000346 = isPaymentMethodFasterPayment && isContactTypeEmail;

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
            disabled={taskNotEditable || ispayeeSelf}
            formName="firstName"
            maxLength={30}
            labelId="app.navigator.task-detail-of-data-capture.label.first-name"
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable || ispayeeSelf}
            required
            formName="surname"
            maxLength={30}
            labelId="app.navigator.task-detail-of-data-capture.label.surname"
          />
          <FormItemCheckbox
            form={form}
            disabled={taskNotEditable || ispayeeSelf}
            formName="organization"
            labelId="app.navigator.task-detail-of-data-capture.label.is-corporation"
          />
          <FormItemSelect
            form={form}
            disabled={taskNotEditable || ispayeeSelf}
            required
            formName="identityType"
            labelId="app.usermanagement.basicInfo.label.id-entity-type"
            dicts={isOrganization ? dictsOrgIdentityType : dictsOfIdentityType}
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable || ispayeeSelf}
            required
            formName="identityNo"
            maxLength={20}
            labelId="app.navigator.task-detail-of-data-capture.label.identity-no"
          />
          <FormItemSelect
            form={form}
            required={isPaymentMethodFasterPayment}
            disabled={taskNotEditable}
            formName="contactType"
            labelId="ContactType"
            labelTypeCode="Label_BIZ_Policy"
            dicts={Dropdown_POL_ContactNoType}
          />
          <FormItemInput
            form={form}
            required={isPaymentMethodSevenEleven || VLD_000345}
            disabled={taskNotEditable}
            formName="phoneNo"
            maxLength={20}
            labelId="PhoneNoAndFPSID"
            labelTypeCode="Label_BIZ_Individual"
          />
          <FormItemInput
            form={form}
            required={VLD_000346}
            disabled={taskNotEditable}
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
          <FormItemSelect
            form={form}
            disabled={taskNotEditable}
            required
            formName="paymentMethod"
            labelId="app.navigator.task-detail-of-data-capture.label.payment-method"
            dicts={dictsOfPaymentMethod}
            existCodes={['05', '06']}
            rules={[Validator.VLD_000612(form)]}
          />

          <FormItemSelectPlus
            form={form}
            disabled={taskNotEditable || (!isPaymentMethodBank && !isPaymentMethodDirectCredit)}
            required={isPaymentMethodBank || isPaymentMethodDirectCredit}
            formName="bankCode"
            labelId="app.navigator.task-detail-of-data-capture.label.bank-code"
            optionShowType="both"
            searchCustom={handleBank}
          />

          <FormItemSelectPlus
            form={form}
            required={isPaymentMethodBank || isPaymentMethodDirectCredit}
            disabled={taskNotEditable || (!isPaymentMethodBank && !isPaymentMethodDirectCredit)}
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
            disabled={taskNotEditable || (!isPaymentMethodBank && !isPaymentMethodDirectCredit)}
            required={isPaymentMethodBank || isPaymentMethodDirectCredit}
            formName="accountHolder"
            maxLength={60}
            labelId="Accountholder"
            labelTypeCode="Label_BIZ_Individual"
          />
          <FormItemInput
            form={form}
            disabled={taskNotEditable || (!isPaymentMethodBank && !isPaymentMethodDirectCredit)}
            required={isPaymentMethodBank || isPaymentMethodDirectCredit}
            formName="bankAccountNo"
            maxLength={15}
            rules={[
              {
                validator: Validator.VLD_000002(10, 15),
              },
            ]}
            labelId="app.navigator.task-detail-of-data-capture.label.bank-account-no"
          />
        </FormLayout>
      </Form>
    );
  }
}

export default PayeeInfo;
