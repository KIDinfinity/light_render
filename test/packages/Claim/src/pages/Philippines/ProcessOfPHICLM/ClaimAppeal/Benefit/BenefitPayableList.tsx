import { formatMessageApi } from '@/utils/dictFormatMessage';
import React, { Component } from 'react';
import { connect } from 'dva';
import type { Dispatch } from 'redux';
import lodash from 'lodash';
import{ v4 as  uuidv4 } from 'uuid';
import { Form } from 'antd';
import ButtonOfClaim from 'claim/components/ButtonOfClaim';
import FormLayout from 'basic/components/Form/FormLayout';
import { formUtils } from 'basic/components/Form';
import { PHBENEFITITEMPAYABLEITEM } from '@/utils/claimConstant';
import type { IInvoicePayable, IPolicy } from '@/dtos/claim';

import { withContextData } from '@/components/_store';
import { ECaseType } from 'claim/pages/AppealCase/ManualAssessment/_dto/Enums';
import CaseCategory from 'enum/CaseCategory';

import CardOfClaim from 'basic/components/Form/FormCard';
import { BenefitPayableItemLayout, AccidentBenefitPayableItemLayout } from '../FormLayout.json';
import BenefitPayableItem from './BenefitPayableItem';

interface IProps {
  curBenefitItemPayableList: string[];
  dispatch: Dispatch<any>;
  incidentId: string;
  treatmentId: string;
  invoiceId: string;
  invoicePayableId: string;
  invoicePayableItemNextId: string;
  listPolicy: IPolicy[];
  invoicePayableItem: IInvoicePayable;
  claimDecision: string;
}

const { FormHeader } = BenefitPayableItem;

@connect(
  (
    { PHCLMOfAppealCaseController, claimEditable, formCommonController }: any,
    { invoicePayableId, withData: { caseType } }: any
  ) => {
    const { claimEntities, claimProcessData } = caseType
      ? PHCLMOfAppealCaseController[caseType]
      : PHCLMOfAppealCaseController;

    return {
      claimNo: claimProcessData.claimNo,
      taskNotEditable: claimEditable.taskNotEditable,
      policyBackgrounds: formCommonController.policyBackgrounds,
      benefitItemPayableList:
        claimEntities.invoicePayableListMap?.[invoicePayableId]?.benefitItemPayableList,
      invoicePayableItem: claimEntities.invoicePayableListMap?.[invoicePayableId],
      benefitItemPayableListMap: claimEntities.benefitItemPayableListMap,
      listPolicy: PHCLMOfAppealCaseController.listPolicy,
    };
  }
)
class BenefitPayableList extends Component<IProps> {
  get policyList() {
    const { listPolicy, invoicePayableItem } = this.props;
    const { policyNo, productCode, benefitTypeCode } = lodash.pick(
      formUtils.cleanValidateData(invoicePayableItem),
      ['policyNo', 'productCode', 'benefitTypeCode']
    );
    return lodash
      .chain(listPolicy)
      .compact()
      .filter(
        (item: IPolicy) =>
          item.policyNo === policyNo &&
          item.coreProductCode === productCode &&
          item.benefitTypeCode === benefitTypeCode
      )
      .value();
  }

  get benefitItemCodeAdded() {
    const { benefitItemPayableList, benefitItemPayableListMap } = this.props;
    const list = lodash.map(benefitItemPayableList, (id) =>
      formUtils.queryValue(benefitItemPayableListMap?.[id]?.benefitItemCode)
    );
    return lodash.compact(list);
  }

  handleAdd = () => {
    const { dispatch, invoicePayableId, invoicePayableItem } = this.props;
    const {
      incidentId,
      treatmentId,
      invoiceId,
      payableId,
      treatmentPayableId,
    } = lodash.pick(invoicePayableItem, [
      'incidentId',
      'treatmentId',
      'invoiceId',
      'payableId',
      'treatmentPayableId',
    ]);
    dispatch({
      type: 'PHCLMOfAppealCaseController/addBenefitPayableItem',
      payload: {
        addBenefitPayableItem: {
          ...PHBENEFITITEMPAYABLEITEM,
          id: uuidv4(),
          invoicePayableId,
          incidentId,
          treatmentId,
          invoiceId,
          payableId,
          treatmentPayableId,
        },
      },
    });
  };

  render() {
    const {
      taskNotEditable: notEditable,
      benefitItemPayableList,
      invoicePayableId,
      withData,
    } = this.props;

    const { appealNotEditable, originalCaseCategory, caseType }: any = withData || {};
    const taskNotEditable = notEditable || appealNotEditable;
    const isClaimAdjust =
      ECaseType.originCase !== caseType || CaseCategory.PH_AP_CTG01 === originalCaseCategory;

    return (
      <div>
        {!lodash.isEmpty(benefitItemPayableList) && (
          <CardOfClaim>
            <Form layout="vertical">
              <FormLayout
                json={isClaimAdjust ? BenefitPayableItemLayout : AccidentBenefitPayableItemLayout}
              >
                {isClaimAdjust && (
                  <FormHeader>
                    {formatMessageApi({
                      Label_BIZ_Claim: 'venus_claim.label.claimAdjustment',
                    })}
                  </FormHeader>
                )}
                <FormHeader>
                  {formatMessageApi({
                    Label_BIZ_Claim:
                      'app.navigator.task-detail-of-claim-assessment.label.benefit-item',
                  })}
                </FormHeader>
                <FormHeader>{formatMessageApi({ Label_CLM_Payable: 'BillAmount' })}</FormHeader>
                <FormHeader>{formatMessageApi({ Label_CLM_Payable: 'AssessAmount' })}</FormHeader>
              </FormLayout>

              {lodash.map(benefitItemPayableList, (item: any) => (
                <BenefitPayableItem
                  key={item}
                  benefitPayableId={item}
                  policyList={this.policyList}
                  invoicePayableId={invoicePayableId}
                  benefitItemCodeAdded={this.benefitItemCodeAdded}
                />
              ))}
            </Form>
          </CardOfClaim>
        )}
        {!taskNotEditable && (
          <ButtonOfClaim
            handleClick={this.handleAdd}
            buttonText={formatMessageApi({
              Label_BPM_Button: 'app.claim.button.benefit-payable',
            })}
          />
        )}
      </div>
    );
  }
}

export default withContextData(BenefitPayableList);
