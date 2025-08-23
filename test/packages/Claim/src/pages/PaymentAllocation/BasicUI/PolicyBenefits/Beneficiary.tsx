import type { FunctionComponent} from 'react';
import React, { useMemo } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import type { IFormRegistProps } from '@/components/FormRegistComponent';
import FormRegist from '@/components/FormRegistComponent';
import { fnPrecisionFormatNegative } from '@/utils/precisionUtils';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formatExchangeRecord } from 'claim/pages/utils/formatExchangeRecord';
import { formUtils } from 'basic/components/Form';
import DataLayout from '@/components/DataLayout';
import {
  FormItemInput,
  FormItemSelect,
  FormItemNumber,
  FormItemCheckbox,
} from 'basic/components/Form/FormItem';
import { EPayTo } from '../../_dto/Enums';
import type { BeneficiaryModal } from '../../_dto/Models';
import { getBeneficiaries, shallowEqual } from '../../_function';
import { VLD_000331 } from '../../_validators/fieldValidators';

import styles from './styles.less';

// @ts-ignore
export interface IBeneficiary extends IFormRegistProps {
  beneficiaryItem?: BeneficiaryModal;
  taskNotEditable?: boolean;
  validating?: boolean;
  benefitId?: string;
  payeeDicts?: any[];
  form: any;
  isBeneficiary?: boolean;
  Dropdown_POL_PayableType?: any[];
  Dropdown_CLM_PayToType?: any[];
  Dropdown_CLM_PayTo?: any[];
  Dropdown_PAY_RelationshipWithPayee?: any[];
  policyBenefitList?: any[];
  benefitItem?: any;
  dispatch?: any;
  c360BeneficiaryInfo?: any;
}

const Beneficiary: FunctionComponent<IBeneficiary> = ({
  form,
  taskNotEditable,
  beneficiaryItem,
  payeeDicts,
  Dropdown_CLM_PayTo,
  Dropdown_CLM_PayToType,
  Dropdown_POL_PayableType,
  Dropdown_PAY_RelationshipWithPayee,
  policyBenefitList,
  benefitItem,
  c360BeneficiaryInfo,
}) => {
  const {
    relationshipWithInsured,
    payeeId,
    relationshipWithPayee,
    beneficiaryPercentage,
    beneficiaryAmount,
    payableType,
    benefitAmount,
    payTo,
    usCitizen,
    usCitizenPassportNo,
    usCitizenTaxIdentityNo,
    usCitizenResidenceAddress,
  } = beneficiaryItem || {};
  const { policyNo } = benefitItem;
  const isBeneficiary = formUtils.queryValue(payTo) === EPayTo.Beneficiary;
  const isUsCitizenCurrent = form.getFieldValue('usCitizen');
  const citizenText = formatMessageApi({
    Label_BIZ_Individual: 'PH_US_Declaration',
  });
  const beneficiaries = getBeneficiaries(c360BeneficiaryInfo, policyNo, payTo);

  return useMemo(() => {
    return (
      <>
        <DataLayout span={8}>
          <FormItemSelect
            form={form}
            formName="payableType"
            labelId="PayableType"
            dicts={Dropdown_POL_PayableType}
            disabled={taskNotEditable}
          />
          <FormItemSelect
            form={form}
            formName="payTo"
            labelId="PayTo"
            dicts={Dropdown_CLM_PayTo}
            disabled={taskNotEditable}
            required
          />
          <FormItemNumber
            form={form}
            formName="benefitAmount"
            labelId="PaymentAmount"
            disabled={taskNotEditable}
            required
            min={-Number.MAX_VALUE}
            pattern={
              /^(-\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)|(\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)$/g
            }
            formatter={fnPrecisionFormatNegative}
          />
          <FormItemSelect
            form={form}
            formName="clientId"
            labelId="ClaimBE"
            optionShowType="name"
            dicts={lodash.compact(beneficiaries)}
            disabled={taskNotEditable}
            rules={[{ validator: VLD_000331(benefitItem, beneficiaryItem) }]}
            required
          />
          <FormItemSelect
            form={form}
            formName="relationshipWithPayee"
            labelId="RelationshipWithPYE"
            labelTypeCode="Label_BIZ_Individual"
            dicts={Dropdown_PAY_RelationshipWithPayee}
            disabled={taskNotEditable}
          />
          <FormItemSelect
            form={form}
            formName="payeeId"
            labelId="PYE"
            labelTypeCode="Label_BIZ_Individual"
            disabled={taskNotEditable}
            dicts={payeeDicts}
            required
          />
          {isBeneficiary && (
            <DataLayout.DataWrap span={12}>
              <DataLayout span={12}>
                <FormItemInput
                  form={form}
                  formName="beneficiaryPercentage"
                  labelId="BeneficiaryPercentage"
                  labelTypeCode="Label_BIZ_Policy"
                  disabled
                />
                <FormItemNumber
                  form={form}
                  formName="beneficiaryAmount"
                  labelId="BeneficiaryAmount"
                  disabled
                  min={-Number.MAX_VALUE}
                  pattern={
                    /^(-\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)|(\d{1,9}(\.99|\.9[0-8]*|\.[0-8]\d*)?)$/g
                  }
                  formatter={fnPrecisionFormatNegative}
                />
              </DataLayout>
            </DataLayout.DataWrap>
          )}
        </DataLayout>
        <div className={styles.DeclarationsTitle}>
          <div className={styles.IsCitizen}>
            <span className={styles.CitizenText} title={citizenText}>
              {citizenText}
            </span>
            <FormItemCheckbox form={form} formName="usCitizen" disabled={taskNotEditable} />
          </div>
          {!!isUsCitizenCurrent && (
            <DataLayout span={12} className={styles.usCitizen}>
              <FormItemInput
                form={form}
                formName="usCitizenPassportNo"
                labelId="PH_US_ID"
                labelTypeCode="Label_BIZ_Individual"
                disabled={taskNotEditable}
              />
              <FormItemInput
                form={form}
                formName="usCitizenTaxIdentityNo"
                labelId="PH_US_TISSNumber"
                labelTypeCode="Label_BIZ_Individual"
                disabled={taskNotEditable}
              />
            </DataLayout>
          )}
          {!!isUsCitizenCurrent && (
            <FormItemInput
              form={form}
              formName="usCitizenResidenceAddress"
              labelId="PH_US_Address"
              labelTypeCode="Label_BIZ_Individual"
              disabled={taskNotEditable}
            />
          )}
        </div>
      </>
    );
  }, [
    policyBenefitList,
    payableType,
    benefitAmount,
    payTo,
    benefitItem,
    Dropdown_CLM_PayTo,
    Dropdown_CLM_PayToType,
    Dropdown_POL_PayableType,
    Dropdown_PAY_RelationshipWithPayee,
    relationshipWithInsured,
    payeeId,
    relationshipWithPayee,
    beneficiaryPercentage,
    beneficiaryAmount,
    payeeDicts,
    isBeneficiary,
    usCitizen,
    usCitizenPassportNo,
    usCitizenTaxIdentityNo,
    usCitizenResidenceAddress,
  ]);
};

