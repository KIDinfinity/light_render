import React, { PureComponent } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import { Card, Form } from 'antd';
import type { FormComponentProps } from 'antd/es/form';

import lodash from 'lodash';
import { formUtils } from 'basic/components/Form';
import FormLayout from 'basic/components/Form/FormLayout';
import FormItemInput from 'basic/components/Form/FormItem/FormItemInput';
import FormItemSelect from 'basic/components/Form/FormItem/FormItemSelect';
import FormItemCheckbox from 'basic/components/Form/FormItem/FormItemCheckbox';
import { FormItemSelectPlus } from 'basic/components/Form/FormItem';
import { SeachCustom } from 'claim/pages/utils/claimUtils';
import { getPayeeDefaultData, getDefaultPayeeId } from 'claim/pages/utils/getPayeeDefaultData';
import type { IDictionary, IBankCode } from '@/dtos/dicts';
import { payeeLayout } from '../FormLayout.json';
import styles from './PayeeInfo.less';

const FORMID = 'payee';
interface IProps extends FormComponentProps {
  registeForm: Function;
  unRegisterForm: Function;
  dispatch: Dispatch<any>;
  dictsOfPaymentMethod: IDictionary[];
  dictsOfIdentityType: IDictionary[];
  bankDropdown: IBankCode[];
  dictsOfRelationship: IDictionary[];
  dictsOfPayeeType: IDictionary[];
  currentState: object;
}

const seachCustom: any = new SeachCustom();
const { handleBank } = seachCustom;

