import type { FunctionComponent} from 'react';
import React, { useMemo } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import type { IFormRegistProps } from '@/components/FormRegistComponent';
import FormRegist from '@/components/FormRegistComponent';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formatExchangeRecord } from 'claim/pages/utils/formatExchangeRecord';
import { tenant, Region } from '@/components/Tenant';
import { formUtils } from 'basic/components/Form';
import DataLayout from '@/components/DataLayout';
import FormItemCurrency from 'basic/components/Form/FormItem/FormItemCurrency';
import { FormItemInput, FormItemSelect, FormItemCheckbox } from 'basic/components/Form/FormItem';
import { EPayTo } from '../../_dto/Enums';
import type { BeneficiaryModal } from '../../_dto/Models';
import { getBeneficiaries, shallowEqual } from '../../_function';
import { VLD_000331 } from '../../_validators/fieldValidators';

import styles from './styles.less';
import { SubmissionChannel } from 'claim/enum';

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
  excludeBeneficiaries?: any[];
  c360BeneficiaryInfo?: any;
  submissionChannel?: any;
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
  dispatch,
  c360BeneficiaryInfo,
  submissionChannel,
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
    policyCurrency,
  } = beneficiaryItem || {};
  const { policyNo } = benefitItem;
  const isBeneficiary = formUtils.queryValue(payTo) === EPayTo.Beneficiary;
  const isUsCitizenCurrent = form.getFieldValue('usCitizen');
  const citizenText = formatMessageApi({
    Label_BIZ_Individual: 'PH_US_Declaration',
  });

  const refreshRate = () => {
    dispatch({
      type: 'paymentAllocation/updateExchangeRate',
    });
  };

  const beneficiaries = getBeneficiaries(c360BeneficiaryInfo, policyNo, payTo);

  const precision = tenant.region({
    [Region.JP]: 0,
    notMatch: undefined,
  });

  const isGOPBillingCase = formUtils.queryValue(submissionChannel) === SubmissionChannel.GOPBilling;

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
          <FormItemCurrency
            form={form}
            disabled={taskNotEditable}
            required
            hiddenPrefix
            hiddenDropDown
            formName="benefitAmount"
            labelId="PaymentAmount"
            currencyCode={policyCurrency}
            precision={precision}
          />
          <FormItemSelect
            form={form}
            formName="clientId"
            labelId="ClaimBE"
            optionShowType="name"
            dicts={lodash.compact(beneficiaries)}
            disabled={taskNotEditable}
            rules={[{ validator: VLD_000331(benefitItem, beneficiaryItem) }]}
            required={!isGOPBillingCase}
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
                <FormItemCurrency
                  form={form}
                  disabled
                  formName="beneficiaryAmount"
                  labelId="BeneficiaryAmount"
                  hiddenPrefix
                  hiddenDropDown
                  currencyCode={policyCurrency}
                />
              </DataLayout>
            </DataLayout.DataWrap>
          )}
          <DataLayout.DataWrap span={24}>
            <DataLayout span={12}>
              <FormItemCurrency
                form={form}
                required
                disabled={taskNotEditable}
                formName="payoutAmount"
                labelId="PayoutAmount"
                labelTypeCode="Label_BIZ_Claim"
                hiddenPrefix
                hiddenDropDown
                currencyCode={beneficiaryItem?.payoutCurrency}
                precision={precision}
              />
              <FormItemInput
                form={form}
                required
                disabled
                cusTitle
                formName="exchangeRateRecord"
                labelId="ExchangeRatePolicyToPayout"
                reload={refreshRate}
              />
            </DataLayout>
          </DataLayout.DataWrap>
        </DataLayout>
        <div className={styles.DeclarationsTitle}>
          <div className={styles.IsCitizen}>
            <span className={styles.CitizenText} title={citizenText}>
              {citizenText}
            </span>
            <FormItemCheckbox form={form} formName="usCitizen" disabled={taskNotEditable} />
          </div>
          {!!isUsCitizenCurrent && (
            <DataLayout span={12}>
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
    policyCurrency,
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

export default connect(
  ({ claimEditable, paymentAllocation, dictionaryController, processTask }: any) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    payeeDicts: paymentAllocation.payeeDicts,
    Dropdown_POL_PayableType: dictionaryController.Dropdown_POL_PayableType,
    Dropdown_CLM_PayToType: dictionaryController.Dropdown_CLM_PayToType,
    Dropdown_CLM_PayTo: dictionaryController.Dropdown_CLM_PayTo,
    Dropdown_PAY_RelationshipWithPayee: dictionaryController.Dropdown_PAY_RelationshipWithPayee,
    policyBenefitList: paymentAllocation.claimData.policyBenefitList,
    relatePolicyOwnerPayeeIds: paymentAllocation.relatePolicyOwnerPayeeIds,
    payeeList: paymentAllocation.claimData.payeeList,
    c360BeneficiaryInfo: paymentAllocation.claimData.c360BeneficiaryInfo,
    submissionChannel: lodash.get(processTask, 'getTask.submissionChannel'),
  })
)(FormWrap);