const FormWrap = Form.create<IBeneficiary>({
  mapPropsToFields(props) {
    const { beneficiaryItem } = props;

    return formUtils.mapObjectToFields(beneficiaryItem, {
      exchangeRateRecord: (val: any) => formatExchangeRecord(val),
    });
  },
  onFieldsChange(props, changedFields) {
    const { dispatch, beneficiaryItem = {}, benefitItem, validating } = props;
    const { policyNo, id: benefitId } = benefitItem;

    if (lodash.isFunction(dispatch) && formUtils.shouldUpdateState(changedFields)) {
      if (validating) {
        setTimeout(() => {
          dispatch({
            type: 'paymentAllocation/saveEntry',
            target: 'saveBeneficiary',
            payload: {
              changedFields,
              id: beneficiaryItem?.id,
              benefitId,
              policyNo,
            },
          });
        });
      } else {
        dispatch({
          type: 'paymentAllocation/saveFormData',
          target: 'saveBeneficiary',
          payload: {
            changedFields,
            id: beneficiaryItem?.id,
            benefitId,
            policyNo,
          },
        });
      }
    }
  },
})(FormRegist({ nameSpace: 'paymentAllocation' })(React.memo(Beneficiary, shallowEqual)));

export default connect(({ claimEditable, paymentAllocation, dictionaryController }: any) => ({
  taskNotEditable: claimEditable.taskNotEditable,
  payeeDicts: paymentAllocation.payeeDicts,
  Dropdown_POL_PayableType: dictionaryController.Dropdown_POL_PayableType,
  Dropdown_CLM_PayToType: dictionaryController.Dropdown_CLM_PayToType,
  Dropdown_CLM_PayTo: dictionaryController.Dropdown_CLM_PayTo,
  Dropdown_PAY_RelationshipWithPayee: dictionaryController.Dropdown_PAY_RelationshipWithPayee,
  policyBenefitList: paymentAllocation.claimData.policyBenefitList,
  c360BeneficiaryInfo: paymentAllocation.claimData.c360BeneficiaryInfo,
}))(FormWrap);