@connect(
  ({
    dictionaryController,
    bpOfDataCaptureController,
    formCommonController,
    claimEditable,
  }: any) => {
    const payeeListMap = lodash.get(bpOfDataCaptureController, 'claimEntities.payeeListMap');
    const payeeId = getDefaultPayeeId(payeeListMap);

    return {
      dictsOfIdentityType: dictionaryController.IdentityType,
      dictsOrgIdentityType: dictionaryController.OrganizationIdentityType,
      dictsOfPayeeType: dictionaryController.PayeeType,
      dictsOfPaymentMethod: dictionaryController.PaymentMethod,
      dictsOfRelationship: dictionaryController.Relationship,
      bankDropdown: lodash.get(dictionaryController, 'bankDropdown.list'),
      payee: lodash.get(bpOfDataCaptureController, `claimEntities.payeeListMap[${payeeId}]`),
      currentState: lodash.get(bpOfDataCaptureController, 'claimProcessData.insured.currentState'),
      validating: formCommonController.validating,
      taskNotEditable: claimEditable.taskNotEditable,
    };
  }
)
// @ts-ignore
@Form.create<IProps>({
  onFieldsChange(props, changedFields) {
    const { dispatch, validating }: any = props;
    const finalChangedFields = { ...changedFields };

    if (lodash.has(changedFields, 'organization')) {
      finalChangedFields.organization = changedFields.organization.value ? 1 : 0;
    }

    if (formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'bpOfDataCaptureController/saveEntry',
            target: 'savePayee',
            payload: {
              changedFields: finalChangedFields,
              seachCustom,
            },
          });
        }, 0);
      } else {
        dispatch({
          type: 'bpOfDataCaptureController/saveFormData',
          target: 'savePayee',
          payload: {
            changedFields: finalChangedFields,
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
      relationshipWithInsured: (value: string | object) => value,
      firstName: (value: string | object) => value,
      surname: (value: string | object) => value,
      organization: (value: number) => value === 1,
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

  render() {
    const {
      form,
      dictsOfPaymentMethod,
      dictsOfIdentityType,
      dictsOrgIdentityType,
      dictsOfRelationship,
      dictsOfPayeeType,
      currentState,
      taskNotEditable,
    } = this.props;
    const isInsuredDead = formUtils.queryValue(currentState) === 'D';
    const ispayeeSelf = form.getFieldValue('payeeType') === 'I';
    const isPaymentMethodBank = form.getFieldValue('paymentMethod') === '01';
    const isOrganization = form.getFieldValue('organization');

    return (
      <div className={styles.payee}>
        <Card className={'card1BgColor'}>
          <Form layout="vertical">
            <FormLayout json={payeeLayout}>
              <FormItemSelect
                form={form}
                disabled={taskNotEditable || isInsuredDead}
                required={!isInsuredDead}
                formName="payeeType"
                labelId="app.navigator.task-detail-of-data-capture.label.payee-type"
                dicts={
                  isInsuredDead
                    ? dictsOfPayeeType
                    : lodash.filter(
                        dictsOfPayeeType,
                        (value: IDictionary) => value.dictCode !== 'B'
                      )
                }
              />
              <FormItemSelect
                form={form}
                disabled={taskNotEditable || ispayeeSelf || isInsuredDead}
                required={!isInsuredDead}
                formName="relationshipWithInsured"
                labelId="app.navigator.task-detail-of-data-capture.label.relationship-width-insured"
                dicts={
                  ispayeeSelf
                    ? dictsOfRelationship
                    : lodash.filter(
                        dictsOfRelationship,
                        (value: IDictionary) => value.dictCode !== 'SLF'
                      )
                }
              />
              <FormItemInput
                form={form}
                disabled={taskNotEditable || ispayeeSelf || isInsuredDead}
                required={!isInsuredDead}
                formName="firstName"
                maxLength={30}
                labelId="app.navigator.task-detail-of-data-capture.label.first-name"
              />
              <FormItemInput
                form={form}
                disabled={taskNotEditable || ispayeeSelf || isInsuredDead}
                required={!isInsuredDead}
                formName="surname"
                maxLength={30}
                labelId="app.navigator.task-detail-of-data-capture.label.surname"
              />
              <FormItemCheckbox
                form={form}
                disabled={taskNotEditable || ispayeeSelf || isInsuredDead}
                formName="organization"
                labelId="app.navigator.task-detail-of-data-capture.label.is-corporation"
              />
              <FormItemSelect
                form={form}
                disabled={taskNotEditable || ispayeeSelf || isInsuredDead}
                required={!isInsuredDead}
                formName="identityType"
                labelId="app.usermanagement.basicInfo.label.id-entity-type"
                dicts={isOrganization ? dictsOrgIdentityType : dictsOfIdentityType}
              />
              <FormItemInput
                form={form}
                disabled={taskNotEditable || ispayeeSelf || isInsuredDead}
                required={!isInsuredDead}
                formName="identityNo"
                maxLength={20}
                labelId="app.navigator.task-detail-of-data-capture.label.identity-no"
              />
              <FormItemInput
                form={form}
                disabled={taskNotEditable || ispayeeSelf || isInsuredDead}
                formName="phoneNo"
                maxLength={20}
                labelId="app.usermanagement.basicInfo.label.phone-no"
              />
              <FormItemSelect
                form={form}
                disabled={taskNotEditable || isInsuredDead}
                required={!isInsuredDead}
                formName="paymentMethod"
                labelId="app.navigator.task-detail-of-data-capture.label.payment-method"
                dicts={dictsOfPaymentMethod}
              />

              <FormItemSelectPlus
                form={form}
                disabled={taskNotEditable || !isPaymentMethodBank}
                required={isPaymentMethodBank}
                formName="bankCode"
                labelId="app.navigator.task-detail-of-data-capture.label.bank-code"
                optionShowType="both"
                searchCustom={handleBank}
              />

              <FormItemInput
                form={form}
                disabled={taskNotEditable || !isPaymentMethodBank}
                required={isPaymentMethodBank}
                formName="bankAccountName"
                maxLength={60}
                labelId="app.navigator.task-detail-of-data-capture.label.bank-account-name"
              />
              <FormItemInput
                form={form}
                disabled={taskNotEditable || !isPaymentMethodBank}
                required={isPaymentMethodBank}
                formName="bankAccountNo"
                maxLength={40}
                labelId="app.navigator.task-detail-of-data-capture.label.bank-account-no"
              />
            </FormLayout>
          </Form>
        </Card>
      </div>
    );
  }
}

export default PayeeInfo;
