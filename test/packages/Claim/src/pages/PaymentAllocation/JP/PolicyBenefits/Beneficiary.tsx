import type { FunctionComponent} from 'react';
import React, { useMemo } from 'react';
import { connect } from 'dva';
import { Form } from 'antd';
import lodash from 'lodash';
import type { IFormRegistProps } from '@/components/FormRegistComponent';
import FormRegist from '@/components/FormRegistComponent';
import { formatMessageApi } from '@/utils/dictFormatMessage';
import { formatExchangeRecord } from 'claim/pages/utils/formatExchangeRecord';
import { formUtils } from 'basic/components/Form';
import { fnPrecisionFormatNegative } from '@/utils/precisionUtils';
import DataLayout from '@/components/DataLayout';
import {
  FormItemInput,
  FormItemSelect,
  FormItemCheckbox,
  FormItemNumber,
} from 'basic/components/Form/FormItem';
import FormItemCurrency from 'basic/components/Form/FormItem/FormItemCurrency';
import CaseTaskDetail from 'navigator/components/CaseTaskDetail';
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
  Dropdown_POL_RelationshipWithInsured?: any[];
  policyBenefitList?: any[];
  benefitItem?: any;
  dispatch?: any;
  excludeBeneficiaries?: any[];
  c360BeneficiaryInfo?: any;
  taskDetail?: any;
}

const Beneficiary: FunctionComponent<any> = ({
  form,
  taskNotEditable,
  beneficiaryItem,
  payeeDicts,
  Dropdown_CLM_PayTo,
  Dropdown_CLM_PayToType,
  Dropdown_POL_PayableType,
  Dropdown_POL_RelationshipWithInsured,
  policyBenefitList,
  benefitItem,
  c360BeneficiaryInfo,
  payeeList,
  getCaseNoByBusinessNo,
  taskDetail,
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

  let beneficiaries = getBeneficiaries(c360BeneficiaryInfo, policyNo, payTo);
  // 如果caseNo为空，360无数据，用第一个payee的姓+名
  if (!taskDetail?.processInstanceId && !getCaseNoByBusinessNo) {
    const firstPayee: any = lodash.first(payeeList);
    beneficiaries = [
      {
        dictCode: beneficiaryItem.clientId,
        dictName: `${firstPayee?.firstName}${firstPayee?.surname}`,
      },
    ];
  }

  return useMemo(() => {
    return (
      <>
        <DataLayout span={8}>
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
            precision={0}
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
            dicts={Dropdown_POL_RelationshipWithInsured}
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
          <FormItemCurrency
            form={form}
            required
            disabled
            formName="payoutAmount"
            labelId="PayoutAmount"
            labelTypeCode="Label_BIZ_Claim"
            hiddenPrefix
            hiddenDropDown
            currencyCode={beneficiaryItem?.payoutCurrency}
            precision={0}
          />
          {isBeneficiary && (
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
                disabled
                formName="beneficiaryAmount"
                labelId="BeneficiaryAmount"
                precision={0}
              />
            </DataLayout>
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
    Dropdown_POL_RelationshipWithInsured,
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

const BeneficiaryConnect = connect(
  ({ claimEditable, paymentAllocation, dictionaryController, workspaceHistory }: any) => ({
    taskNotEditable: claimEditable.taskNotEditable,
    payeeDicts: paymentAllocation.payeeDicts,
    Dropdown_POL_PayableType: dictionaryController.Dropdown_POL_PayableType,
    Dropdown_CLM_PayToType: dictionaryController.Dropdown_CLM_PayToType,
    Dropdown_CLM_PayTo: dictionaryController.Dropdown_CLM_PayTo,
    Dropdown_POL_RelationshipWithInsured: dictionaryController.Dropdown_POL_RelationshipWithInsured,
    policyBenefitList: paymentAllocation.claimData.policyBenefitList,
    relatePolicyOwnerPayeeIds: paymentAllocation.relatePolicyOwnerPayeeIds,
    payeeList: paymentAllocation.claimData.payeeList,
    c360BeneficiaryInfo: paymentAllocation.claimData.c360BeneficiaryInfo,
    getCaseNoByBusinessNo: workspaceHistory.getCaseNoByBusinessNo,
  })
)(FormWrap);

export default (props: any) => (
  <CaseTaskDetail.Consumer {...props}>
    <BeneficiaryConnect />
  </CaseTaskDetail.Consumer>
);
