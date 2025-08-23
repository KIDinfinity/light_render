import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { Form } from 'antd';
import type { FormComponentProps } from 'antd/es/form';
import lodash from 'lodash';
import CardOfClaim from 'basic/components/Form/FormCard';

import FormLayout from 'basic/components/Form/FormLayout';
import {
  FormItemInput,
  FormItemSelectPlus,
  FormItemSelect,
  FormItemCheckbox,
  formUtils,
} from 'basic/components/Form';
import type { IDictionary } from '@/dtos/dicts';
import { SeachCustom } from 'claim/pages/utils/claimUtils';
import { payeeLayout } from '../FormLayout.json';
import styles from './PayeeInfo.less';

const FORMID = 'payee';

interface IProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  loadingOfFindDictionary: boolean;
  dictsOfPaymentMethod: IDictionary[];
  payeeId: string;
  validating: boolean;
  payee: any;
}

const seachCustom: any = new SeachCustom();
const { handleBank } = seachCustom;

// @ts-ignore
@connect(
  (
    { dictionaryController, claimEditable, JPCLMProcessCreate, formCommonController }: any,
    { payeeId }: any
  ) => ({
    dictsOfIdentityType: dictionaryController.IdentityType,
    dictsOrgIdentityType: dictionaryController.OrganizationIdentityType,
    dictsOfPayeeType: dictionaryController.PayeeType,
    dictsOfPaymentMethod: dictionaryController.PaymentMethod,
    dictsOfRelationship: dictionaryController.Dropdown_POL_RelationshipWithInsured,
    bankDropdown: lodash.get(dictionaryController, 'bankDropdown.list'),
    payee: lodash.get(JPCLMProcessCreate, `claimEntities.payeeListMap.${payeeId}`),
    validating: formCommonController.validating,
    taskNotEditable: claimEditable.taskNotEditable,
  })
)
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, payeeId, validating } = props;
    if (!formUtils.shouldUpdateState(changedFields)) return;

    dispatch({
      type: 'JPCLMProcessCreate/savePayee',
      payload: {
        changedFields,
        payeeId,
      },
    });
  },
  mapPropsToFields(props: any) {
    const { payee } = props;

    return formUtils.mapObjectToFields(payee, {
      payeeType: (value: string | object) => value,
      relationshipWithInsured: (value: string | object) => value,
      firstName: (value: string | object) => value,
      surname: (value: string | object) => value,
      organization: (value: number) => value,
      identityType: (value: string | object) => value,
      identityNo: (value: string | object) => value,
      phoneNo: (value: string | object) => value,
      paymentMethod: (value: string | object) => value,
      bankCode: (value: string | object) => value,
      bankAccountName: (value: string | object) => value,
      bankAccountNo: (value: string | object) => value,
    });
  },
})
class PayeeInfo extends Component<IProps> {
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
    const { dispatch, payeeId }: any = this.props;

    dispatch({
      type: 'JPCLMProcessCreate/removePayeeInfoItem',
      payload: {
        payeeId,
      },
    });
  };

  render() {
    const {
      form,
      dictsOfPayeeType,
      dictsOfRelationship,
      dictsOrgIdentityType,
      dictsOfIdentityType,
      dictsOfPaymentMethod,
    } = this.props;

    const ispayeeSelf = form.getFieldValue('payeeType') === 'I';
    const isPaymentMethodBank = form.getFieldValue('paymentMethod') === '01';

    const isOrganization = form.getFieldValue('organization');
    const dictsOfPayeeTypes = lodash.filter(
      dictsOfPayeeType,
      (value: IDictionary) => value.dictCode !== 'B'
    );
    return (
      <div className={styles.payee}>
        <CardOfClaim
          cardStyle={{ backgroundColor: 'var(--card-1-bg-color)' }}
          className={'card1BgColor'}
          showButton
          handleClick={this.handleDelete}
        >
          <Form layout="vertical">
            <FormLayout json={payeeLayout}>
              <FormItemSelect
                form={form}
                required
                formName="payeeType"
                labelId="app.navigator.task-detail-of-data-capture.label.payee-type"
                dicts={dictsOfRelationship}
              />
              <FormItemInput
                form={form}
                disabled={ispayeeSelf}
                required
                formName="firstName"
                maxLength={30}
                labelId="app.navigator.task-detail-of-data-capture.label.first-name"
              />
              <FormItemInput
                form={form}
                disabled={ispayeeSelf}
                required
                formName="surname"
                maxLength={30}
                labelId="app.navigator.task-detail-of-data-capture.label.surname"
              />
              <FormItemCheckbox
                form={form}
                disabled={ispayeeSelf}
                formName="organization"
                labelId="app.navigator.task-detail-of-data-capture.label.is-corporation"
              />
              <FormItemSelect
                form={form}
                disabled={ispayeeSelf}
                required
                formName="identityType"
                labelId="app.usermanagement.basicInfo.label.id-entity-type"
                dicts={isOrganization ? dictsOrgIdentityType : dictsOfIdentityType}
              />
              <FormItemInput
                form={form}
                disabled={ispayeeSelf}
                required
                formName="identityNo"
                maxLength={20}
                labelId="app.navigator.task-detail-of-data-capture.label.identity-no"
              />
              <FormItemInput
                form={form}
                disabled={ispayeeSelf}
                formName="phoneNo"
                maxLength={20}
                labelId="app.usermanagement.basicInfo.label.phone-no"
              />
              <FormItemSelect
                form={form}
                required
                formName="paymentMethod"
                labelId="app.navigator.task-detail-of-data-capture.label.payment-method"
                dicts={dictsOfPaymentMethod}
              />

              <FormItemSelectPlus
                form={form}
                disabled={!isPaymentMethodBank}
                required={isPaymentMethodBank}
                formName="bankCode"
                labelId="app.navigator.task-detail-of-data-capture.label.bank-code"
                optionShowType="both"
                searchCustom={handleBank}
              />

              <FormItemInput
                form={form}
                disabled={!isPaymentMethodBank}
                required={isPaymentMethodBank}
                formName="bankAccountName"
                maxLength={60}
                labelId="app.navigator.task-detail-of-data-capture.label.bank-account-name"
              />
              <FormItemInput
                form={form}
                disabled={!isPaymentMethodBank}
                required={isPaymentMethodBank}
                formName="bankAccountNo"
                maxLength={40}
                labelId="app.navigator.task-detail-of-data-capture.label.bank-account-no"
              />
            </FormLayout>
          </Form>
        </CardOfClaim>
      </div>
    );
  }
}

export default PayeeInfo;
